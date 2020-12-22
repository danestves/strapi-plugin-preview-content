"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var sanitizeEntity = require("strapi-utils").sanitizeEntity;
var PreviewError = require("./preview-error");
/**
 * Get components from a givne template
 *
 * @param {{ __component: string }[]} template
 *
 * @returns Returns the component, otherwise a error 400.
 */
// const getTemplateComponentFromTemplate = (template) => {
//   if (template && template[0] && template[0].__component) {
//     const componentName = template[0].__component;
//     return global.strapi.components[componentName];
//   }
//   throw new PreviewError(400, "Template field is incompatible");
// };
/**
 * preview.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
module.exports = {
    /**
     * Get if content type is previewable
     *
     * @param contentType - The content type to check
     *
     * @returns - Returns inf content type is previewable
     */
    isPreviewable: function (contentType) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = global.strapi.query(contentType)) === null || _a === void 0 ? void 0 : _a.model)];
                    case 1:
                        model = _b.sent();
                        if (model) {
                            return [2 /*return*/, model.options.previewable];
                        }
                        throw new PreviewError(400, "Wrong contentType");
                }
            });
        });
    },
    /**
     * Find a content type by id previewable
     *
     * @param - The content type to query
     * @param - The ID of the content to query
     * @param - The query string params from URL
     *
     * @returns Returns an object with the template name, content type and data; otherwise error 400.
     */
    findOne: function (contentType, id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var service, model, contentPreview, contentPreviewPublished, contentPreviewDraft, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = global.strapi.services[contentType];
                        model = global.strapi.models[contentType];
                        if (!service) {
                            throw new PreviewError(400, "Wrong contentType");
                        }
                        if (!model.options.previewable) {
                            throw new PreviewError(400, "This content type is not previewable");
                        }
                        return [4 /*yield*/, service.findOne(__assign(__assign({}, query), { id: id }))];
                    case 1:
                        contentPreviewPublished = _a.sent();
                        if (contentPreviewPublished) {
                            contentPreview = contentPreviewPublished;
                        }
                        return [4 /*yield*/, service.findOne(__assign(__assign({}, query), { id: id }))];
                    case 2:
                        contentPreviewDraft = _a.sent();
                        if (contentPreviewDraft) {
                            contentPreview = contentPreviewDraft;
                        }
                        if (!contentPreview) {
                            throw new PreviewError(404, "Preview not found for given content type and Id");
                        }
                        data = sanitizeEntity(contentPreview, { model: model });
                        // const templateComponent = getTemplateComponentFromTemplate(data.template);
                        return [2 /*return*/, {
                                // templateName: templateComponent.options.templateName,
                                contentType: contentType,
                                data: data,
                            }];
                }
            });
        });
    },
    /**
     * Get the preview url from a content type by id
     *
     * @param - The content type to query
     * @param - The content type id to query
     * @param - The query strings from URL
     *
     * @returns The preview URL parsed with `replacePreviewParams()`
     */
    getPreviewUrl: function (contentType, contentId, _query) {
        var previewUrl = global.strapi.config.get("custom.previewUrl") || "";
        return this.replacePreviewParams(contentType, contentId, previewUrl);
    },
    /**
     * Replace URL from string params
     *
     * @param - The content type to query
     * @param - The content type id to query
     * @param - The url string to replace
     *
     * @returns The replaced URL
     */
    replacePreviewParams: function (contentType, contentId, url) {
        return url.replace(":contentType", contentType).replace(":id", contentId);
    },
};
//# sourceMappingURL=preview.js.map