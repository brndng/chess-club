import React, { Component } from 'react';
import Modal from './Modal.jsx';
import Draw from './Draw.jsx';

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      clicks: 0,
    };
    
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }
  
  handleHide() {
    this.setState({showModal: false});
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    // Show a Modal on click.
    const modal = this.state.showModal 
      ? <div >
          <p>Number of clicks: {this.state.clicks}</p>
          <Modal>
            <div className="modal">
              <Draw />
              <button onClick={this.handleClick}>Click</button>
              <div>
                With a portal, we can render content into a different
                part of the DOM, as if it were any other React child.
              </div>
                This is being rendered inside the #modal-container div.
                <button onClick={this.handleHide}>Hide modal</button>
            </div>
          </Modal>
        </div>
      : null;

    return (
      <div className="app">
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

export default Test;