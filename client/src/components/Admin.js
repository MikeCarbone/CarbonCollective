import React, { Component } from 'react';
import NewPost from './NewPost';
import PostEdit from './ItemEdit';
import Toast from './Toast';

class Admin extends Component {
  state= {
    toast: {
      success: null,
      err: null
    }
  }

  handleRes = (res) => {
    let toastData = this.state.toast;
    if (res.err) {
      toastData.err = res.err;
      this.setState({ toast: toastData });
    } else {
      toastData.success = res.res.success;
      this.setState({ toast: toastData });
    }
  }

  render() {
    return (
      <>
        <Toast data={this.state.toast} />
        <NewPost resHandler={this.handleRes} />
        <PostEdit />
      </>
    );
  }
}

export default Admin;