import { stylePropsText, stylePropsTransform, validPseudoKeys, validStyles } from '@tamagui/helpers'
import { useInsertionEffect } from 'react'
import { ViewStyle } from 'react-native'

import { getConfig } from '../conf'
import { isClient, isWeb, useIsomorphicLayoutEffect } from '../constants/platform'
import { mediaQueryConfig, mediaState } from '../hooks/useMedia'
import type {
  DebugProp,
  MediaQueryKey,
  PseudoPropKeys,
  PseudoStyles,
  SplitStyleState,
  StackProps,
  StaticConfigParsed,
  TamaguiInternalConfig,
  ThemeObject,
} from '../types'
import { FontLanguageProps, LanguageContextType } from '../views/FontLanguage.types'
import { createMediaStyle } from './createMediaStyle'
import { fixStyles } from './expandStyles'
import { getAtomicStyle, getStylesAtomic, styleToCSS } from './getStylesAtomic'
import {
  PartialStyleObject,
  RulesToInsert,
  insertStyleRules,
  insertedTransforms,
  updateInserted,
  updateInsertedCache,
} from './insertStyleRule'
import { mergeTransform } from './mergeTransform'
import { normalizeValueWithProperty } from './normalizeValueWithProperty'
import { pseudoDescriptors } from './pseudoDescriptors'

export type SplitStyles = ReturnType<typeof getSplitStyles>
export type ClassNamesObject = Record<string, string>
export type SplitStyleResult = ReturnType<typeof getSplitStyles>

const skipProps = {
  animation: true,
  animateOnly: true,
  debug: true,
  componentName: true,

  ...(!isWeb && {
    tag: true,
    whiteSpace: true,
    wordWrap: true,
    textOverflow: true,
    textDecorationDistance: true,
    userSelect: true,
    selectable: true,
    cursor: true,
    contain: true,
    boxSizing: true,
    boxShadow: true,
  }),
}

type TransformNamespaceKey = 'transform' | PseudoPropKeys | MediaQueryKey

let conf: TamaguiInternalConfig

type StyleSplitter = (
  props: { [key: string]: any },
  staticConfig: StaticConfigParsed,
  theme: ThemeObject,
  state: SplitStyleState,
  defaultClassNames?: any,
  languageContext?: LanguageContextType,
  debug?: DebugProp
) => {
  pseudos: PseudoStyles
  medias: Record<MediaQueryKey, ViewStyle>
  style: ViewStyle
  classNames: ClassNamesObject
  rulesToInsert: RulesToInsert
  viewProps: StackProps
}

export const PROP_SPLIT = '-'

// this is how compiler outputs psueodo identifier
// TODO remove in next refactor
export const pseudoCNInverse = {
  hover: 'hoverStyle',
  focus: 'focusStyle',
  press: 'pressStyle',
}

// loop props backwards
//   track used keys:
//     const keys = new Set<string>()
//   keep classnames and styles separate:
//     const styles = {}
//     const classNames = {}

