const React = require('react');
const ReactDOM = require('react-dom');
const FocusTrap = require('focus-trap-react');
const AriaModal = require('../../src/react-aria-modal');

class DemoEight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false,
      innerFocusTrapActive: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
    this.activateInnerFocusTrap = this.activateInnerFocusTrap.bind(this);
    this.deactivateInnerFocusTrap = this.deactivateInnerFocusTrap.bind(this);
  }

  activateModal() {
    this.setState({ modalActive: true });
  }

  deactivateModal() {
    this.setState({
      modalActive: false,
      innerFocusTrapActive: false
    });
  }

  activateInnerFocusTrap() {
    this.setState({ innerFocusTrapActive: true });
  }

  deactivateInnerFocusTrap() {
    this.setState({ innerFocusTrapActive: false });
  }

  getApplicationNode() {
    return document.getElementById('application');
  }

  render() {
    const focusTrapTrigger = this.state.innerFocusTrapActive
      ? <button onClick={this.deactivateInnerFocusTrap}>deactivate</button>
      : <button onClick={this.activateInnerFocusTrap}>activate</button>;
    const innerFocusTrap = !this.state.innerFocusTrapActive
      ? null
      : <FocusTrap
          focusTrapOptions={{ onDeactivate: this.deactivateInnerFocusTrap }}
          style={{ marginTop: 20 }}
        >
          <div
            style={{
              background: '#eee',
              border: '1px solid gray',
              padding: 20
            }}
          >
            <button>men</button>
            <button
              style={{ marginLeft: 20 }}
              onClick={this.deactivateInnerFocusTrap}
            >
              exit
            </button>
          </div>
        </FocusTrap>;

    const modal = this.state.modalActive
      ? <AriaModal
          titleText="demo one"
          onExit={this.deactivateModal}
          initialFocus="#demo-eight-deactivate"
          getApplicationNode={this.getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
          focusTrapPaused={this.state.innerFocusTrapActive}
        >
          <div id="demo-eight-modal" className="modal">
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
              <div style={{ marginTop: 20 }}>
                And here is an internal focus trap:
              </div>
              {focusTrapTrigger}
              {innerFocusTrap}
            </div>
            <footer className="modal-footer">
              <button id="demo-eight-deactivate" onClick={this.deactivateModal}>
                deactivate modal
              </button>
            </footer>
          </div>
        </AriaModal>
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

ReactDOM.render(<DemoEight />, document.getElementById('demo-eight'));
