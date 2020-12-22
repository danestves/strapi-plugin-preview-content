"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.usePreview = exports.PreviewProvider = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _strapiHelperPlugin = require("strapi-helper-plugin");

var _lodash = require("lodash");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var CONTENT_MANAGER_PLUGIN_ID = "content-manager";
var PreviewContext = /*#__PURE__*/ (0, _react.createContext)(undefined);

var PreviewProvider = function PreviewProvider(_ref) {
  var children = _ref.children,
    initialData = _ref.initialData,
    isCreatingEntry = _ref.isCreatingEntry,
    layout = _ref.layout,
    modifiedData = _ref.modifiedData,
    slug = _ref.slug,
    canUpdate = _ref.canUpdate,
    canCreate = _ref.canCreate,
    _ref$getPreviewUrlPar = _ref.getPreviewUrlParams,
    getPreviewUrlParams =
      _ref$getPreviewUrlPar === void 0
        ? function () {
            return {};
          }
        : _ref$getPreviewUrlPar;

  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;

  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showWarningClone = _useState2[0],
    setWarningClone = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showWarningPublish = _useState4[0],
    setWarningPublish = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    previewable = _useState6[0],
    setIsPreviewable = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isButtonLoading = _useState8[0],
    setButtonLoading = _useState8[1];

  var toggleWarningClone = function toggleWarningClone() {
    return setWarningClone(function (prevState) {
      return !prevState;
    });
  };

  var toggleWarningPublish = function toggleWarningPublish() {
    return setWarningPublish(function (prevState) {
      return !prevState;
    });
  };

  (0, _react.useEffect)(
    function () {
      (0, _strapiHelperPlugin.request)(
        "/preview-content/is-previewable/".concat(layout.apiID),
        {
          method: "GET",
        }
      ).then(function (_ref2) {
        var isPreviewable = _ref2.isPreviewable;
        setIsPreviewable(isPreviewable);
      });
    },
    [layout.apiID]
  );
  var didChangeData = (0, _react.useMemo)(
    function () {
      return (
        !(0, _lodash.isEqual)(initialData, modifiedData) ||
        (isCreatingEntry && !(0, _lodash.isEmpty)(modifiedData))
      );
    },
    [initialData, isCreatingEntry, modifiedData]
  );
  var previewHeaderActions = (0, _react.useMemo)(
    function () {
      var headerActions = [];

      if (
        previewable &&
        ((isCreatingEntry && canCreate) || (!isCreatingEntry && canUpdate))
      ) {
        var params = getPreviewUrlParams(initialData, modifiedData, layout);
        headerActions.push({
          disabled: didChangeData,
          label: formatMessage({
            id: getPreviewPluginTrad("containers.Edit.preview"),
          }),
          color: "secondary",
          onClick: async function onClick() {
            try {
              var data = await (0, _strapiHelperPlugin.request)(
                "/preview-content/preview-url/"
                  .concat(layout.apiID, "/")
                  .concat(initialData.id),
                {
                  method: "GET",
                  params: params,
                }
              );

              if (data.url) {
                window.open(data.url, "_blank");
              } else {
                strapi.notification.error(
                  getPreviewPluginTrad("error.previewUrl.notFound")
                );
              }
            } catch (_e) {
              strapi.notification.error(
                getPreviewPluginTrad("error.previewUrl.notFound")
              );
            }
          },
          type: "button",
          style: {
            paddingLeft: 15,
            paddingRight: 15,
            fontWeight: 600,
          },
        });

        if (initialData.cloneOf) {
          headerActions.push({
            disabled: didChangeData,
            label: formatMessage({
              id: getPreviewPluginTrad("containers.Edit.publish"),
            }),
            color: "primary",
            onClick: async function onClick() {
              toggleWarningPublish();
            },
            type: "button",
            style: {
              paddingLeft: 15,
              paddingRight: 15,
              fontWeight: 600,
            },
          });
        } else {
          headerActions.push({
            disabled: didChangeData,
            label: formatMessage({
              id: getPreviewPluginTrad("containers.Edit.clone"),
            }),
            color: "secondary",
            onClick: toggleWarningClone,
            type: "button",
            style: {
              paddingLeft: 15,
              paddingRight: 15,
              fontWeight: 600,
            },
          });
        }
      }

      return headerActions;
    },
    [
      didChangeData,
      formatMessage,
      layout.apiID,
      previewable,
      initialData.cloneOf,
      initialData.id,
      canCreate,
      canUpdate,
      isCreatingEntry,
    ]
  );

  var handleConfirmPreviewClone = async function handleConfirmPreviewClone() {
    try {
      // Show the loading state
      setButtonLoading(true);
      var clonedPayload = await (0, _strapiHelperPlugin.request)(
        getRequestUrl(slug),
        {
          method: "POST",
          body: {
            ...initialData,
            cloneOf: initialData.id,
            options: { ...initialData.options, previewable: true },
          },
        }
      );
      strapi.notification.success(getPreviewPluginTrad("success.record.clone"));
      window.location.replace(getFrontendEntityUrl(slug, clonedPayload.id));
    } catch (err) {
      var errorMessage = (0, _lodash.get)(
        err,
        "response.payload.message",
        formatMessage({
          id: getPreviewPluginTrad("error.record.clone"),
        })
      );
      strapi.notification.error(errorMessage);
    } finally {
      setButtonLoading(false);
      toggleWarningClone();
    }
  };

  var handleConfirmPreviewPublish = async function handleConfirmPreviewPublish() {
    try {
      // Show the loading state
      setButtonLoading(true);
      var targetId = initialData.cloneOf.id;
      var urlPart = getRequestUrl(slug);
      var body = prepareToPublish({
        ...initialData,
        id: targetId,
        cloneOf: null,
      });
      await (0, _strapiHelperPlugin.request)(
        "".concat(urlPart, "/").concat(targetId),
        {
          method: "PUT",
          body: body,
        }
      );
      await (0, _strapiHelperPlugin.request)(
        "".concat(urlPart, "/").concat(initialData.id),
        {
          method: "DELETE",
        }
      );
      strapi.notification.success(
        getPreviewPluginTrad("success.record.publish")
      );
      window.location.replace(getFrontendEntityUrl(slug, targetId));
    } catch (err) {
      var errorMessage = (0, _lodash.get)(
        err,
        "response.payload.message",
        formatMessage({
          id: getPreviewPluginTrad("error.record.publish"),
        })
      );
      strapi.notification.error(errorMessage);
    } finally {
      setButtonLoading(false);
      toggleWarningPublish();
    }
  };

  var value = {
    previewHeaderActions: previewHeaderActions,
  };
  return /*#__PURE__*/ _react.default.createElement(
    _react.default.Fragment,
    null,
    /*#__PURE__*/ _react.default.createElement(
      PreviewContext.Provider,
      {
        value: value,
      },
      children
    ),
    previewable &&
      /*#__PURE__*/ _react.default.createElement(
        _strapiHelperPlugin.PopUpWarning,
        {
          isOpen: showWarningClone,
          toggleModal: toggleWarningClone,
          content: {
            message: getPreviewPluginTrad("popUpWarning.warning.clone"),
            secondMessage: getPreviewPluginTrad(
              "popUpWarning.warning.clone-question"
            ),
          },
          popUpWarningType: "info",
          onConfirm: handleConfirmPreviewClone,
          isConfirmButtonLoading: isButtonLoading,
        }
      ),
    previewable &&
      /*#__PURE__*/ _react.default.createElement(
        _strapiHelperPlugin.PopUpWarning,
        {
          isOpen: showWarningPublish,
          toggleModal: toggleWarningPublish,
          content: {
            message: getPreviewPluginTrad("popUpWarning.warning.publish"),
            secondMessage: getPreviewPluginTrad(
              "popUpWarning.warning.publish-question"
            ),
          },
          popUpWarningType: "info",
          onConfirm: handleConfirmPreviewPublish,
          isConfirmButtonLoading: isButtonLoading,
        }
      )
  );
};

