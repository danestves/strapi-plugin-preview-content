"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DataManagerContext_1 = __importDefault(require("../contexts/DataManagerContext"));
var useDataManager = function () { return react_1.useContext(DataManagerContext_1.default); };
exports.default = useDataManager;
//# sourceMappingURL=useDataManager.js.map