(function() {

   "use strict";

   function style(e) {
   
      e.style.position = "fixed";
      // e.style.bottom = "3em";
      // e.style.height = "30vh";
      // e.style.width = "5em"; 
      
      e.style.border = "dashed";
      // e.style.background = "rgba(0,0,0,0.1)";
      // e.style.setProperty("background-color", "rgba(0,0,0,0.1)", "important")
      
      e.style["z-index"] = 10001;

      return e;
   }

   let scrollOffset = 0.8; 
   
   function setScrollOffset(offset) {
      scrollOffset = offset;
   }

   function scroller(direction = 1) {
      return function() {
         window.scrollBy({
            top: scrollOffset * window.innerHeight * direction,
            behavior: "instant",
         });
      };
   }

   let left = style(document.createElement("div"));
   //left.style.borderRadius = "0 30vh 30vh 0";
   left.style.left = "0";
   left.onclick = scroller(-1);
   
   let right = style(document.createElement("div"));
   //right.style.borderRadius = "30vh 0 0 30vh";
   right.style.right = "0";
   right.onclick = scroller();


   let link  = document.createElement("link");
   link.type = "text/css";
   link.rel  = "stylesheet";
   link.href = chrome.runtime.getURL("whitewash.css");

   let toggle = style(document.createElement("div"));
   // toggle.style.height = toggle.style.width = "5em";
   // toggle.style.borderRadius = "0 0 0 5em";
   toggle.style.top = toggle.style.right = 0;

   toggle.onclick = function() {
	link.rel = (link.rel == "" ? "stylesheet" : "");
   }

   function hide() {

   }

   // config
 
   function setWidth(width = 5) {
      left.style.width 
        = right.style.width 
        = toggle.style.height 
        = toggle.style.width 
        = toggle.style.borderBottomLeftRadius 
        = width + "em";
   }

   function setHeight(height = 30) {
      left.style.height 
        = right.style.height 
        = left.style.borderBottomRightRadius 
        = left.style.borderTopRightRadius 
        = right.style.borderBottomLeftRadius 
        = right.style.borderTopLeftRadius 
        = height + "vh";
   }

   function setOpacity(opacity = 0.1) {
      let color = "rgba(0,0,0," + opacity + ")";
      left.style.borderColor
        = right.style.borderColor 
        = toggle.style.borderColor 
        = color;
      left.style.setProperty("background-color", color, "important")
      right.style.setProperty("background-color", color, "important")
      toggle.style.setProperty("background-color", color, "important")
   }

   function setOffset(offset = 3) {
      left.style.bottom 
        = right.style.bottom 
        = offset + "em";
   }

   function toggleMove(enable = true) {
      left.style.display 
        = right.style.display 
        = (enable ? "block" : "none") ;
   }

   function toggleMakeup(enable = true) {
      toggle.style.display = (enable ? "block" : "none");
   }


   function changeConfig(config = {}, area, setDefaults = false) {

      console.log(config); 

      function get(key, f) { return ( config[key] && config[key].newValue ? f(config[key].newValue) : (setDefaults || config[key]) && f(config[key]) ) };  

      get("width", setWidth);
      get("height", setHeight);
      get("opacity", setOpacity);
      get("offset", setOffset);
      get("move", toggleMove);
      get("makeup", toggleMakeup);
   }

   chrome.storage.onChanged.addListener(changeConfig);

   chrome.storage.sync.get().then( 
     (items) => changeConfig (items, null, true) 
   );
 
   document.getElementsByTagName("head")[0].appendChild(link);
   document.body.appendChild(toggle);
   document.body.appendChild(left);
   document.body.appendChild(right);

})();
