var React = require('react');
var ReactDOMServer = require('react-dom/server');
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

console.log(ReactDOMServer.renderToString(React.createElement(App)));
