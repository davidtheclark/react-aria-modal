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
    var modal = (this.state.modalActive) ? (
      <AriaModal
        titleText='demo one'
        onExit={this.deactivateModal}
        initialFocus='demo-one-deactivate'
      >
        <div id='demo-one-modal' className='modal'>
          <p>
            Here is a modal <a href='#'>with</a> <a href='#'>some</a> <a href='#'>focusable</a> parts.
          </p>
          <p>
            <button id='demo-one-deactivate' onClick={this.deactivateModal}>
              deactivate modal
            </button>
          </p>
        </div>
      </AriaModal>
    ) : false;

    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        {modal}
      </div>
    )
  },
});

React.render(<DemoOne />, document.getElementById('demo-one'));
