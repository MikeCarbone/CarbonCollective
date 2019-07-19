import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const BACKSPACE_KEYCODE = 8;
class SearchBox extends Component{
  state = {
    term: null,
    searchResults: []
  }

  handleChange = (e) => {
    this.toggleResults({forceOpen: true});
    // Input change, query for results
    if (e.keycode !== BACKSPACE_KEYCODE) {
      (async () => {
        await this.setState({term: e.target.value});

        if (this.state.term !== '') {
          this.search();
        } else {
          this.toggleResults({forceClose: true});
        }
      })();
    }
  }

  search = () => {
    fetch('/api/links/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({term: this.state.term})
      })
      .then(response => response.json())
      .then(res => {
        this.setState({
          searchResults: res.data
        });
      })
      .catch(err => console.log(err));
  }

  displayResults = (results) => {
    this.searchResults.style.display = "block";
  }

  toggleResults = opts => {
    if (opts.forceClose === true) {
      return this.searchResults.style.display = 'none';
    }
    
    if (opts.forceOpen === true) {
      return this.searchResults.style.display = 'block';
    }

    if (this.searchResults.style.display !== 'block') {
      this.searchResults.style.display = 'block';
    } else {
      this.searchResults.style.display = 'none';
    }
  }
  
  componentDidMount = () => {
    this.searchResults = document.getElementsByClassName('searchbar__results')[0];
  }

  render () {
    if (this.state.searchResults.length !== 0) {
      var searchResults = this.state.searchResults.map((link, index) => {
        return (
          <Link onClick={() => this.toggleResults({ forceClose: true })} key={index} className="searchbar__result" to={`/cc/${link.slug}`}>
            <p className="searchbar__result-text">{link.title.toUpperCase()}</p>
            <img className="searchbar__result-img" alt="" src={link.imageUrl} />
          </Link>
        );
      });
    }

    return (
      <div id="SearchBox" className="searchbar">
        <div className="searchbar__container">
          <input autoCapitalize="none" autoComplete="off" onFocus={() => this.toggleResults({forceOpen: true})} onChange={this.handleChange} className="searchbar__input" id="searchright" type="search" name="q" placeholder="Yes, Captain?" />
          <label className="searchbar__icon" htmlFor="searchright"><span className="searchbar__mglass">&#9906;</span></label>
        </div>
        <div className="searchbar__results">
          { searchResults }
        </div>
      </div>
    )
  }
}

export default SearchBox;