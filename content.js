(function() {

   "use strict";

   function style(e) {
   
      e.style.position = "fixed";
      e.style.bottom = "3em";
      e.style.height = "30vh";
      e.style.width = "5em"; 
      
      e.style.border = "dashed #999999";
      // e.style.background = "rgba(0,0,0,0.1)";
      e.style.setProperty("background-color", "rgba(0,0,0,0.1)", "important")
      
      e.style["z-index"] = 10001;

      return e;
   }

   function scroller(direction = 1) {
      return function() {
         window.scrollBy({
            top: 0.8 * window.innerHeight * direction,
            behavior: "instant",
         });
      };
   }

   let left = style(document.createElement("div"));
   left.style.borderRadius = "0 30vh 30vh 0";
   left.style.left = "0";
   left.onclick = scroller(-1);
   
   let right = style(document.createElement("div"));
   right.style.borderRadius = "30vh 0 0 30vh";
   right.style.right = "0";
   right.onclick = scroller();

   document.body.appendChild(left);
   document.body.appendChild(right);


   let link  = document.createElement("link");
   link.type = "text/css";
   link.rel  = "stylesheet";
   link.href = chrome.runtime.getURL("whitewash.css");

   let toggle = style(document.createElement("div"));
   toggle.style.height = toggle.style.width = "4em";
   toggle.style.top = toggle.style.right = 0;

   toggle.onclick = function() {
	link.rel = (link.rel == "" ? "stylesheet" : "");
   }
 
   document.getElementsByTagName("head")[0].appendChild(link);
   document.body.appendChild(toggle);

})();
