import React from 'react';

const Toast = (props) => {
  if (props.data.err) {
    console.log(props.data.err);
    return <p style={{color: "white", backgroundColor: "red"}}>Something didnt work correctly, error logged in console.</p> 
  } else if (props.data.success) {
    return <p style={{color: "white", backgroundColor: "green"}}>Link submitted successfully!</p>
  } else {
    return null;
  }
}

export default Toast;