var React = require('react/addons');
var AriaModal = require('../../');

var DemoFive = React.createClass({
  getInitialState: function() {
    return {
      modalActive: false,
    };
  },

  activateModal: function() {
    this.setState({ modalActive: true });
  },

  deactivateModal: function() {
    this.setState({
      modalHasEntered: false,
    }, function() {
      setTimeout(function() {
        this.setState({
          modalActive: false,
        });
      }.bind(this), 300);
    });
  },

  onModalEnter: function() {
    this.setState({ modalHasEntered: true });
  },

  render: function() {
    var dialogContentClass = 'modal modal--animated';
    var underlayClass = 'underlay';
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
          titleText='demo five'
          onEnter={this.onModalEnter}
          onExit={this.deactivateModal}
          focusDialog={true}
          mounted={this.state.modalActive}
          underlayColor={false}
          underlayClass={underlayClass}
        >
          <div id='demo-five-modal' className={dialogContentClass}>
            <div className='modal-body'>
              <p>
                Here is a modal <a href='#'>with</a> <a href='#'>some</a> <a href='#'>focusable</a> parts.
              </p>
            </div>
            <footer className='modal-footer'>
              <button id='demo-five-deactivate' onClick={this.deactivateModal}>
                deactivate modal
              </button>
            </footer>
          </div>
        </AriaModal>
      </div>
    )
  },
});

React.render(<DemoFive />, document.getElementById('demo-five'));
