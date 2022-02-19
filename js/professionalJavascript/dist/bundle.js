/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _unit3_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unit3/index */ \"./src/unit3/index.js\");\n\n\n//# sourceURL=webpack://professionalJavascript/./src/index.js?");

/***/ }),

/***/ "./src/unit3/3.4.6.js":
/*!****************************!*\
  !*** ./src/unit3/3.4.6.js ***!
  \****************************/
/***/ (() => {

eval("function simpleTag(strings, aValue, bValue, sunVal) {\n    console.log('simpleTag', {strings, aValue, bValue, sunVal});\n    return 'footer'\n}\n\nfunction simpleTag2(strings, ...expression) {\n    console.log('simpleTag', {strings, expression});\n    return 'footer'\n}\n\nfunction zipTzg(strings, ...expressiom) {\n    return strings[0] + expressiom.map((e, index) => {\n        return e + strings[index + 1];\n    }).join('');\n}\n\n\nlet a = 6;\nlet b = 9;\n\nlet unTaggedResult = `${a} + ${b} = ${ a + b }`;\n// let taggedResult = simpleTag`${a} + ${b} = ${ a + b }`;\n// let taggedResult = simpleTag2`${a} + ${b} = ${ a + b }`;\nlet taggedResult = zipTzg`${a} + ${b} = ${ a + b }`;\n\nconsole.log('unaggedResult', unTaggedResult);\nconsole.log('taggedResult', taggedResult);\n\nconsole.log('模版字符串\\u00A9', String.raw`\\u00A9`);\nconsole.log('模版字符串\\n', `first line\\nsecond line`);\nconsole.log('模版字符串', String.raw`first line\\nsecond line\\u00A9`);\n\n//# sourceURL=webpack://professionalJavascript/./src/unit3/3.4.6.js?");

/***/ }),

/***/ "./src/unit3/index.js":
/*!****************************!*\
  !*** ./src/unit3/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _3_4_6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3.4.6 */ \"./src/unit3/3.4.6.js\");\n/* harmony import */ var _3_4_6__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_3_4_6__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack://professionalJavascript/./src/unit3/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;