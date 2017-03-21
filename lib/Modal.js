var React = require('react');
var FocusTrap = require('focus-trap-react');
var displace = require('react-displace');
var noScroll = require('no-scroll');

var PropTypes = React.PropTypes;
var focusTrapFactory = React.createFactory(FocusTrap);

var Modal = React.createClass({
  propTypes: {
    onExit: PropTypes.func.isRequired,
    alert: PropTypes.bool,
    dialogClass: PropTypes.string,
    dialogId: PropTypes.string,
    focusDialog: PropTypes.bool,
    initialFocus: PropTypes.string,
    onEnter: PropTypes.func,
    titleId: PropTypes.string,
    titleText: PropTypes.string,
    underlayClass: PropTypes.string,
    underlayColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    underlayStyle: PropTypes.object,
    underlayClickExits: PropTypes.bool,
    escapeExits: PropTypes.bool,
    verticallyCenter: PropTypes.bool,
    applicationNode: PropTypes.shape({
      setAttribute: PropTypes.func.isRequired,
    }),
    getApplicationNode: PropTypes.func,
    defaultStyles: PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      dialogId: 'react-aria-modal-dialog',
      underlayClickExits: true,
      escapeExits: true,
      underlayColor: 'rgba(0,0,0,0.5)',
      defaultStyles: true,
    };
  },

  componentWillMount: function() {
    if (!this.props.titleText && !this.props.titleId) {
      throw new Error('react-aria-modal instances should have a `titleText` or `titleId`');
    }
    noScroll.on();
  },

  componentDidMount: function() {
    var props = this.props;
    if (props.onEnter) {
      props.onEnter();
    }
    // Timeout to ensure this happens *after* focus has moved
    var applicationNode = this.getApplicationNode();
    setTimeout(function() {
      if (applicationNode) {
        applicationNode.setAttribute('aria-hidden', 'true');
      }
    }, 0);
  },

  componentWillUnmount: function() {
    noScroll.off();
    var applicationNode = this.getApplicationNode();
    if (applicationNode) {
      applicationNode.setAttribute('aria-hidden', 'false');
    }
  },

  getApplicationNode: function() {
    if (this.props.getApplicationNode) return this.props.getApplicationNode();
    return this.props.applicationNode;
  },

  checkClick: function(event) {
    if (this.dialogNode && this.dialogNode.contains(event.target)) return;
    this.deactivate();
  },

  deactivate: function() {
    this.props.onExit();
  },

  render: function() {
    var props = this.props;

    var style = {}

    if (props.defaultStyles) {
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
        textAlign: 'center',
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
      style: style,
    };

    if (props.underlayClickExits) {
      underlayProps.onClick = this.checkClick;
    }

    var verticalCenterStyle = {};

    if (props.defaultStyles) {
      verticalCenterStyle = {
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle',
      }
    }

    var verticalCenterHelperProps = {
      key: 'a',
      style: verticalCenterStyle,
    };

    var dialogStyle = {};

    if (props.defaultStyles) {
      dialogStyle = {
        display: 'inline-block',
        textAlign: 'left',
        top: 0,
        maxWidth: '100%',
        cursor: 'default',
        outline: (props.focusDialog) ? 0 : null,
      };

      if (props.verticallyCenter) {
        dialogStyle.verticalAlign = 'middle';
        dialogStyle.top = 0;
      }
    }

    var dialogProps = {
      key: 'b',
      ref: function(el) { this.dialogNode = el; }.bind(this),
      role: (props.alert) ? 'alertdialog' : 'dialog',
      id: props.dialogId,
      className: props.dialogClass,
      style: dialogStyle,
    };
    if (props.titleId) {
      dialogProps['aria-labelledby'] = props.titleId;
    } else if (props.titleText) {
      dialogProps['aria-label'] = props.titleText;
    }
    if (props.focusDialog) {
      dialogProps.tabIndex = '-1';
    }

    var childrenArray = [
      React.DOM.div(dialogProps, props.children),
    ];
    if (props.verticallyCenter) {
      childrenArray.unshift(React.DOM.div(verticalCenterHelperProps));
    }

    return focusTrapFactory(
      {
        focusTrapOptions: {
          initialFocus: (props.focusDialog)
            ? '#react-aria-modal-dialog'
            : props.initialFocus,
          escapeDeactivates: props.escapeExits,
          onDeactivate: this.deactivate,
        },
      },
      React.DOM.div(underlayProps, childrenArray)
    );
  },
});

var DisplacedModal = displace(Modal);

DisplacedModal.renderTo = function(input) {
  return displace(Modal, { renderTo: input });
};

module.exports = DisplacedModal;
