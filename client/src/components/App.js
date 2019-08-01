import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Admin from './Admin';
import Header from './Header'
import Footer from './Footer';
import Homepage from './Homepage'
import FullPost from './FullPost';
import Authorize, { LogIn } from './Auth';

const App = () => (
  <>
    <Header />

    <Switch>
      <Route path="/" exact component={Homepage}/>
      <Route path="/cc/:name" component={FullPost} />
      <Route path="/login" component={LogIn}/>
      <PrivateRoute path="/admin" component={Admin} />
    </Switch>

    <Footer />
  </>
);

export default App;

class PrivateRoute extends Component {
  constructor(props){
    super(props);

    const {component: Comp, rest: Rest} = props;

    this.comp = Comp;
    this.rest = Rest;

    this.state = {
      isAuth: null
    };
  }

  componentWillMount () {
    Authorize.isAuthenticated()
    .then(isGood => {
      if (isGood) {
        this.setState({ isAuth: true });
      } else {
        this.setState({ isAuth: false })
      }
    })
  }

  render() {
    if (this.state.isAuth === null){
      return <p>Authenticating...</p>
    }

    return(
      <Route rest={this.rest} render={(props) => ((this.state.isAuth) ? 
        <this.comp /> :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> 
      )} />
    );
  }
}

