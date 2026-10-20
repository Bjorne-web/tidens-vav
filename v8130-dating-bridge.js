/* Present source-specific dating data through the existing typed Temaspår reader. */
(function(){'use strict';
const previous=window.TIDENS_C7_DATING_PILOT||{};
const batch=window.TIDENS_C7_DATING_BATCH36||{};
window.TIDENS_C7_DATING_PILOT=Object.freeze(Object.assign({},previous,batch));
})();