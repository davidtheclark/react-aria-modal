const React = require('react');
const ReactDOM = require('react-dom');
const AriaModal = require('../../src/react-aria-modal');

class DemoSix extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  activateModal = () => {
    this.setState({ modalActive: true });
  };

  deactivateModal = () => {
    this.setState({ modalActive: false });
  };

  getApplicationNode = () => {
    return document.getElementById('application');
  };

  render() {
    const AlternateLocationAriaModal = AriaModal.renderTo(
      '#demo-six-container'
    );

    const modal = this.state.modalActive
      ? <AlternateLocationAriaModal
          titleText="demo six"
          onExit={this.deactivateModal}
          initialFocus="#demo-six-deactivate"
          getApplicationNode={this.getApplicationNode}
          underlayProps={{
            'data-foo': 'foo'
          }}
          underlayStyle={{
            zIndex: 100,
            background: 'rgba(255, 192, 203, 0.5)',
            position: 'absolute',
            paddingTop: '4em'
          }}
        >
          <div id="demo-six-modal" className="modal">
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
            </div>
            <footer className="modal-footer">
              <button id="demo-six-deactivate" onClick={this.deactivateModal}>
                deactivate modal
              </button>
            </footer>
          </div>
        </AlternateLocationAriaModal>
      : false;

    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<DemoSix />, document.getElementById('demo-six'));