export const getSplitStyles: StyleSplitter = (
  props,
  staticConfig,
  theme,
  state,
  defaultClassNames,
  languageContext,
  debug
) => {
  conf = conf || getConfig()
  const validStyleProps = staticConfig.isText ? stylePropsText : validStyles
  const viewProps: StackProps = {}
  const pseudos: PseudoStyles = {}
  const medias: Record<MediaQueryKey, ViewStyle> = {}
  const usedKeys = new Set<string>()
  const propKeys = Object.keys(props)
  const shouldDoClasses = (isWeb || process.env.IS_STATIC === 'is_static') && !state.noClassNames
  const len = propKeys.length
  const rulesToInsert: RulesToInsert = []
  const style: ViewStyle = {}
  // TODO make this CSS, not compile-friendly
  if (state.hasTextAncestor) {
    // parity with react-native-web
    style.display = 'inline-flex' as any
  }
  let classNames: ClassNamesObject = {}
  // we need to gather these specific to each media query / pseudo
  // value is [hash, val], so ["-jnjad-asdnjk", "scaleX(1) rotate(10deg)"]
  let transforms = null as Record<TransformNamespaceKey, [string, string]> | null

  function mergeClassName(key: string, val: string, isMediaOrPseudo = false) {
    if (process.env.TAMAGUI_TARGET === 'web') {
      // empty classnames passed by compiler sometimes
      if (!val) return
      if (val.startsWith('_transform-')) {
        const namespace: TransformNamespaceKey = isMediaOrPseudo ? key : 'transform'

        let transform = insertedTransforms[val]
        if (isClient) {
          if (!transform) {
            // HMR or loaded a new chunk
            updateInserted()
            transform = insertedTransforms[val]
            if (process.env.NODE_ENV === 'development') {
              if (!transform) {
                console.warn('no transform found', { insertedTransforms, val })
              }
            }
          }
          if (!transform) {
            if (isWeb && val[0] !== '_') {
              // runtime insert
              transform = val
            }
          }
          if (process.env.NODE_ENV === 'development' && debug === 'verbose') {
            // prettier-ignore
            console.log('  🔹 getSplitStyles mergeClassName transform', { key, val, namespace, transform, insertedTransforms })
          }
        }
        transforms = transforms || {}
        transforms[namespace] = transforms[namespace] || ['', '']
        const identifier = val.replace('_transform', '')
        transforms[namespace][0] += identifier
        // ssr doesn't need to do anything just make the right classname
        if (transform) {
          transforms[namespace][1] += transform
        }
      } else {
        classNames[key] = val
      }
    }
  }

  // loop backwards so we can skip already-used props
  for (let i = len - 1; i >= 0; i--) {
    const keyInit = propKeys[i]

    if (usedKeys.has(keyInit)) continue
    if (skipProps[keyInit]) continue
    if (!isWeb && keyInit.startsWith('data-')) continue

    const valInit = props[keyInit]

    if (keyInit === 'style' || keyInit.startsWith('_style')) {
      if (!valInit) continue
      for (const key in valInit) {
        if (usedKeys.has(key)) continue
        if (valInit && typeof valInit === 'object') {
          // newer react native versions return a full object instead of ID
          for (const skey in valInit) {
            if (usedKeys.has(skey)) continue
            usedKeys.add(skey)
            style[skey] = valInit[skey]
          }
        } else {
          usedKeys.add(key)
          style[key] = valInit
        }
      }
      continue
    }

    if (process.env.TAMAGUI_TARGET === 'web') {
      if (keyInit === 'className') {
        let nonTamaguis = ''
        if (!valInit) continue
        for (const cn of valInit.split(' ')) {
          if (cn[0] === '_') {
            // tamagui, merge it expanded on key, eventually this will go away with better compiler
            const [shorthand, mediaOrPseudo] = cn.slice(1).split('-')
            const isMedia = mediaOrPseudo[0] === '_'
            const isPseudo = mediaOrPseudo[0] === '0'
            const isMediaOrPseudo = isMedia || isPseudo
            let fullKey = conf.shorthands[shorthand]
            if (isMedia) {
              // is media
              let mediaShortKey = mediaOrPseudo.slice(1)
              mediaShortKey = mediaShortKey.slice(0, mediaShortKey.indexOf('_'))
              fullKey += `${PROP_SPLIT}${mediaShortKey}`
            } else if (isPseudo) {
              // is pseudo
              const pseudoShortKey = mediaOrPseudo.slice(1)
              fullKey += `${PROP_SPLIT}${pseudoShortKey}`
            }
            usedKeys.add(fullKey)
            mergeClassName(fullKey, cn, isMediaOrPseudo)
          } else {
            nonTamaguis += ' ' + cn
          }
        }
        if (nonTamaguis) {
          usedKeys.add(keyInit)
          mergeClassName(keyInit, nonTamaguis)
        }
        continue
      }

      if (valInit && valInit[0] === '_') {
        // if valid style key (or pseudo like color-hover):
        // this conditional and esp the pseudo check rarely runs so not a perf issue
        const isValidClassName = validStyles[keyInit]
        const isMediaOrPseudo =
          !isValidClassName &&
          keyInit.includes(PROP_SPLIT) &&
          validStyles[keyInit.split(PROP_SPLIT)[0]]
        if (isValidClassName || isMediaOrPseudo) {
          usedKeys.add(keyInit)
          mergeClassName(keyInit, valInit, isMediaOrPseudo)
          continue
        }
      }
    }

    if (state.keepVariantsAsProps) {
      if (staticConfig.defaultVariants && keyInit in staticConfig.defaultVariants) {
        viewProps[keyInit] = valInit
      }
    }

    /**
     * There's (some) reason to this madness: we want to allow returning media/pseudo from variants
     * Say you have a variant hoverable: { true: { hoverStyle: {} } }
     * We run propMapper first to expand variant, then we run the inner loop and look again
     * for if there's a pseudo/media returned from it.
     */

    let isMedia = keyInit[0] === '$'
    let isPseudo = validPseudoKeys[keyInit]
    let isMediaOrPseudo = isMedia || isPseudo

    if (
      !isMedia &&
      !isPseudo &&
      !staticConfig.variants?.[keyInit] &&
      !validStyleProps[keyInit] &&
      !conf.shorthands[keyInit]
    ) {
      usedKeys.add(keyInit)
      viewProps[keyInit] = valInit
      continue
    }

    const expanded =
      isMedia || isPseudo
        ? [[keyInit, valInit]]
        : staticConfig.propMapper(
            keyInit,
            valInit,
            theme,
            props,
            state,
            languageContext,
            undefined,
            debug
          )

    if (process.env.NODE_ENV === 'development' && debug === 'verbose') {
      console.log('  🔹 getSplitStyles', keyInit, valInit, expanded)
    }

    if (!expanded) {
      continue
    }

    for (const [key, val] of expanded) {
      if (val === undefined) continue

      isMedia = key[0] === '$'
      isPseudo = validPseudoKeys[key]
      isMediaOrPseudo = isMedia || isPseudo

      if (!isMediaOrPseudo) {
        if (usedKeys.has(key)) continue
      }

      if (
        (staticConfig.deoptProps && staticConfig.deoptProps.has(key)) ||
        (staticConfig.inlineProps && staticConfig.inlineProps.has(key)) ||
        (staticConfig.inlineWhenUnflattened && staticConfig.inlineWhenUnflattened.has(key))
      ) {
        usedKeys.add(key)
        viewProps[key] = props[key] ?? val
      }

      // pseudo
      if (isPseudo) {
        if (!val) continue
        if (key === 'enterStyle' && state.mounted) {
          // once mounted we can ignore enterStyle
          continue
        }
        pseudos[key] = pseudos[key] || {}
        pseudos[key] = getSubStyle(
          key,
          val,
          staticConfig,
          theme,
          props,
          state,
          conf,
          languageContext,
          true
        )
        if (shouldDoClasses) {
          const pseudoStyles = getAtomicStyle(pseudos[key], pseudoDescriptors[key])
          for (const style of pseudoStyles) {
            const postfix = pseudoDescriptors[key]?.name || key // exitStyle/enterStyle dont have pseudoDescriptors
            const fullKey = `${style.property}${PROP_SPLIT}${postfix}`
            if (!usedKeys.has(fullKey)) {
              usedKeys.add(fullKey)
              addStyleToInsertRules(rulesToInsert, style)
              mergeClassName(fullKey, style.identifier, isMediaOrPseudo)
            }
          }
        }
        continue
      }

      // media
      if (isMedia) {
        const mediaKey = key
        const mediaKeyShort = mediaKey.slice(1)

        if (!mediaQueryConfig[mediaKeyShort]) {
          if (!usedKeys.has(key)) {
            // this isn't a media key, pass through
            viewProps[key] = val
          }
          continue
        }

        // dont check if media is active, we just apply *all* media styles
        // we combine the media props on top regular props, could proxy this
        // TODO test proxy here instead of merge
        // THIS USED TO PROXY BACK TO REGULAR PROPS BUT THAT IS THE WRONG BEHAVIOR
        // we avoid passing in default props for media queries because that would confuse things like SizableText.size:
        const mediaStyle = getSubStyle(
          key,
          val,
          staticConfig,
          theme,
          props,
          state,
          conf,
          languageContext
        )

        if (process.env.NODE_ENV === 'development' && debug === 'verbose') {
          // prettier-ignore
          console.log('  🔹 getSplitStyles mediaStyle', { mediaKey, mediaStyle, props, shouldDoClasses })
        }

        if (shouldDoClasses) {
          const mediaStyles = getStylesAtomic(mediaStyle)
          for (const style of mediaStyles) {
            const out = createMediaStyle(style, mediaKeyShort, mediaQueryConfig)
            // TODO handle pseudo + media, not too hard just need to set up example case
            const fullKey = `${style.property}${PROP_SPLIT}${mediaKeyShort}`
            if (!usedKeys.has(fullKey)) {
              usedKeys.add(fullKey)
              addStyleToInsertRules(rulesToInsert, out)
              mergeClassName(fullKey, out.identifier, true)
            }
          }
        } else {
          if (mediaState[mediaKey]) {
            if (process.env.NODE_ENV === 'development' && debug) {
              console.log('apply media style', mediaKey, mediaState)
            }
            Object.assign(shouldDoClasses ? medias : style, mediaStyle)
          }
        }
        continue
      }

      if (!isWeb && key === 'pointerEvents') {
        usedKeys.add(key)
        viewProps[key] = val
        continue
      }

      if (validStyleProps[key]) {
        usedKeys.add(key)
        if (val && val[0] === '_') {
          classNames[key] = val
        } else if (key in stylePropsTransform) {
          mergeTransform(style, key, val, true)
        } else {
          // if (key === 'pointerEvents') {
          //   // pointer events can be box-none which requires css
          //   addStyleToInsertRules(out.identifier, out.styleRule)
          //   mergeClassName(fullKey, out.identifier, true)
          // } else {
          style[key] = normalizeValueWithProperty(val, key)
          // }
        }
        continue
      }

      // pass to view props
      if (!staticConfig.variants || !(key in staticConfig.variants)) {
        if (!skipProps[key]) {
          viewProps[key] = val
          usedKeys.add(key)
        }
      }
    }
  }

  fixStyles(style)
  if (isWeb) {
    styleToCSS(style)
  }

  // add in defaults if not set:
  if (defaultClassNames) {
    classNames = {
      ...defaultClassNames,
      ...classNames,
    }
  }

  if (shouldDoClasses) {
    const atomic = getStylesAtomic(style)
    for (const atomicStyle of atomic) {
      const key = atomicStyle.property
      // pointerEvents box-none must be CSS-ified
      // should probably have a few more exceptions here!
      if (key === 'pointerEvents' || !state.dynamicStylesInline) {
        addStyleToInsertRules(rulesToInsert, atomicStyle)
        mergeClassName(key, atomicStyle.identifier)
      } else {
        style[key] = atomicStyle.value
      }
    }
  } else {
    if (classNames && state.resolveVariablesAs === 'value') {
      // getting real values for colors for animations (reverse mapped from CSS)
      // this isn't beautiful, but will do relatively fine performance for now
      // has a bug still - try adding <Switch theme="bouncy" /> should animate bg color on active
      // const selectors = getAllSelectors()
      // for (const key in classNames) {
      //   if (key.endsWith('Color')) {
      //     const selector = classNames[key]
      //     let value = selectorValuesCache[selector]
      //     if (!value) {
      //       const css = selectors[selector]
      //       value = css.replace(/.*:/, '').replace(/;.*/, '')
      //       if (value) {
      //         const themeUnwrapped = getThemeUnwrapped(theme)
      //         const map = themeToVariableToValueMap.get(themeUnwrapped)
      //         if (map && value.startsWith('var(')) {
      //           value = map[value]
      //         }
      //         if (value) {
      //           selectorValuesCache[selector] = value
      //         }
      //       } else {
      //         // err
      //         continue
      //       }
      //     }
      //     if (value) {
      //       style[key] = value
      //     }
      //   }
      // }
    }
  }

  if (process.env.TAMAGUI_TARGET === 'web') {
    if (transforms) {
      for (const namespace in transforms) {
        if (!transforms[namespace]) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error no transform', transforms, namespace)
          }
          continue
        }
        const [hash, val] = transforms[namespace]
        const identifier = `_transform${hash}`
        if (isClient) {
          if (!insertedTransforms[identifier]) {
            const rule = `.${identifier} { transform: ${val}; }`
            addStyleToInsertRules(rulesToInsert, {
              identifier,
              rules: [rule],
              property: namespace,
            })
          }
        }
        classNames[namespace] = identifier
      }
    }
  }

  if (process.env.NODE_ENV === 'development' && debug === 'verbose') {
    if (typeof document !== 'undefined') {
      // prettier-ignore
      console.log('  🔹 getSplitStyles out', { style, pseudos, medias, classNames, viewProps, state, rulesToInsert })
    }
  }

  return {
    viewProps,
    style,
    medias,
    pseudos,
    classNames,
    rulesToInsert,
  }
}

