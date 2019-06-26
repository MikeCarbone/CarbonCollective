import React, { Component } from 'react';

class ToastEl extends Component {
    constructor (msg, bem) {
      super();

      this.msg = msg;
      this.bem = bem;
    }

    state = {
      display: "block"
    }

    changeDisplay = (rule) => {
      this.setState({
        display: rule
      });
    }

    render() {
      return(
        <div className={`toast toast--${this.bem}`} style={{display: this.state.display}}>
          <p>
            {this.msg}
            <span onClick={() => this.changeDisplay("none") } className="toast__x">X</span>
          </p>
        </div>
      );
    }
}

const Toast = props => {
  if (props.isErr) {
    return new ToastEl("Sorry, something is shitting the bed", "error");
  } else {
    return new ToastEl("Nice! Post submitted successfully", "success");
  }
}

export default Toast;