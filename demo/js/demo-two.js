const React = require('react');
const ReactDOM = require('react-dom');
const AriaModal = require('../../');

class DemoTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
  }

  activateModal = () => {
    this.setState({ modalActive: true });
  };

  deactivateModal = () => {
    this.setState({ modalActive: false });
  };

  render() {
    const modal = this.state.modalActive
      ? <AriaModal
          titleId="demo-two-title"
          onExit={this.deactivateModal}
          underlayClickExits={false}
          verticallyCenter={true}
        >
          <div id="demo-two-modal" className="modal">
            <header className="modal-header">
              <h2 id="demo-two-title" className="modal-title">
                This modal has a title
              </h2>
            </header>
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
              <div style={{ height: 200, overflow: 'scroll' }}>
                <h3>
                  Internally Scrolling Region
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
            <footer className="modal-footer">
              <button id="demo-two-deactivate" onClick={this.deactivateModal}>
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

ReactDOM.render(<DemoTwo />, document.getElementById('demo-two'));
