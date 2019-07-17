import React from 'react';
import { getDocTitle } from '../generic/overallConfig'
import { Redirect, withRouter } from 'react-router-dom';
import Toast from './Toast';

const Authorize = {
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');

      if ((token === null) || (token === undefined)) {
        return resolve(false);
      } else {
        fetch('/api/authenticate', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(res => {
          if (res.success) {
            return resolve(true);
          } else {
            return resolve(false)
          }
        })
        .catch(err => {
          return resolve(false);
        });
      }
    })
  }
}
export default Authorize;



// Log in form
class LogIn extends React.Component {
  state = {
    redirectToReferrer: false,
    creds: {
      username: null,
      password: null
    },
    toast: null
  }

  spawnToast = (isErr, msg) => {
    this.setState({toast: <Toast msg={msg} isErr={isErr}/> });
    setTimeout(() => {
      this.setState({toast: null});
    }, 3500);
  }

  login = (token) => {
    localStorage.clear();
    localStorage.setItem('token', token);
    this.setState({ redirectToReferrer: true });
  }

  handleChange = (event) => {
    const property = event.target.id;
    const val = event.target.value;
    let dataObj = this.state.creds;
    
    (async () => {
      dataObj[property] = val;
      await this.setState({ data: dataObj });
    })();
  }

  check = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.creds)
    })
    .then(response => response.json())
    .then(res => {
      if (res.token){
        this.login(res.token);
      } else {
        this.spawnToast(true, 'Incorrect login');
      }
    })
    .catch(err => {
      this.spawnToast(true, err);
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    document.title = getDocTitle('Log in');

    return (
      <>
        {this.state.toast}
        <div className="login">
          <p className="login__text">Welcome back, captain.</p>
          <input id="username" className="generic__input login__input" type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
          <input id="password" className="generic__input login__input" type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
          <button className="generic__btn login__btn" onClick={this.check}>Go</button>
          <p className="login__text login__text--sub">Not an admin? Whatcha doing here!? Let's talk on Twitter <a className="generic__text-link" href="https://twitter.com/carbnology" target="_blank" rel="noreferrer noopener">@carbnology</a> and see what's up.</p>
        </div>
      </>
    )
  }
}

export { LogIn };




const LogOut = withRouter(({ history }) => (
  <div className="generic__standard-wrapper">
    <button type='button' className="generic__btn" onClick={() => {
        localStorage.clear();
        history.push('/');
    }}>
      Log Out
    </button>
  </div>
));

export { LogOut };