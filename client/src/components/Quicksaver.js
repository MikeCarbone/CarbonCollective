import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { setDocTitle, setMetas } from '../generic/overallConfig';

class Quicksaver extends Component {
  constructor({ match }) {
    super();

    this.state = {
      posts: null,
      match,
      isSaving: true,
      isSuccess: null,
      url: null
    }
  }

  componentWillReceiveProps() {
    this.prepState();
  }

  componentWillMount () {
    setMetas({title: "Quicksaving...", slug: '/quicksaves'});
    this.prepState();
  }

  prepState() {
    (async () => {
      const url = window.location.href;
      const pos = url.indexOf('/save/') + '/save/'.length;
      const link = url.split('').splice(pos).join('');

      await this.setState({
        url: link
      });
      this.sendLink();
    })();
  }

  sendLink = () => {
    if (this.state.url === '') {
      console.log('No link specified.')
      return this.failureOps();
    }

    fetch(`/api/quicksaves/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({url: this.state.url})
    })
    .then(res => { return res.json() })
    .then(data => { this.succesOps(data) })
    .catch(err => { this.failureOps(err) });
  }

  failureOps (err) {
    setDocTitle("Error!");
    console.log(JSON.stringify(err));
    this.setState({
      status: "Error saving link.",
      isSuccess: false,
      isSaving: false
    });
  }

  succesOps (data) {
    setDocTitle("Saved!");
    this.setState({
      status: "Success, link quicksaved.",
      isSuccess: true,
      isSaving: false
    });
  }

  render () {
      if (this.state.isSaving){
        setDocTitle("Saving...");
      }

      const text = (this.state.isSaving)
        ? "Saving..."
        : this.state.status;

      const url = (this.state.url) ? this.state.url : "";

      return (
        <main className={`cc__standard-wrapper quicksaver`}>
          <h2 className={`quicksaver__header`}>{text}</h2>
          <a href={url} className="quicksaver__url cc__text-link">{url}</a>
          <Link to="/saves" className="cc__btn quicksaver__btn">View all quicksaves</Link>
        </main>
      );
  }
}

export default Quicksaver;
