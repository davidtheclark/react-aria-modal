'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var FocusTrap = require('focus-trap-react');
var displace = require('react-displace');
var noScroll = require('no-scroll');

var focusTrapFactory = React.createFactory(FocusTrap);

var Modal = (_temp = _class = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.getApplicationNode = function () {
      if (_this.props.getApplicationNode) return _this.props.getApplicationNode();
      return _this.props.applicationNode;
    };

    _this.checkClick = function (event) {
      if (_this.dialogNode && _this.dialogNode.contains(event.target)) return;
      _this.deactivate();
    };

    _this.deactivate = function () {
      _this.props.onExit();
    };

    _this.checkClick = _this.checkClick.bind(_this);
    _this.deactivate = _this.deactivate.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.titleText && !this.props.titleId) {
        throw new Error('react-aria-modal instances should have a `titleText` or `titleId`');
      }
      noScroll.on();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = this.props;
      if (props.onEnter) {
        props.onEnter();
      }
      // Timeout to ensure this happens *after* focus has moved
      var applicationNode = this.getApplicationNode();
      setTimeout(function () {
        if (applicationNode) {
          applicationNode.setAttribute('aria-hidden', 'true');
        }
      }, 0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      noScroll.off();
      var applicationNode = this.getApplicationNode();
      if (applicationNode) {
        applicationNode.setAttribute('aria-hidden', 'false');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      var style = {};
      if (props.includeDefaultStyles) {
        style = {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1050,
          overflowX: 'hidden',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          textAlign: 'center'
        };

        if (props.underlayColor) {
          style.background = props.underlayColor;
        }

        if (props.underlayClickExits) {
          style.cursor = 'pointer';
        }
      }

      if (props.underlayStyle) {
        for (var key in props.underlayStyle) {
          if (!props.underlayStyle.hasOwnProperty(key)) continue;
          style[key] = props.underlayStyle[key];
        }
      }

      var underlayProps = {
        className: props.underlayClass,
        style: style
      };

      if (props.underlayClickExits) {
        underlayProps.onClick = this.checkClick;
      }

      var verticalCenterStyle = {};
      if (props.includeDefaultStyles) {
        verticalCenterStyle = {
          display: 'inline-block',
          height: '100%',
          verticalAlign: 'middle'
        };
      }

      var verticalCenterHelperProps = {
        key: 'a',
        style: verticalCenterStyle
      };

      var dialogStyle = {};
      if (props.includeDefaultStyles) {
        dialogStyle = {
          display: 'inline-block',
          textAlign: 'left',
          top: 0,
          maxWidth: '100%',
          cursor: 'default',
          outline: props.focusDialog ? 0 : null
        };

        if (props.verticallyCenter) {
          dialogStyle.verticalAlign = 'middle';
          dialogStyle.top = 0;
        }
      }

      if (props.dialogStyle) {
        for (var _key in props.dialogStyle) {
          if (!props.dialogStyle.hasOwnProperty(_key)) continue;
          dialogStyle[_key] = props.dialogStyle[_key];
        }
      }

      var dialogProps = {
        key: 'b',
        ref: function (el) {
          this.dialogNode = el;
        }.bind(this),
        role: props.alert ? 'alertdialog' : 'dialog',
        id: props.dialogId,
        className: props.dialogClass,
        style: dialogStyle
      };
      if (props.titleId) {
        dialogProps['aria-labelledby'] = props.titleId;
      } else if (props.titleText) {
        dialogProps['aria-label'] = props.titleText;
      }
      if (props.focusDialog) {
        dialogProps.tabIndex = '-1';
      }

      var childrenArray = [React.DOM.div(dialogProps, props.children)];
      if (props.verticallyCenter) {
        childrenArray.unshift(React.DOM.div(verticalCenterHelperProps));
      }

      return focusTrapFactory({
        focusTrapOptions: {
          initialFocus: props.focusDialog ? '#react-aria-modal-dialog' : props.initialFocus,
          escapeDeactivates: props.escapeExits,
          onDeactivate: this.deactivate
        }
      }, React.DOM.div(underlayProps, childrenArray));
    }
  }]);

  return Modal;
}(React.Component), _class.defaultProps = {
  dialogId: 'react-aria-modal-dialog',
  underlayClickExits: true,
  escapeExits: true,
  underlayColor: 'rgba(0,0,0,0.5)',
  includeDefaultStyles: true
}, _temp);

Modal = displace(Modal);

Modal.renderTo = function (input) {
  return displace(Modal, { renderTo: input });
};

module.exports = Modal;