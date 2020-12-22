"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
module.exports = /** @class */ (function (_super) {
    __extends(PreviewError, _super);
    function PreviewError(status, message, payload) {
        if (payload === void 0) { payload = undefined; }
        var _this = _super.call(this) || this;
        _this.name = "Strapi:Plugin:PreviewContent";
        _this.status = status || 500;
        _this.message = message || "Internal error";
        _this.payload = payload;
        return _this;
    }
    PreviewError.prototype.toString = function (e) {
        if (e === void 0) { e = this; }
        return e.name + " - " + e.message;
    };
    PreviewError.prototype.getData = function () {
        if (this.payload) {
            return JSON.stringify(__assign({ name: this.name, message: this.message }, (this.payload || {})));
        }
        return this.toString();
    };
    return PreviewError;
}((Error)));
//# sourceMappingURL=preview-error.js.map