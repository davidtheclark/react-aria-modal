var React = require('react');
var ReactDOM = require('react-dom');
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

  getApplicationNode: function() {
    return document.getElementById('application');
  },

  render: function() {
    var modal = (this.state.modalActive) ? (
      <AriaModal
        titleText='demo seven'
        onExit={this.deactivateModal}
        getApplicationNode={this.getApplicationNode}
        includeDefaultStyles={false}
        underlayClass='demo-seven__underlay'
        dialogClass='demo-seven__dialog'
      >
        <div id='demo-seven-modal' className='modal'>
          <header className='modal-header'>
            <h2
              id='demo-two-title'
              className='modal-title'
            >
              Sample MIT License
            </h2>
          </header>
          <div className='modal-body'>
            <p>
              Copyright (c) &lt;year&gt; &lt;copyright holders&gt;
            </p>
            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <p>
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
            </p>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </p>
          </div>
          <footer className='modal-footer'>
            <button id='demo-seven-deactivate' onClick={this.deactivateModal}>
              deactivate modal
            </button>
          </footer>
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

ReactDOM.render(<DemoOne />, document.getElementById('demo-seven'));
