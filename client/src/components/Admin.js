import React, { Component } from 'react';
import NewPost from './NewPost';
import Toast from './Toast';
import { getDocTitle, setMetas } from '../generic/overallConfig';
import { LogOut } from './Auth';
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
    console.log(res);
    console.log(res.res);
    if ((res.err) || (res.error) || (res.res.error) || (res.res.err)) {
      this.spawnToast(true);
    } else {
      this.spawnToast(false);
    }
  }

  render() {
    document.title = getDocTitle('Admin');
    setMetas({isDefault: true});

    return (
      <>
        {this.state.toast}
        <NewPost resHandler={this.handleRes} />
        <LogOut />
      </>
    );
  }
}

export default Admin;