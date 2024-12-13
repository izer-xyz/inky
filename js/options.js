// https://developer.chrome.com/docs/extensions/develop/ui/options-page

(function(){
   "use strict";

   // Saves options to chrome.storage
   const save = () => {
 
     chrome.storage.sync.set( { 
          move:    document.getElementById('move').checked,
          makeup:  document.getElementById('makeup').checked,

          scroll:  document.getElementById('scroll').value,
          width:   document.getElementById('width').value,
          height:  document.getElementById('height').value,
          offset:  document.getElementById('offset').value,
          opacity: document.getElementById('opacity').value
       },
     );
   };

   // Restores select box and checkbox state using the preferences
   // stored in chrome.storage.
   const restore = () => {
     chrome.storage.sync.get().then( 
       (items) => {
          items.hasOwnProperty('move')    && ( document.getElementById('move').checked   = items.move  );
          items.hasOwnProperty('makeup')  && ( document.getElementById('makeup').checked = items.makeup);

          items.hasOwnProperty('scroll')  && ( document.getElementById('scroll').value  = items.scroll);
          items.hasOwnProperty('width')   && ( document.getElementById('width').value   = items.width   );
          items.hasOwnProperty('height')  && ( document.getElementById('height').value  = items.height  );
          items.hasOwnProperty('offset')  && ( document.getElementById('offset').value  = items.offset  );
          items.hasOwnProperty('opacity') && ( document.getElementById('opacity').value = items.opacity );
       }
     );
   };

   document.addEventListener('DOMContentLoaded', restore);

   Array.from(document.getElementsByTagName('input')).forEach( (e) => e.addEventListener('change', save) );

})();
