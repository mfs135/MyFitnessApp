import { useEffect } from "react";
import loadScripts from "./utils/loadScripts.js";
import MyRouter from "./router/index.js";


function App() {

  //Load scripts for each page.
    useEffect(() => {
        // Load scripts sequentially
        loadScripts('/js/jquery.min.js')
          .then(() => loadScripts('/js/popper.min.js'))
          .then(() => loadScripts('/js/bootstrap.min.js'))
          .then(() => loadScripts('/js/jquery.easing.min.js'))
          .then(() => loadScripts('/js/swiper.min.js'))
          .then(() => loadScripts('/js/morphext.min.js'))
          .then(() => loadScripts('/js/isotope.pkgd.min.js'))
          .then(() => loadScripts('/js/validator.min.js'))
          .then(() => loadScripts('./js/scripts.js'))
          .catch(err => console.error("Script loading failed: ", err));
    
        // Cleanup function to remove the scripts if the component unmounts
        return () => {
          document.querySelectorAll('script').forEach(script => {
            if (script.src.includes('/js/')) {
              script.remove();
            }
          });
        };
      }, []);


  return (
    <div>
      <MyRouter />
    </div>

  );
}

export default App;
