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
    focusDialog: PropTypes.bool,
    initialFocus: PropTypes.string,
    onEnter: PropTypes.func,
    titleId: PropTypes.string,
    titleText: PropTypes.string,
    underlayClass: PropTypes.string,
    underlayColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    underlayClickExits: PropTypes.bool,
    verticallyCenter: PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      underlayClickExits: true,
      underlayColor: 'rgba(0,0,0,0.5)',
    };
  },

  componentWillMount: function() {
    if (!this.props.titleText && !this.props.titleId) {
      throw new Error('react-aria-modal instances should have a `titleText` or `titleId`');
    }
    noScroll.on();
  },

  componentDidMount: function() {
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  },

  checkClick: function(e) {
    if (React.findDOMNode(this.refs.dialog).contains(e.target)) return;
    this.deactivate();
  },

  deactivate: function() {
    noScroll.off();
    this.props.onExit();
  },

  render: function() {
    var underlayProps = {
      className: this.props.underlayClass,
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1050,
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
    };

    if (this.props.underlayColor) {
      underlayProps.style.background = this.props.underlayColor;
    }

    if (this.props.underlayClickExits) {
      underlayProps.style.cursor = 'pointer';
      underlayProps.onClick = this.checkClick;
    }

    var transformValue = (this.props.verticallyCenter)
      ? 'translate(-50%, -50%)'
      : 'translateX(-50%)';
    var topValue = (this.props.verticallyCenter)
      ? '50%'
      : '0';

    var dialogProps = {
      ref: 'dialog',
      role: (this.props.alert) ? 'alertdialog' : 'dialog',
      id: 'react-aria-modal-dialog',
      style: {
        position: 'absolute',
        left: '50%',
        top: topValue,
        margin: 'auto',
        WebkitTransform: transformValue,
        transform: transformValue,
        cursor: 'default',
      },
    };

    if (this.props.titleId) {
      dialogProps['aria-labelledby'] = this.props.titleId;
    } else if (this.props.titleText) {
      dialogProps['aria-label'] = this.props.titleText;
    }

    if (this.props.focusDialog) {
      dialogProps.tabIndex = '-1';
      dialogProps.style.outline = 0;
    }

    return focusTrapFactory(
      {
        initialFocus: (this.props.focusDialog)
          ? '#react-aria-modal-dialog'
          : this.props.initialFocus,
        onDeactivate: this.deactivate,
      },
      React.DOM.div(underlayProps,
        React.DOM.div(dialogProps, this.props.children)
      )
    );
  },
});

module.exports = displace(Modal);
