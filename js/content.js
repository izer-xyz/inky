(function() {

   "use strict";

   function style(e) {
   
      e.style.position = 'fixed';
      e.style.border = 'dashed';
      e.style['z-index'] = 10001;

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
            behavior: 'instant',
         });
      };
   }

   function onTap(node, short, long) {

      let timer = null; 
      let pressed = false; 

      function start(e) {
         if (e.type === "click" && e.button !== 0) return;
         pressed = false; 
         timer = ( timer ? timer : setTimeout(() => {

            pressed = true; 

            long(); 

         }, 1000)); 

         return false; 
      }

      function cancel() {
         if (timer !== null) {
            clearTimeout(timer);
            timer = null;
         }
      }

      function click() {
         cancel(); 
         if (pressed) return false;

         short(); 
      } 
 
      node.addEventListener("mousedown", start);
      node.addEventListener("touchstart", start);

      node.addEventListener("click", click);

      node.addEventListener("mouseout", cancel);
      node.addEventListener("touchend", cancel);
      node.addEventListener("touchleave", cancel);
      node.addEventListener("touchcancel", cancel);
   }

   let left = style(document.createElement('div'));
   left.style.left = '0';
   // left.onclick = scroller(-1);
   
   let right = style(document.createElement('div'));
   right.style.right = '0';
   // right.onclick = scroller();


   let link  = document.createElement('link');
   link.type = 'text/css';
   link.rel  = 'stylesheet';
   link.href = chrome.runtime.getURL('css/whitewash.css');

   let toggle = style(document.createElement('div'));
   toggle.style.top = toggle.style.right = 0;

   //toggle.onclick = function () {
   // link.disabled = (link.disabled ? false : true);
   // }

   function hide() {
      left.style.display
        = right.style.display
        = toggle.style.display
        = 'none';

      setTimeout( () => left.style.display
        = right.style.display
        = toggle.style.display
        = 'block', 5000
      );
   }

   // config
 
   function setWidth(width = 5) {
      left.style.width 
        = right.style.width 
        = toggle.style.height 
        = toggle.style.width 
        = toggle.style.borderBottomLeftRadius 
        = width + 'em';
   }

   function setHeight(height = 30) {
      left.style.height 
        = right.style.height 
        = left.style.borderBottomRightRadius 
        = left.style.borderTopRightRadius 
        = right.style.borderBottomLeftRadius 
        = right.style.borderTopLeftRadius 
        = height + 'vh';
   }

   function setOpacity(opacity = 0.1) {
      let color = 'rgba(0,0,0,' + opacity + ')';
      left.style.borderColor
        = right.style.borderColor 
        = toggle.style.borderColor 
        = color;
      left.style.setProperty('background-color', color, 'important')
      right.style.setProperty('background-color', color, 'important')
      toggle.style.setProperty('background-color', color, 'important')
   }

   function setOffset(offset = 3) {
      left.style.bottom 
        = right.style.bottom 
        = offset + 'em';
   }

   function toggleMove(enable = true) {
      left.style.display 
        = right.style.display 
        = (enable ? 'block' : 'none') ;
   }

   function toggleMakeup(enable = true) {
      toggle.style.display = (enable ? 'block' : 'none');
      link.disabled = !enable;
   }


   function changeConfig(config = {}, area, setDefaults = false) {

      console.log(config); 

      function set(key, f) { return ( config.hasOwnProperty(key) && config[key].hasOwnProperty('newValue') ? f(config[key].newValue) : (setDefaults || config.hasOwnProperty(key)) && f(config[key]) ) };  

      set('width', setWidth);
      set('height', setHeight);
      set('opacity', setOpacity);
      set('offset', setOffset);
      set('move', toggleMove);
      set('makeup', toggleMakeup);
      
      set('scroll', setScrollOffset);
   }

   chrome.storage.onChanged.addListener(changeConfig);

   chrome.storage.sync.get().then( 
     (items) => changeConfig (items, null, true) 
   );

   onTap(left, scroller(-1), () => window.scrollTo({ top: 0, behavior: 'instant' }) );  
   onTap(right, scroller(),  () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }) );  
   onTap(toggle, () => link.disabled = (link.disabled ? false : true), hide); 

   document.getElementsByTagName('head')[0].appendChild(link);
   document.body.appendChild(toggle);
   document.body.appendChild(left);
   document.body.appendChild(right);

})();
