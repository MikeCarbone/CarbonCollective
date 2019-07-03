import React, { Component } from 'react';

class SearchBox extends Component{
  state = {
    term: null,
    results: []
  }

  handleChange = (e) => {
    // Input change, query for results

    (async () => {
      await this.setState({term: e.target.value});
      this.search();
      console.log(this.state.term);
    })();
  }

  search = () => {
    fetch('/api/links/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({term: this.state.term})
      })
      .then(response => response.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div id="SearchBox" className="searchbar">
        <div className="searchbar__container">
          <input className="searchbar__input" id="searchright" type="search" name="q" placeholder="Yes Captain?" />
          <label className="searchbar__icon" for="searchright"><span className="searchbar__mglass">&#9906;</span></label>
        </div>
        <div className="searchbar__results">
          <div className="searchbar__result">
            <h3>Result Title</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBox;