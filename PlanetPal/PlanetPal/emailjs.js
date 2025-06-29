var emailjs=function(e){"use strict";
    class t{constructor(){
        let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,
        t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Network Error";this.status=e,this.text=t}}const 
        i={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)
            return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(
                localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))
            }})()},
            r=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},o=function(e){
                let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"https://api.emailjs.com";
                if(!e)
                    return;const 
                o=r(e);
                i.publicKey=o.publicKey,i.blockHeadless=o.blockHeadless,i.storageProvider=o.storageProvider,i.blockList=o.blockList,i.limitRate=o.limitRate,i.origin=o.origin||t},
                a=async function(e,r){
                    let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};
                    const a=await fetch(i.origin+e,{
                        method:"POST",headers:o,body:r
                    }),
                    s=await a.text(),n=new t(a.status,s);
                    if(a.ok)return n;throw n},s=(e,t,i)=>{if(!e||"string"!=typeof e)
                        throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";
                        if(!t||"string"!=typeof t)
                            throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";
                        if(!i||"string"!=typeof i)
                            throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},
                        n=e=>e.webdriver||!e.languages||0===e.languages.length,
                        l=()=>new t(451,"Unavailable For Headless Browser"),
                        c=(e,t)=>{if((e=>!e.list?.length||!e.watchVariable)(e))
                            return!1;((e,t)=>{if(!Array.isArray(e))
                                throw"The BlockList list has to be an array";
                                if("string"!=typeof t)
                                    throw"The BlockList watchVariable has to be a string"}
                                )
                                (e.list,e.watchVariable);
                                const i=(r=t,o=e.watchVariable,r instanceof FormData?r.get(o):r[o]);
                                var r,o;return"string"==typeof i&&e.list.includes(i)},d=()=>new t(403,"Forbidden"),
                                m=async(e,t,i)=>{if(!t.throttle||!i)return!1;((e,t)=>{
                                    if("number"!=typeof e||e<0)
                                    throw"The LimitRate throttle has to be a positive number";
                                if(t&&"string"!=typeof t)
                                    throw"The LimitRate ID has to be a non-empty string"}
                                )
                                (t.throttle,t.id);const r=t.id||e,o=await(async(e,t,i)=>{
                                    const r=Number(await i.get(e)||0);return t-Date.now()+r})
                                    (r,t.throttle,i);return o>0||(await i.set(r,Date.now().toString()),!1)},
                                    h=()=>new t(429,"Too Many Requests"),p=async(e,t,o,p)=>{
                                        const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=u.storageProvider||i.storageProvider,w={...i.blockList,...u.blockList},y={...i.limitRate,...u.limitRate};
                                        if(g&&n(navigator))return Promise.reject(l());
                                        if(s(b,e,t),(e=>{
                                            if(e&&"[object Object]"!==e.toString())
                                                throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"
                                            })
                                            (o),o&&c(w,o))return Promise.reject(d());
                                            if(await m(location.pathname,y,f))return Promise.reject(h());
                                            const v={lib_version:"4.4.1",user_id:b,service_id:e,template_id:t,template_params:o};
                                            return a("/api/v1.0/email/send",JSON.stringify(v),{"Content-type":"application/json"}
                                        )},
                                        u=async(e,t,o,p)=>{
                                            const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=i.storageProvider||u.storageProvider,
                                            w={...i.blockList,...u.blockList},y={...i.limitRate,...u.limitRate};
                                            if(g&&n(navigator))
                                                return Promise.reject(l());
                                            const v=(e=>"string"==typeof e?document.querySelector(e):e)(o);s(b,e,t),(e=>{
                                                if(!e||"FORM"!==e.nodeName)
                                                    throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"})(v);
                                                const j=new FormData(v);
                                                return c(w,j)?Promise.reject(d()):await m(location.pathname,y,f)?Promise.reject(h()):(j.append("lib_version","4.4.1"),j.append("service_id",e),j.append("template_id",t),j.append("user_id",b),a("/api/v1.0/email/send-form",j))};
                                                var b={init:o,send:p,sendForm:u,EmailJSResponseStatus:t};
                                                return e.EmailJSResponseStatus=t,e.default=b,e.init=o,e.send=p,e.sendForm=u,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
// Initialize EmailJS with your public key

(function(){
     emailjs.init({
       publicKey: "YOUR_PUBLIC_KEY",
     });
})();