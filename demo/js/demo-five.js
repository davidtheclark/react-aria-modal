const React = require('react');
const ReactDOM = require('react-dom');
const AriaModal = require('../../src/react-aria-modal');

class DemoFive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false
    };

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.onModalEnter = this.onModalEnter.bind(this);
  }

  activateModal = () => {
    this.setState({ modalActive: true });
  };

  deactivateModal = () => {
    this.setState(
      {
        modalHasEntered: false
      },
      () => {
        setTimeout(() => {
          this.setState({
            modalActive: false
          });
        }, 300);
      }
    );
  };

  onModalEnter = () => {
    this.setState({ modalHasEntered: true });
  };

  render() {
    let dialogContentClass = 'modal modal--animated';
    let underlayClass = 'underlay';
    if (this.state.modalHasEntered) {
      dialogContentClass += ' has-entered';
      underlayClass += ' has-entered';
    }
    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        <AriaModal
          titleText="demo five"
          onEnter={this.onModalEnter}
          onExit={this.deactivateModal}
          focusDialog={true}
          mounted={this.state.modalActive}
          underlayColor={false}
          underlayClass={underlayClass}
          underlayStyle={{ paddingTop: '2em' }}
        >
          <div id="demo-five-modal" className={dialogContentClass}>
            <div className="modal-body">
              <p>
                Here is a modal
                {' '}
                <a href="#">with</a>
                {' '}
                <a href="#">some</a>
                {' '}
                <a href="#">focusable</a>
                parts.
              </p>
            </div>
            <footer className="modal-footer">
              <button id="demo-five-deactivate" onClick={this.deactivateModal}>
                deactivate modal
              </button>
            </footer>
          </div>
        </AriaModal>
      </div>
    );
  }
}

ReactDOM.render(<DemoFive />, document.getElementById('demo-five'));
