var React = require('react');
var ReactDOM = require('react-dom');
var AriaModal = require('../../');

var DemoSix = React.createClass({
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

  getApplicationNode: function() {
    return document.getElementById('application');
  },

  render: function() {
    var AlternateLocationAriaModal = AriaModal.renderTo('#demo-six-container');

    var modal = (this.state.modalActive) ? (
      <AlternateLocationAriaModal
        titleText='demo six'
        onExit={this.deactivateModal}
        initialFocus='#demo-six-deactivate'
        getApplicationNode={this.getApplicationNode}
        underlayStyle={{
          zIndex: 100,
          background: 'rgba(255, 192, 203, 0.5)',
          position: 'absolute',
          paddingTop: '4em'
        }}
      >
        <div id='demo-six-modal' className='modal'>
          <div className='modal-body'>
            <p>
              Here is a modal <a href='#'>with</a> <a href='#'>some</a> <a href='#'>focusable</a> parts.
            </p>
          </div>
          <footer className='modal-footer'>
            <button id='demo-six-deactivate' onClick={this.deactivateModal}>
              deactivate modal
            </button>
          </footer>
        </div>
      </AlternateLocationAriaModal>
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

ReactDOM.render(<DemoSix />, document.getElementById('demo-six'));
