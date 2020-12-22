"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _clone = require("./clone");

Object.keys(_clone).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _clone[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _clone[key];
    },
  });
});

var _previewContext = require("./preview-context");

Object.keys(_previewContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _previewContext[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _previewContext[key];
    },
  });
});
