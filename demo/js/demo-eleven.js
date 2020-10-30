const React = require('react');
const ReactDOM = require('react-dom');
const FocusTrap = require('focus-trap-react');
const AriaModal = require('../../src/react-aria-modal');

class DemoEleven extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false,
      visible: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  activateModal() {
    this.setState({ modalActive: true, visible: false });
  }

  showModal() {
    this.setState({visible: true});
  }

  hideModal() {
    this.setState({visible: false});
  }

  deactivateModal = () => {
    this.setState({ modalActive: false });
  };

  getApplicationNode() {
    return document.getElementById('application');
  }

  render() {
    const modal = this.state.modalActive
      ? <AriaModal
          titleText="demo eleven"
          onExit={this.hideModal}
          getApplicationNode={this.getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
          focusTrapOptions={{
            initialFocus:"#demo-eleven-deactivate",
            returnFocusOnDeactivate: false
          }}
          visible={this.state.visible}
        >
          <div id="demo-eleven-modal" className="modal">
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
              <button id="demo-eleven-deactivate" onClick={this.deactivateModal}>
                deactivate modal
              </button>
              {' '}
              <button id="demo-eleven-deactivate" onClick={this.hideModal}>
                hide modal
              </button>
            </footer>
          </div>
        </AriaModal>
      : false;

    return (
      <div>
        { !this.state.modalActive && <button onClick={this.activateModal}>
          activate modal
        </button> }
        {' '}
        { this.state.modalActive && <button onClick={this.showModal}>
          show modal
        </button> }

        {modal}
      </div>
    );
  }
}

ReactDOM.render(<DemoEleven />, document.getElementById('demo-eleven'));
