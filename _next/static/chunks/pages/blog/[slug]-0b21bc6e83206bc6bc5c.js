(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[492],{381:function(e,t,o){"use strict";var a=o(1706),n={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var o,i,l,r,s,c,_=!1;t||(t={}),o=t.debug||!1;try{if(l=a(),r=document.createRange(),s=document.getSelection(),(c=document.createElement("span")).textContent=e,c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",(function(a){if(a.stopPropagation(),t.format)if(a.preventDefault(),"undefined"===typeof a.clipboardData){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var i=n[t.format]||n.default;window.clipboardData.setData(i,e)}else a.clipboardData.clearData(),a.clipboardData.setData(t.format,e);t.onCopy&&(a.preventDefault(),t.onCopy(a.clipboardData))})),document.body.appendChild(c),r.selectNodeContents(c),s.addRange(r),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");_=!0}catch(f){o&&console.error("unable to copy using execCommand: ",f),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),_=!0}catch(f){o&&console.error("unable to copy using clipboardData: ",f),o&&console.error("falling back to prompt"),i=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(i,e)}}finally{s&&("function"==typeof s.removeRange?s.removeRange(r):s.removeAllRanges()),c&&document.body.removeChild(c),l()}return _}},611:function(e,t,o){"use strict";o.d(t,{h:function(){return f}});var a=o(1249),n=o(5622),i=o(9097),l=o(2784),r=o(4371),s=o(8303),c=o(4828),_=" _boxSizing-deolkf _color-1gcmrwd _display-1471scf _fontFamily-xeweqh _fontSize-w3yt7z _lineHeight-1ytg55m _opacity-icoktb _wordWrap-qvutc0 _opacity--hover-6dt33c";function f(){return l.createElement(r.s,{tag:"header",className:" _alignItems-1awozwy _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-18u37iz _flexShrink-1q142lx _justifyContent-1wtj0ep _paddingBottom-c618ug _paddingLeft-ll5uop _paddingRight-q7v43y _paddingTop-6j2qwp _position-bnwqim _zIndex-184en5c"},l.createElement(i.default,{href:"/",passHref:!0},l.createElement(r.F,{tag:"a",className:" _alignItems-1oszu61 _boxSizing-deolkf _cursor-1loqt21 _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx _marginBottom-70510l _marginTop-kbtpn4"},l.createElement("div",{className:" _alignItems-1oszu61 _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx _height-109y4c4 _marginBottom-1ut4w64 _marginLeft-lqms97 _marginRight-de1ba6 _marginTop-19i43ro _opacity-zjitw4 _overflowX-11yh6sk _overflowY-buy8e9 _pointerEvents-633pao _position-u8s1d _width-92ng3h _zIndex-qpiwx7"},l.createElement("span",{className:" _boxSizing-deolkf _display-1471scf _fontFamily-187pbxx _wordWrap-qvutc0"},"Tamagui homepage")),l.createElement(a.Xe,null))),l.createElement("div",{className:" _alignItems-1awozwy _bottom-1p0dtai _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-18u37iz _flexShrink-1q142lx _justifyContent-1777fci _left-1d2f490 _position-u8s1d _right-zchlnj _top-ipm5af _pointerEvents-633pao _zIndex-1wyyakw _display-_sm_hvic4v"},l.createElement(a.Pk,null)),l.createElement(r.s,{tag:"nav",space:"$6",className:" _alignItems-1awozwy _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-18u37iz _flexShrink-1q142lx _pointerEvents-105ug2t"},l.createElement(i.default,{href:"/docs/intro/installation",passHref:!0},l.createElement(s.n,{tag:"a",className:_},"Docs")),l.createElement(i.default,{href:"/blog",passHref:!0},l.createElement(s.n,{tag:"a",className:_},"Blog")),l.createElement(c.X,null),l.createElement(n.T,null)))}},987:function(e,t,o){"use strict";o.r(t),o.d(t,{__N_SSG:function(){return E},default:function(){return S}});var a=o(2675),n=o(611),i=o(5306),l=o(6668),r=o(8840),s=o(2784),c=o(1295),_=Object.defineProperty;const f=((e,t)=>_(e,"name",{value:t,configurable:!0}))((e=>{const{color:t="black",size:o=24,...a}=e;return s.createElement(c.Svg,{width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...a},s.createElement(c.Line,{x1:"19",y1:"12",x2:"5",y2:"12",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),s.createElement(c.Polyline,{points:"12 19 5 12 12 5",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}))}),"ArrowLeft");var m=o(3021),d=o(1807),u=o(3098),p=o(9097),g=o(6725),h=o(9805),y=o(1801),x=o(8303),w=o(4371),b=o(9715),k=" _alignItems-1oszu61 _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx",z=" _boxSizing-deolkf _color-1gcmrwd _display-1471scf _fontFamily-xeweqh _fontSize-tg2oua _lineHeight-fyutky _wordWrap-qvutc0",v=" _alignItems-1oszu61 _backgroundColor-bccq0h _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx _height-109y4c4 _marginBottom-1605ih1 _marginLeft-1jj8364 _marginRight-lchren _marginTop-1hinesh _opacity-6dt33c",q=" _alignItems-1oszu61 _alignSelf-1pz39u2 _backgroundColor-bccq0h _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexGrow-18kxxzh _flexShrink-1wbh5a2 _height-16l9doz _marginLeft-10007ea _marginRight-llmf9j _opacity-6dt33c _width-92ng3h",E=!0;function S(e){var t=e.frontmatter,o=e.code,c=e.relatedPosts,_=s.useMemo((function(){return(0,u.getMDXComponent)(o)}),[o]),E='\n\t\thttps://twitter.com/intent/tweet?\n\t\ttext="'.concat(t.title,'" by @').concat(r.o[t.by].twitter," on the @tamagui_dev blog.&url=https://tamagui.dev/blog/").concat(t.slug,"\n\t\t");return s.createElement(s.Fragment,null,s.createElement(l.H,{title:"".concat(t.title," \u2014 Tamagui"),poster:t.poster}),s.createElement(n.h,null),s.createElement(a.W,null,s.createElement("div",{className:" _alignItems-1habvwh _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx"},s.createElement(p.default,{href:"/blog",passHref:!0},s.createElement(h.z,{hitSlop:{top:5,left:5,right:5,bottom:5},icon:s.createElement(f,{color:"var(--color3)",size:12}),tag:"a",space:"$2",className:" _backgroundColor-1niwhzg _borderBottomColor-oucylx _borderBottomLeftRadius-11w34mo _borderBottomRightRadius-pohjq _borderLeftColor-855088 _borderRightColor-114ovsg _borderTopColor-1c1gj4h _borderTopLeftRadius-1jqwn80 _borderTopRightRadius-1nr7l32 _boxShadow-15i92mo _cursor-1loqt21 _flexWrap-tzz3ar _justifyContent-1777fci _marginLeft-1efvwg4 _paddingBottom-1t60czk _paddingLeft-7ztw5e _paddingRight-g6vdx7 _paddingTop-1m22auq _backgroundColor--active-11h4f7 _backgroundColor--hover-98i0x0 _alignItems-1awozwy _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-18u37iz _flexShrink-1wbh5a2"},"Blog"))),s.createElement(y.H1,{accessibilityRole:"header",className:" _boxSizing-deolkf _color-1gcmrwd _display-1471scf _fontFamily-5vsfaw _fontSize-1agbc5j _fontWeight-b88u0q _letterSpacing-16krg75 _lineHeight-11nbz4w _marginTop-13y7me _wordWrap-qvutc0"},t.title),s.createElement(y.H2,{accessibilityRole:"header",className:" _boxSizing-deolkf _color-17rf3w5 _display-1471scf _fontFamily-xeweqh _fontSize-u57uvx _fontWeight-majxgm _lineHeight-1wna854 _marginBottom-nh9hgz _wordWrap-qvutc0"},t.description),s.createElement("div",{className:" _alignItems-1awozwy _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-18u37iz _flexShrink-1q142lx _marginBottom-1hss9ze"},s.createElement("span",{className:" _boxSizing-deolkf _color-scmqyp _display-1471scf _fontFamily-xeweqh _fontSize-w3yt7z _lineHeight-1ytg55m _whiteSpace-3s2u2q _wordWrap-qvutc0"},s.createElement(b.r,{href:"https://twitter.com/".concat(r.o[t.by].twitter),rel:"noopener noreferrer",variant:"subtle"},r.o[t.by].name)),s.createElement("div",{className:q}),s.createElement(x.n,{tag:"time",className:" _boxSizing-deolkf _color-scmqyp _display-1471scf _fontFamily-xeweqh _fontSize-w3yt7z _lineHeight-1ytg55m _wordWrap-qvutc0 _color-scmqyp _whiteSpace-3s2u2q"},(0,m.Z)((0,d.Z)(t.publishedAt),"MMMM yyyy")),s.createElement("div",{className:q}),s.createElement("div",{className:" _alignItems-1awozwy _boxSizing-deolkf _display-hvic4v _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx _display-_gtSm_6koalj"},s.createElement("span",{className:" _boxSizing-deolkf _color-scmqyp _display-1471scf _fontFamily-xeweqh _fontSize-w3yt7z _lineHeight-1ytg55m _wordWrap-qvutc0"},t.readingTime.text),"changelog"===t.type&&s.createElement(s.Fragment,null,s.createElement("div",{className:q}),s.createElement(h.z,{hitSlop:{top:5,left:5,right:5,bottom:5},className:" _backgroundColor-1gly1zx _borderBottomLeftRadius-11w34mo _borderBottomRightRadius-pohjq _borderTopLeftRadius-1jqwn80 _borderTopRightRadius-1nr7l32 _cursor-1loqt21 _flexWrap-tzz3ar _justifyContent-1777fci _paddingBottom-1t60czk _paddingLeft-7ztw5e _paddingRight-g6vdx7 _paddingTop-1m22auq _backgroundColor--active-11h4f7 _backgroundColor--hover-98i0x0 _alignItems-1awozwy _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-18u37iz _flexShrink-1wbh5a2"},"Changelog")))),s.createElement(g.Theme,{name:"pink"},s.createElement(_,{components:i.wx})),s.createElement("div",{className:v}),s.createElement("div",{className:" _alignItems-1awozwy _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx _marginBottom-1605ih1"},s.createElement("span",{className:z},"Share this post on"," ",s.createElement(b.r,{href:E,target:"_blank",rel:"noopener noreferrer",title:"Share this post on Twitter"},"Twitter"),".")),c&&s.createElement("div",{className:k},s.createElement("div",{className:v}),s.createElement(y.H3,{accessibilityRole:"header",className:" _boxSizing-deolkf _color-1gcmrwd _display-1471scf _fontFamily-5vsfaw _fontSize-1lyhjrf _fontWeight-1kfrs79 _lineHeight-19rlk43 _marginBottom-1hss9ze _textAlign-q4m81j _textTransform-tsynxw _wordWrap-qvutc0"},"Related"),s.createElement(w.F,{space:"$4",className:" _alignItems-1oszu61 _boxSizing-deolkf _display-6koalj _flexBasis-1mlwlqe _flexDirection-eqz5dr _flexShrink-1q142lx _marginBottom-4z7tmf _marginTop-13y7me"},c.map((function(e){return s.createElement(x.n,{tag:"a",key:e.slug,href:"/blog/".concat(e.slug),className:z},s.createElement(w.F,{space:"$2",className:k},s.createElement(y.H6,{accessibilityRole:"header",className:" _boxSizing-deolkf _color-scmqyp _display-1471scf _fontFamily-5vsfaw _fontSize-tg2oua _fontWeight-1kfrs79 _lineHeight-fyutky _wordWrap-qvutc0"},e.title),s.createElement("span",{className:z},e.description)))}))))))}},8840:function(e,t,o){"use strict";o.d(t,{o:function(){return a}});var a={nate:{name:"Nate Wienert",twitter:"natebirdman",avatar:""}}},7754:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[slug]",function(){return o(987)}])},4501:function(e,t){function o(e){let t,o=[];for(let a of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(a))o.push(parseInt(a,10));else if(t=a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,a,n,i]=t;if(a&&i){a=parseInt(a),i=parseInt(i);const e=a<i?1:-1;"-"!==n&&".."!==n&&"\u2025"!==n||(i+=e);for(let t=a;t!==i;t+=e)o.push(t)}}return o}t.default=o,e.exports=o},1706:function(e){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,o=[],a=0;a<e.rangeCount;a++)o.push(e.getRangeAt(a));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||o.forEach((function(t){e.addRange(t)})),t&&t.focus()}}},3098:function(e,t,o){e.exports=o(7575)},7575:function(e,t,o){"use strict";t.getMDXComponent=function(e,t){return s(e,t).default};var a=r(o(2784)),n=r(o(2111)),i=r(o(8316));function l(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,o=new WeakMap;return(l=function(e){return e?o:t})(e)}function r(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var o=l(t);if(o&&o.has(e))return o.get(e);var a={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var r=n?Object.getOwnPropertyDescriptor(e,i):null;r&&(r.get||r.set)?Object.defineProperty(a,i,r):a[i]=e[i]}return a.default=e,o&&o.set(e,a),a}function s(e,t){const o={React:a,ReactDOM:i,_jsx_runtime:n,...t};return new Function(...Object.keys(o),e)(...Object.values(o))}}},function(e){e.O(0,[774,251,395,888,179],(function(){return t=7754,e(e.s=t);var t}));var t=e.O();_N_E=t}]);