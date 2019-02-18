const React = require('react');
const ReactDOM = require('react-dom');
const AriaModal = require('../../src/react-aria-modal');

class DemoNine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false,
      innerModalActive: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.activateInnerModal = this.activateInnerModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.deactivateInnerModal = this.deactivateInnerModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  activateModal = () => {
    this.setState({
      modalActive: true,
      innerModalActive: false
    });
  };

  activateInnerModal = () => {
    this.setState({
      modalActive: true,
      innerModalActive: true
    });
  };

  deactivateModal = () => {
    this.setState({
      modalActive: false,
      innerModalActive: false
    });
  };

  deactivateInnerModal = () => {
    this.setState({
      modalActive: true,
      innerModalActive: false
    });
  };

  getApplicationNode = () => {
    return document.getElementById('application');
  };

  renderInnerModal() {
    if (!this.state.innerModalActive) {
      return null;
    }

    return (
      <AriaModal
        titleText="demo nine"
        onExit={this.deactivateInnerModal}
        initialFocus="#demo-nine-deactivate-inner"
        getApplicationNode={this.getApplicationNode}
        underlayStyle={{ paddingTop: '1em' }}
        scrollDisabled={false}
      >
        <div id="demo-nine-modal" className="modal">
          <div className="modal-body">
            <p>
              This is a nested modal, as you can see.
            </p>
            <p>
              It is longer than its parent.
            </p>
            <p>
              Yes, it is longer than its parent.
            </p>
            <p>
              Yes, yes, it is longer than its parent.
            </p>
            <p>
              <button id="demo-nine-deactivate-inner" onClick={this.deactivateInnerModal}>
                deactivate modal
              </button>
            </p>
          </div>
        </div>
      </AriaModal>
    )
  }

  renderModal() {
    if (!this.state.modalActive) {
      return null;
    }

    return (
      <AriaModal
        titleText="demo nine"
        onExit={this.deactivateModal}
        initialFocus="#demo-nine-activate-inner"
        getApplicationNode={this.getApplicationNode}
        underlayStyle={{ paddingTop: '2em' }}
        scrollDisabled={false}
        escapeExits={!this.state.innerModalActive}
      >
        <div id="demo-nine-modal" className="modal">
          <div className="modal-body">
            <p>
              Here is a modal
              {' '}
              <a href="#">with</a>
              {' '}
              <a href="#">some</a>
              {' '}
              <a href="#">focusable</a>
              {' '}
              parts.
            </p>
            <p>
              <button id="demo-nine-activate-inner" onClick={this.activateInnerModal}>
                activate inner modal
              </button>
            </p>
          </div>
          <footer className="modal-footer">
            <button id="demo-nine-deactivate" onClick={this.deactivateModal}>
              deactivate modal
            </button>
          </footer>
        </div>
      </AriaModal>
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        {this.renderModal()}
        {this.renderInnerModal()}
      </div>
    );
  }
}

ReactDOM.render(<DemoNine />, document.getElementById('demo-nine'));
