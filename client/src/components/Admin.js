import React, { Component } from 'react';
import NewPost from './NewPost';
import Toast from './Toast';
class Admin extends Component {
  state= {
    toast: null
  }

  spawnToast (isErr) {
      this.setState({toast: <Toast isErr={isErr}/> });
      setTimeout(() => {
        this.setState({toast: null});
      }, 3500);
  }

  handleRes = (res) => {
    if (res.err) {
      this.spawnToast(true);
    } else {
      this.spawnToast(false);
    }
  }

  render() {
    return (
      <>
        {this.state.toast}
        <NewPost resHandler={this.handleRes} />
      </>
    );
  }
}

export default Admin;