exports.PreviewProvider = PreviewProvider;

var usePreview = function usePreview() {
  var context = (0, _react.useContext)(PreviewContext);

  if (context === undefined) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }

  return context;
};
/**
 * Should remove ID's from components -
 * could modify only already attached componetns (with proper ID)
 * or create new one - in that case removing id will create new one
 * @param {object} payload
 */

exports.usePreview = usePreview;

function prepareToPublish(payload) {
  if (Array.isArray(payload)) {
    payload.forEach(prepareToPublish);
  } else if (payload && payload.constructor === Object) {
    // eslint-disable-next-line no-prototype-builtins
    if (payload.hasOwnProperty("__component")) {
      delete payload.id;
    }

    Object.values(payload).forEach(prepareToPublish);
  }

  return payload;
}

var getRequestUrl = function getRequestUrl(path) {
  return "/".concat(CONTENT_MANAGER_PLUGIN_ID, "/explorer/").concat(path);
};

var getFrontendEntityUrl = function getFrontendEntityUrl(path, id) {
  return "/admin/plugins/"
    .concat(CONTENT_MANAGER_PLUGIN_ID, "/collectionType/")
    .concat(path, "/")
    .concat(id);
};

var getPreviewPluginTrad = function getPreviewPluginTrad(id) {
  return "preview.".concat(id);
};

PreviewProvider.propTypes = {
  children: _propTypes.default.node.isRequired,
  canUpdate: _propTypes.default.bool.isRequired,
  canCreate: _propTypes.default.bool.isRequired,
  initialData: _propTypes.default.object.isRequired,
  isCreatingEntry: _propTypes.default.bool.isRequired,
  layout: _propTypes.default.object.isRequired,
  modifiedData: _propTypes.default.object.isRequired,
  slug: _propTypes.default.string.isRequired,
  getPreviewUrlParams: _propTypes.default.func,
};
