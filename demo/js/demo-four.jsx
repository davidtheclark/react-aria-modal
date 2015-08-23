var React = require('react');
var AriaModal = require('../../');

var DemoOne = React.createClass({
  getInitialState: function() {
    return {
      modalActive: false,
    };
  },

  activateModal: function() {
    this.setState({ modalActive: true });
  },

  deactivateModal: function() {
    this.setState({ modalActive: false });
  },

  render: function() {
    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        <AriaModal
          titleText='demo four'
          onExit={this.deactivateModal}
          initialFocus='demo-four-deactivate'
          active={this.state.modalActive}
        >
          <div id='demo-four-modal' className='modal'>
            <p>
              Here is a modal <a href='#'>with</a> <a href='#'>some</a> <a href='#'>focusable</a> parts.
            </p>
            <p>
              <button id='demo-four-deactivate' onClick={this.deactivateModal}>
                deactivate modal
              </button>
            </p>
          </div>
        </AriaModal>
      </div>
    )
  },
});

React.render(<DemoOne />, document.getElementById('demo-four'));
