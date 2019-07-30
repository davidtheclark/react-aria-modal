const React = require('react');
const FocusTrap = require('focus-trap-react');
const displace = require('react-displace');
const noScroll = require('no-scroll');

class Modal extends React.Component {
  static defaultProps = {
    underlayProps: {},
    dialogId: 'react-aria-modal-dialog',
    underlayClickExits: true,
    escapeExits: true,
    underlayColor: 'rgba(0,0,0,0.5)',
    includeDefaultStyles: true,
    focusTrapPaused: false,
    scrollDisabled: true
  };

  componentWillMount() {
    if (!this.props.titleText && !this.props.titleId) {
      throw new Error(
        'react-aria-modal instances should have a `titleText` or `titleId`'
      );
    }
  }

  componentDidMount() {
    if (this.props.onEnter) {
      this.props.onEnter();
    }

    // Timeout to ensure this happens *after* focus has moved
    const applicationNode = this.getApplicationNode();
    setTimeout(() => {
      if (applicationNode && !this.props.hidden) {
        applicationNode.setAttribute('aria-hidden', 'true');
      }
    }, 0);

    if (this.props.escapeExits && !this.props.hidden) {
      this.addKeyDownListener();
    }

    if (this.props.scrollDisabled  && !this.props.hidden) {
      noScroll.on();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scrollDisabled && !this.props.scrollDisabled) {
      noScroll.off();
    } else if (!prevProps.scrollDisabled && this.props.scrollDisabled  && !this.props.hidden) {
      noScroll.on();
    }

    if (this.props.escapeExits && !prevProps.escapeExits  && !this.props.hidden) {
      this.addKeyDownListener();
    } else if (!this.props.escapeExits && prevProps.escapeExits) {
      this.removeKeyDownListener();
    }
  }

  componentWillUnmount() {
    if (this.props.scrollDisabled) {
      noScroll.off();
    }
    const applicationNode = this.getApplicationNode();
    if (applicationNode) {
      applicationNode.setAttribute('aria-hidden', 'false');
    }
    this.removeKeyDownListener();
  }

  addKeyDownListener() {
    setTimeout(() => {
      document.addEventListener('keydown', this.checkDocumentKeyDown);
    });
  }

  removeKeyDownListener() {
    setTimeout(() => {
      document.removeEventListener('keydown', this.checkDocumentKeyDown);
    });
  }

  getApplicationNode = () => {
    if (this.props.getApplicationNode) return this.props.getApplicationNode();
    return this.props.applicationNode;
  };

  checkUnderlayClick = event => {
    if (
      (this.dialogNode && this.dialogNode.contains(event.target)) ||
      // If the click is on the scrollbar we don't want to close the modal.
      event.pageX > event.target.ownerDocument.documentElement.offsetWidth ||
      event.pageY > event.target.ownerDocument.documentElement.offsetHeight
    )
      return;
    this.exit(event);
  };

  checkDocumentKeyDown = event => {
    if (
      this.props.escapeExits &&
      (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27)
    ) {
      this.exit(event);
    }
  };

  exit = event => {
    if (this.props.onExit) {
      this.props.onExit(event);
    }
  };

  render() {
    const props = this.props;

    let style = {};
    if (props.includeDefaultStyles) {
      style = {
        display: props.hidden ? 'none' : 'block',
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
      for (const key in props.underlayStyle) {
        if (!props.underlayStyle.hasOwnProperty(key)) continue;
        style[key] = props.underlayStyle[key];
      }
    }

    const underlayProps = {
      className: props.underlayClass,
      style: style,
    };

    if (props.underlayClickExits) {
      underlayProps.onMouseDown = this.checkUnderlayClick;
    }

    for (const prop in this.props.underlayProps) {
      underlayProps[prop] = this.props.underlayProps[prop];
    }

    if (props.hidden) {
      underlayProps['aria-hidden'] = true;
    }

    let verticalCenterStyle = {};
    if (props.includeDefaultStyles) {
      verticalCenterStyle = {
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle'
      };
    }

    const verticalCenterHelperProps = {
      key: 'a',
      style: verticalCenterStyle
    };

    let dialogStyle = {};
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
      for (const key in props.dialogStyle) {
        if (!props.dialogStyle.hasOwnProperty(key)) continue;
        dialogStyle[key] = props.dialogStyle[key];
      }
    }

    const dialogProps = {
      key: 'b',
      ref: function(el) {
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

    // Apply data- and aria- attributes passed as props
    for (let key in props) {
      if (/^(data-|aria-)/.test(key)) {
        dialogProps[key] = props[key];
      }
    }

    const childrenArray = [
      React.createElement('div', dialogProps, props.children)
    ];

    if (props.verticallyCenter) {
      childrenArray.unshift(
        React.createElement('div', verticalCenterHelperProps)
      );
    }

    const focusTrapOptions = props.focusTrapOptions || {};
    if (props.focusDialog || props.initialFocus) {
      focusTrapOptions.initialFocus = props.focusDialog
        ? `#${this.props.dialogId}`
        : props.initialFocus;
    }
    focusTrapOptions.escapeDeactivates = props.escapeExits;

    return React.createElement(
      FocusTrap,
      {
        focusTrapOptions,
        paused: props.hidden ? true : props.focusTrapPaused
      },
      React.createElement('div', underlayProps, childrenArray)
    );
  }
}

const DisplacedModal = displace(Modal);

DisplacedModal.renderTo = function(input) {
  return displace(Modal, { renderTo: input });
};

module.exports = DisplacedModal;