/**
 * getSubStyle calls propMapper with props
 * those should be specific to the substyle, but fallback to the base props
 * so given props:
 *
 *   { fontSize: 12, color: 'red', $sm: { color: 'blue' } }
 *
 * getSubStyle props should be a proxy that ends up like:
 *
 *   { fontSize: 12, color: 'blue' }
 *
 * and to avoid re-creating it over and over, use a WeakMap
 */
const propProxies = new WeakMap()
function getSubStyleProxiedProps(baseProps: Object, specificProps: Object) {
  if (!specificProps) {
    // functional variants may want to eventually do something like:
    // have a hooks-like rule (no conditionals)
    // then we run them once on compile with a proxy to capture the keys accessed
    // then add those keys to `inlineProps` so we know we must inline them
    // for now this will trigger because compiled away
    // right now also we don't pass in any pre-extracted styled() props but we should pass them in..
    return baseProps
  }
  // can cache based only on specific it's always referentially consistent with base
  if (propProxies.has(specificProps)) {
    return propProxies.get(specificProps)
  }
  const next = new Proxy(specificProps, {
    ownKeys() {
      return [...new Set([...Object.keys(baseProps), ...Object.keys(specificProps)])]
    },
    has(_, key) {
      return key in specificProps || key in baseProps
    },
    get(_, key) {
      return specificProps[key] ?? baseProps[key]
    },
  })
  propProxies.set(specificProps, next)
  return next
}

