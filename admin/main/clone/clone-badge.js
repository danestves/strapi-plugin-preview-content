"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CloneBadge = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _core = require("@buffetjs/core");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _templateObject() {
  var data = _taggedTemplateLiteral([
    "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  padding: 1rem;\n  border-radius: 0.2rem;\n  height: 2.5rem;\n  ",
    ";\n",
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

var Wrapper = _styledComponents.default.div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return "\n    border: 1px solid #82b3c9;\n    background-color: #e1f5fe;\n    "
    .concat(_core.Text, " {\n        font-weight: ")
    .concat(theme.main.fontWeights.bold, ";\n    }\n  ");
});

var CloneBadge = function CloneBadge(_ref2) {
  var isClone = _ref2.isClone;

  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;

  if (!isClone) {
    return "-";
  }

  return /*#__PURE__*/ _react.default.createElement(
    Wrapper,
    null,
    /*#__PURE__*/ _react.default.createElement(
      _core.Text,
      {
        lineHeight: "19px",
      },
      formatMessage({
        id: "preview.containers.List.clone",
      })
    )
  );
};

exports.CloneBadge = CloneBadge;
CloneBadge.propTypes = {
  isClone: _propTypes.default.bool.isRequired,
};
