const React = require('react');
const ReactDOMServer = require('react-dom/server');
const AriaModal = require('..');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    return React.DOM.div(
      React.DOM.button('open modal', {
        onClick: this.openModal
      }),
      React.createElement(AriaModal, {
        onExit: this.closeModal
      })
    );
  }
}

console.log(ReactDOMServer.renderToString(React.createElement(App)));
