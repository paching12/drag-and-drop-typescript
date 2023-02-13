/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("form");
const addressInput = document.getElementById("address");
const GOOGLE_API = "AIzaSyCjfT0bXL7xCUOvVSI5Mem3QompB31VIyM";
function searchAddressHandler(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const enteredAddress = addressInput.value;
        console.info("enteredAddress", enteredAddress);
    });
}
form.addEventListener("submit", searchAddressHandler);


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7QUFDN0MsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQXNCLENBQUM7QUFFN0UsTUFBTSxVQUFVLEdBQUcseUNBQXlDLENBQUM7QUFFN0QsU0FBZSxvQkFBb0IsQ0FBQyxLQUFZOztRQUM5QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUxQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBU2pELENBQUM7Q0FBQTtBQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlbGVjdGFuZHNoYXJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NlbGVjdGFuZHNoYXJlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2VsZWN0YW5kc2hhcmUvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgYXhpb3MgZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleFwiO1xyXG5cclxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpITtcclxuY29uc3QgYWRkcmVzc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRyZXNzXCIpISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuY29uc3QgR09PR0xFX0FQSSA9IFwiQUl6YVN5Q2pmVDBiWEw3eENVT3ZWU0k1TWVtM1FvbXBCMzFWSXlNXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hBZGRyZXNzSGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnN0IGVudGVyZWRBZGRyZXNzID0gYWRkcmVzc0lucHV0LnZhbHVlO1xyXG5cclxuICBjb25zb2xlLmluZm8oXCJlbnRlcmVkQWRkcmVzc1wiLCBlbnRlcmVkQWRkcmVzcyk7XHJcbiAgLy8gLy8gc2VuZCB0aGlzIHRvIEdvb2dsZSdzIGFwaVxyXG4gIC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KFxyXG4gIC8vICAgYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/YWRkcmVzcz0ke2VuY29kZVVSSShcclxuICAvLyAgICAgZW50ZXJlZEFkZHJlc3NcclxuICAvLyAgICl9JmtleT0ke0dPT0dMRV9BUEl9YFxyXG4gIC8vICk7XHJcblxyXG4gIC8vIGNvbnNvbGUuaW5mbyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcclxufVxyXG5cclxuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHNlYXJjaEFkZHJlc3NIYW5kbGVyKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9