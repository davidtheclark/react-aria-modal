var React = require('react');
var Modal = require('./lib/Modal');

var container = document.createElement('div');
document.body.appendChild(container);

function deactivateModal() {
  React.unmountComponentAtNode(container);
}

var ModalLoader = React.createClass({
  propTypes: {
    onExit: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      active: true,
    };
  },

  componentDidMount: function() {
    if (this.props.active) {
      this.activateModal();
    }
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.active && !this.props.active) {
      deactivateModal();
    } else if (!prevProps.active && this.props.active) {
      this.activateModal();
    }
  },

  componentWillUnmount: function() {
    deactivateModal();
  },

  activateModal: function() {
    var modalProps = {
      onExit: this.props.onExit,
    };

    for (var key in this.props) {
      if (key !== 'refs' && this.props.hasOwnProperty(key)) {
        modalProps[key] = this.props[key];
      }
    }

    React.render(
      React.createElement(Modal, modalProps, this.props.children),
      container
    );
  },

  render: function() {
    return false;
  },
});

module.exports = ModalLoader;
