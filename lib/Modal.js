var React = require('react');
var FocusTrap = require('focus-trap-react');

var PropTypes = React.PropTypes;
var focusTrapFactory = React.createFactory(FocusTrap);

var Modal = React.createClass({
  propTypes: {
    onExit: PropTypes.func.isRequired,
    alert: PropTypes.bool,
    initialFocus: PropTypes.string,
    titleId: PropTypes.string,
    titleText: PropTypes.string,
    underlayColor: PropTypes.string,
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
      throw new Error('react-aria-modal instances should have a `title` or `titleId`');
    }

    // Calculate 75% of the browser's height and make that
    // the maximum height for the modal
    this.maxBodyHeight = document.documentElement.clientHeight * 0.75;
  },

  checkClick: function(e) {
    if (React.findDOMNode(this.refs.dialog).contains(e.target)) return;
    this.props.onExit()
  },

  render: function() {
    var underlayProps = {
      tabIndex: 0,
      style: {
        background: this.props.underlayColor,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1050,
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        outline: 0,
      },
    };

    if (this.props.underlayClickExits) {
      underlayProps.onClick = this.checkClick;
    }

    var transformValue = (this.props.verticallyCenter)
      ? 'translate(-50%, -50%)'
      : 'translateX(-50%)';
    var topValue = (this.props.verticallyCenter)
      ? '50%'
      : '0';

    var dialogProps = {
      role: (this.props.alert) ? 'alertdialog' : 'dialog',
      ref: 'dialog',
      style: {
        position: 'absolute',
        left: '50%',
        top: topValue,
        margin: 'auto',
        WebkitTransform: transformValue,
        transform: transformValue,
      },
    };

    if (this.props.titleId) {
      dialogProps['aria-labelledby'] = this.props.titleId;
    } else if (this.props.titleText) {
      dialogProps['aria-label'] = this.props.titleText;
    }

    return focusTrapFactory(
      {
        initialFocus: this.props.initialFocus,
        onDeactivate: this.props.onExit,
      },
      React.DOM.div(underlayProps,
        React.DOM.div(dialogProps, this.props.children)
      )
    );
  },
});

module.exports = Modal;
