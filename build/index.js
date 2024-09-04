(()=>{"use strict";var e,t={476:()=>{const e=window.React,t=window.wp.blocks,r=window.wp.blockEditor,a=window.wp.data,o=window.wp.components;var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"};const m=(t,r)=>{const a=(0,e.forwardRef)((({color:t="currentColor",size:a=24,strokeWidth:o=1.5,className:m="",children:s,...l},c)=>{const i={ref:c,...n,width:a,height:a,strokeWidth:o,color:t,className:m,...l};return(0,e.createElement)("svg",i,r?.map((([t,r])=>(0,e.createElement)(t,{key:r.id,...r})))??[],...Array.isArray(s)?s:[s])}));return a.displayName=`${t}Icon`,a},s=m("MailAtSign01Icon",[["path",{d:"M2 5L8.91302 8.92462C11.4387 10.3585 12.5613 10.3585 15.087 8.92462L22 5",stroke:"currentColor",key:"k0"}],["path",{d:"M10.5 19.5C10.0337 19.4939 9.56682 19.485 9.09883 19.4732C5.95033 19.3941 4.37608 19.3545 3.24496 18.2184C2.11383 17.0823 2.08114 15.5487 2.01577 12.4814C1.99475 11.4951 1.99474 10.5147 2.01576 9.52843C2.08114 6.46113 2.11382 4.92748 3.24495 3.79139C4.37608 2.6553 5.95033 2.61573 9.09882 2.53658C11.0393 2.4878 12.9607 2.48781 14.9012 2.53659C18.0497 2.61574 19.6239 2.65532 20.755 3.79141C21.8862 4.92749 21.9189 6.46114 21.9842 9.52844C21.9939 9.98251 21.9991 10.1965 21.9999 10.5",stroke:"currentColor",key:"k1"}],["path",{d:"M19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17ZM19 17V17.5C19 18.3284 19.6716 19 20.5 19C21.3284 19 22 18.3284 22 17.5V17C22 14.5147 19.9853 12.5 17.5 12.5C15.0147 12.5 13 14.5147 13 17C13 19.4853 15.0147 21.5 17.5 21.5",stroke:"currentColor",key:"k2"}]]),l=m("SmartPhone04Icon",[["path",{d:"M16 6.5C15.9377 4.78752 15.7251 3.75009 14.9988 3.02513C13.9718 2 12.3188 2 9.01289 2C5.70698 2 4.05403 2 3.02701 3.02513C2 4.05025 2 5.70017 2 9V15C2 18.2998 2 19.9497 3.02701 20.9749C4.05403 22 5.70698 22 9.01289 22C12.3188 22 13.9718 22 14.9988 20.9749C15.7251 20.2499 15.9377 19.2125 16 17.5",stroke:"currentColor",key:"k0"}],["path",{d:"M8 19H10",stroke:"currentColor",key:"k1"}],["path",{d:"M16 11.9908L16 11.9998M20.0483 16.4912C21.2541 15.3396 22 13.7486 22 11.9912C22 10.2339 21.2541 8.64286 20.0483 7.49121M18 9.74121C18.6029 10.317 18.9759 11.1125 18.9759 11.9912C18.9759 12.8699 18.6029 13.6654 18 14.2412",stroke:"currentColor",key:"k2"}],["path",{d:"M6 2L6.089 2.53402C6.28188 3.69129 6.37832 4.26993 6.77519 4.62204C7.18918 4.98934 7.77614 5 9 5C10.2239 5 10.8108 4.98934 11.2248 4.62204C11.6217 4.26993 11.7181 3.69129 11.911 2.53402L12 2",stroke:"currentColor",key:"k3"}]]),c=t=>(0,e.createElement)("div",{className:"team-members-grid"},t.members.map((t=>(0,e.createElement)("div",{key:t.id,className:"member-card"},(0,e.createElement)("div",{className:"member-image-wrapper"},(0,e.createElement)("img",{src:t.meta.avatar,alt:t.title.rendered,className:"member-avatar"}),(0,e.createElement)("div",{className:"member-overlay"},(0,e.createElement)("h2",{className:"member-name"},t.title.rendered),(0,e.createElement)("p",{className:"member-position"},t.meta.position))),(0,e.createElement)("div",{className:"member-details"},(0,e.createElement)("p",{className:"member-bio"},t.meta.biography),(0,e.createElement)("a",{href:`mailto:${t.meta.email}`,className:"member-contact"},(0,e.createElement)(s,{size:22,className:"icon-email"}),(0,e.createElement)("span",null,t.meta.email)),(0,e.createElement)("a",{href:`tel:${t.meta.phone}`,className:"member-contact"},(0,e.createElement)(l,{size:22,className:"icon-phone"}),(0,e.createElement)("span",null,t.meta.phone))))))),i=window.wp.element,p=JSON.parse('{"UU":"create-block/team-members-block"}'),d=(0,e.createElement)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24","aria-hidden":"true",focusable:"false"},(0,e.createElement)("path",{d:"M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"}));(0,t.registerBlockType)(p.UU,{icon:d,edit:function({setAttributes:t}){const n=(0,r.useBlockProps)(),m=(0,a.useSelect)((e=>e("core").getEntityRecords("postType","team_member",{per_page:-1,_embed:!0})),[]);return(0,i.useEffect)((()=>{m&&m.length>0&&t({teamMembers:m})}),[m]),m?0===m.length?(0,e.createElement)("p",{...n},"Nie znaleziono członków zespolu"):(0,e.createElement)("div",{...n},(0,e.createElement)(c,{members:m})):(0,e.createElement)("p",{...n},(0,e.createElement)(o.Spinner,null))},save:function({attributes:t}){return console.log(t),(0,e.createElement)("div",{...r.useBlockProps.save()},(0,e.createElement)(c,{members:t.teamMembers}))}})}},r={};function a(e){var o=r[e];if(void 0!==o)return o.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,a),n.exports}a.m=t,e=[],a.O=(t,r,o,n)=>{if(!r){var m=1/0;for(i=0;i<e.length;i++){r=e[i][0],o=e[i][1],n=e[i][2];for(var s=!0,l=0;l<r.length;l++)(!1&n||m>=n)&&Object.keys(a.O).every((e=>a.O[e](r[l])))?r.splice(l--,1):(s=!1,n<m&&(m=n));if(s){e.splice(i--,1);var c=o();void 0!==c&&(t=c)}}return t}n=n||0;for(var i=e.length;i>0&&e[i-1][2]>n;i--)e[i]=e[i-1];e[i]=[r,o,n]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};a.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,m=r[0],s=r[1],l=r[2],c=0;if(m.some((t=>0!==e[t]))){for(o in s)a.o(s,o)&&(a.m[o]=s[o]);if(l)var i=l(a)}for(t&&t(r);c<m.length;c++)n=m[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(i)},r=self.webpackChunkteam_members_block=self.webpackChunkteam_members_block||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=a.O(void 0,[350],(()=>a(476)));o=a.O(o)})();