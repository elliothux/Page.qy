/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 358);
/******/ })
/************************************************************************/
/******/ ({

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(82);

var upload = _electron.remote.require('./main.js').upload;

var cancelButton = document.getElementById('cancel');
var retryButton = document.getElementById('retry');
var load = document.getElementById('load');
var message = document.getElementById('message');
var operateArea = document.getElementById('operateArea');

cancelButton.addEventListener('click', function () {
    upload.end();
});
retryButton.addEventListener('click', retry);

upload.start(messageClient);

function messageClient(message) {
    switch (message) {
        case 'error':
            failed();break;
        case 'done':
            success();break;
    }
}

function success() {
    load.style.display = 'none';
    message.innerHTML = '✨Upload success!';
    cancelButton.innerHTML = 'Done';
    operateArea.className = 'center';
}

function failed() {
    load.style.display = 'none';
    retryButton.style.display = 'inline-block';
    message.innerHTML = '😢Upload failed!';
    cancelButton.innerHTML = 'Done';
    operateArea.className = 'center';
}

function retry() {
    load.style.display = 'block';
    retryButton.style.display = 'none';
    message.innerHTML = '🏃Working hard on uploading...';
    cancelButton.innerHTML = 'Cancel';
    upload.start(messageClient);
    operateArea.className = '';
}

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });