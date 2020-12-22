"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getCloneHeader = exports.shouldAddCloneHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _cloneBadge = require("./clone-badge");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var shouldAddCloneHeader = function shouldAddCloneHeader(layout) {
  var _layout$contentType$s = layout.contentType.schema,
    options = _layout$contentType$s.options,
    attributes = _layout$contentType$s.attributes;
  return options.previewable && !!attributes.cloneOf;
};

exports.shouldAddCloneHeader = shouldAddCloneHeader;

var getCloneHeader = function getCloneHeader(formatMessage) {
  return {
    label: formatMessage({
      id: "preview.containers.List.state",
    }),
    name: "cloneOf",
    searchable: false,
    sortable: true,
    cellFormatter: function cellFormatter(cellData) {
      return /*#__PURE__*/ _react.default.createElement(
        _cloneBadge.CloneBadge,
        {
          isClone: !!cellData.cloneOf,
        }
      );
    },
  };
};

exports.getCloneHeader = getCloneHeader;