export const getSubStyle = (
  subKey: string,
  styleIn: Object,
  staticConfig: StaticConfigParsed,
  theme: ThemeObject,
  props: any,
  state: SplitStyleState,
  conf: TamaguiInternalConfig,
  languageContext?: FontLanguageProps,
  avoidDefaultProps?: boolean
): ViewStyle => {
  const styleOut: ViewStyle = {}
  for (let key in styleIn) {
    const val = styleIn[key]
    key = conf.shorthands[key] || key
    const expanded = staticConfig.propMapper(
      key,
      val,
      theme,
      getSubStyleProxiedProps(props, props[subKey]),
      state,
      languageContext,
      avoidDefaultProps
    )
    if (!expanded) continue
    for (const [skey, sval] of expanded) {
      if (skey in stylePropsTransform) {
        mergeTransform(styleOut, skey, sval)
      } else {
        styleOut[skey] = normalizeValueWithProperty(sval, key)
      }
    }
  }

  fixStyles(styleOut)

  return styleOut
}

export const insertSplitStyles: StyleSplitter = (...args) => {
  const res = getSplitStyles(...args)
  insertStyleRules(res.rulesToInsert)
  return res
}

// on native no need to insert any css
const useInsertEffectCompat = isWeb ? useInsertionEffect || useIsomorphicLayoutEffect : () => {}

export const useSplitStyles: StyleSplitter = (...args) => {
  const res = getSplitStyles(...args)

  useInsertEffectCompat(() => {
    insertStyleRules(res.rulesToInsert)
  }, [res.rulesToInsert])

  return res
}

function addStyleToInsertRules(rulesToInsert: RulesToInsert, styleObject: PartialStyleObject) {
  if (process.env.TAMAGUI_TARGET === 'web') {
    // NOTE this is super tricky
    // for some reason, next.js dev SSR actually misses a lot of styles (pre-hydrate) with || !isClient
    // which doesn't really make sense, because that should strictly extract *more* css, but oh well
    // meanwhile, production builds *need* to always be truthy here for node, thus the cheat conditional
    if (
      styleObject.property === 'pointerEvents' ||
      updateInsertedCache(styleObject.identifier, styleObject.rules) ||
      (!isClient && process.env.NODE_ENV === 'production')
    ) {
      rulesToInsert.push(styleObject)
    }
  }
}