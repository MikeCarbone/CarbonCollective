import React, { Component } from 'react';
class NewPost extends Component {
  state = {
    data: {
      title: null,
      url: null,
      tags: [],
      description: null
    }
  }

  handleChange = (event) => {
    const property = event.target.id;
    let dataObj = this.state.data;
    let val;

    (async () => {
      if (property === 'tags') {
        val = this.handleTags(event.target.value);
      } else if (property === 'title') {
        val = event.target.value.toLowerCase();
      } else {
        val = event.target.value;
      }

      dataObj[property] = val;
      await this.setState({ data: dataObj });
      console.log(this.state.data);
    })();
  }

  sendNew = (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    const formData = new FormData();

    formData.set(file.name, file, file.name);
    Object.keys(this.state.data).forEach(val => {
      formData.set(val, this.state.data[val]);
    });

    for (let [key, value] of formData.entries()) { 
      console.log(key, value);
    }
   
    (async () => {
      try {
        await this.validate();
        fetch('/api/links', {
            method: 'POST',
            headers: {
              'enctype': 'multipart/form-data',
              'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(res => {
          this.props.resHandler({ res });
          console.log(res);
        })
        .catch(err => this.props.resHandler({ err }));
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
        <form>
          <div className="generic__standard-wrapper">
            <h1 className="generic__section-header">New Post</h1>
            <div className="generic__hr"></div>
            <div className="create">
              <input className="generic__input create__input" onChange={this.handleChange} type="text" id="title" placeholder="Title"></input>
              <input className="generic__input create__input" onChange={this.handleChange} type="text" id="url" placeholder="URL"></input>
              <input className="generic__input create__input" onChange={this.handleChange} type="file" name="file" id="image" accept="image/*" placeholder="Image"></input>
              <input className="generic__input create__input" onChange={this.handleChange} hidden type="text" name="imageUrl" id="imageUrl"></input>
              <input className="generic__input create__input" onChange={this.handleChange} type="text" id="tags" placeholder="Tags"></input>
              <label className="create__label" htmlFor="tags">Separate tags with a comma, e.g. "  logo,productivity,business  "</label>
              <input className="generic__input create__input" onChange={this.handleChange} type="text" id="description" placeholder="Description"></input>
              <input className="generic__input create__input" onChange={this.handleChange} type="text" id="opinion" placeholder="HOT TAKE: What do you like about this?"></input>
              <input className="generic__input create__input" onChange={this.handleChange} type="text" id="source" placeholder="SOURCE: Where did you find this? (Word / Name)"></input>
              <input className="generic__input create__input" onChange={this.handleChange} type="text" id="related" placeholder="Link to original find? e.g. Twitter thread, Reddit post, etc."></input>
              <button className="generic__btn create__btn" onClick={this.sendNew}>Submit</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default NewPost;