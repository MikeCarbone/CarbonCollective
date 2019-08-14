import React, { Component } from 'react';
import { setDocTitle, setMetas } from '../generic/overallConfig'
import { getDate } from '../generic/commonFunctions';

class QuicksaveList extends Component {
  state = {
    posts: []
  }

  componentWillMount () {
    fetch('/api/quicksaves')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ links: data });
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  componentDidMount() {
    setMetas({title: "Quicksaves"});
    setDocTitle("Quicksaves");
  }

  render() {
    const links = (this.state.links)
    ? this.state.links.data.map((link, index) => {
      return (
        <div key={index} className="quicklink">
          <a className="generic__text-link quicklink__link" href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
          <p className="quicklink__date">{getDate(link.dateAdded)}</p>
        </div>
      );
    })
    : "No links have been quicksaved!";

    return (
      <main>
        <section className="generic__standard-wrapper quicklink-cont">
        <h1 className="quicklink__header">Quick Saved Links</h1>
          {links}
        </section>
      </main>
    );
  }
}

export default QuicksaveList;
