// https://developer.chrome.com/docs/extensions/develop/ui/options-page

(function(){
   "use strict";

   // Saves options to chrome.storage
   const saveOptions = () => {
     chrome.storage.sync.set(
       { 
          move: document.getElementById('move').checked,
          makeup: document.getElementById('makeup').ckecked,

          width: document.getElementById('width').value,
          height: document.getElementById('height').value,
          offset: document.getElementById('offset').value,
          opacity: document.getElementById('opacity').value

       },
     );
   };

   // Restores select box and checkbox state using the preferences
   // stored in chrome.storage.
   const restoreOptions = () => {
     chrome.storage.sync.get().then( 
       (items) => {
          console.log( items ); 
          items.move && ( document.getElementById('move').checked = items.move );
          items.makeup && ( document.getElementById('makeup').ckecked = items.makeup);

          items.width && ( document.getElementById('width').value = items.width );
          items.height && ( document.getElementById('height').value = items.height );
          items.offset && ( document.getElementById('offset').value = items.offset );
          items.opacity && ( document.getElementById('opacity').value = items.opacity );
       }
     );
   };

   document.addEventListener('DOMContentLoaded', restoreOptions);

   Array.from(document.getElementsByTagName('input')).forEach( (e) => e.addEventListener('change', saveOptions) );

})();
