const React = require('react');
const ReactDOM = require('react-dom');
const AriaModal = require('../../src/react-aria-modal');

class DemoEleven extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false,
      hidden: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.showHiddenModal = this.showHiddenModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }

  activateModal = () => {
    this.setState({ modalActive: true, hidden: true });
  };

  deactivateModal = () => {
    this.setState({ modalActive: false, hidden: true });
  };

  showHiddenModal = () => {
    this.setState({ modalActive: true, hidden: false });
  };

  hideModal = () => {
    this.setState({ modalActive: true, hidden: true });
  };

  getApplicationNode = () => {
    return document.getElementById('application');
  };

  render() {
    const modal = this.state.modalActive
      ? <AriaModal
          titleText="demo eleven"
          onExit={this.deactivateModal}
          initialFocus="#demo-eleven-deactivate"
          getApplicationNode={this.getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
          hidden={this.state.hidden}
        >
          <div id="demo-eleven-modal" className="modal">
            <div className="modal-body">
              <p>
                Here is a modal which was initially hidden
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
              </button>{' '}
              <button id="demo-eleven-hide" onClick={this.hideModal}>
                hide modal
              </button>
            </footer>
          </div>
        </AriaModal>
      : false;

    return (
      <div>
        <button onClick={this.activateModal}>
          activate hidden modal
        </button>
        {' '}
        {this.state.modalActive && <button onClick={this.showHiddenModal}>
          show hidden modal
        </button> }
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<DemoEleven />, document.getElementById('demo-eleven'));
