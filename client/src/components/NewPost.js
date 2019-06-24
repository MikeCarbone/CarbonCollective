import React, { Component } from 'react';

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

class NewPost extends Component {
  state = {
    data: {
      title: null,
      url: null,
      tags: [],
      description: null
    },
    toast: {
      success: null,
      err: null
    }
  }

  handleChange = (event) => {
    const property = event.target.id;
    let dataObj = this.state.data;
    let val;

    (async () => {
      if (property === "tags") {
        val = this.handleTags(event.target.value);
      } else {
        val = event.target.value;
      }
      
      dataObj[property] = val;
      await this.setState({ data: dataObj });
    })();
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

  sendNew = (event) => {
    event.preventDefault();
    (async () => {
      try {
        await this.validate();
        fetch('/links', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.data)
        })
        .then(response => response.json())
        .then(res => this.handleRes({ 'success': true, res }))
        .catch(err => this.handleRes({ 'success': false, err }));
      } catch (err) {
        alert(err);
      }
    })();
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      if (this.state.data.title === null) {
        return reject('Please set a title');
      }
      
      if (this.state.data.url === null) {
        return reject('Please set a url');
      }

      if ((!this.state.data.url.includes('http://')) && (!this.state.data.url.includes('https://'))) {
        return reject('Invalid URL! Make sure it includes http://, https://, or www.');
      }

      if ((this.state.data.related !== undefined) && ((!this.state.data.related.includes('http://')) && (!this.state.data.related.includes('https://')))) {
        return reject('Invalid URL! Make sure it includes http://, https://, or www.');
      }
      
      if (this.state.data.tags === null) {
        return reject('Please set some tags');
      }

      if (this.state.data.description === null) {
        return reject('Please enter a short description!');
      }

      resolve();
    });
  }

  handleTags (str) {
    return str.split(", ");
  }

  render () {
    return(
      <>
        <Toast data={this.state.toast} />
        <form>
          <div className="standard-wrapper">
            <h1 className="generic__section-header">New Post</h1>
            <div className="create">
              <input className="input create__input" onChange={this.handleChange} type="text" id="title" placeholder="Title"></input>
              <input className="input create__input" onChange={this.handleChange} type="text" id="url" placeholder="URL"></input>
              <input className="input create__input" onChange={this.handleChange} type="text" id="tags" placeholder="Tags"></input>
              <label className="create__label" htmlFor="tags">Separate tags with a comma and space, e.g. "  logo, productivity, business  "</label>
              <input className="input create__input" onChange={this.handleChange} type="text" id="description" placeholder="Description"></input>
              <input className="input create__input" onChange={this.handleChange} type="text" id="opinion" placeholder="What do you like about this?"></input>
              <input className="input create__input" onChange={this.handleChange} type="text" id="source" placeholder="Where did you find this? (Word / Name)"></input>
              <input className="input create__input" onChange={this.handleChange} type="text" id="related" placeholder="Link to original find? e.g. Twitter thread, Reddit post, etc."></input>
              <button className="btn create__btn" onClick={this.sendNew}>Submit</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default NewPost;