var React = require('react');
var AriaModal = require('..');

var App = React.createClass({
  getInitialState: function() {
    return { modalOpen: false };
  },
  openModal: function() {
    this.setState({ modalOpen: true });
  },
  closeModal: function() {
    this.setState({ modalOpen: false });
  },
  render: function() {
    return (
      React.DOM.div(
        React.DOM.button('open modal', {
          onClick: this.openModal,
        }),
        React.createElement(AriaModal, {
          onExit: this.closeModal,
        })
      )
    );
  },
});

console.log(React.renderToString(React.createElement(App)));
