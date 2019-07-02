import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.css';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("react-target")
)



// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'


// export default function AuthExample () {
//   return (
//     <Router>
//       <div>
//         <AuthButton/>
//         <ul>
//           <li><Link to="/public">Public Page</Link></li>
//           <li><Link to="/protected">Protected Page</Link></li>
//         </ul>
//         <Route path="/public" component={Public}/>
//         <Route path="/login" component={Login}/>
//         <PrivateRoute path='/protected' component={Protected} />
//       </div>
//     </Router>
//   )
// }