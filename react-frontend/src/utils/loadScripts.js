
function loadScripts(src){
    return new Promise( (resolve,reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    })
}

export default loadScripts