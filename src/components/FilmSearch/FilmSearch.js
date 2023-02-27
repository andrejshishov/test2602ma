import React, { Component } from 'react';

import ErrorFailedSearch from '../ErrorFailedSearch';
import './FilmSearch.css';

export default class SearchBar extends Component {
  state = {
    value: '',
  };

  searchFilmRequest = (e) => {
    this.setState({
      value: e.target.value,
    });
    this.props.onSearchDebounce(e.target.value);
  };

  render() {
    const errorFailed = this.props.results ? <ErrorFailedSearch className="emptySearchWarning" /> : null;

    return (
      <div className="searchBar">
        <input
          className="searchBar__input"
          placeholder=" Type to search..."
          value={this.state.value}
          onChange={this.searchFilmRequest}
        />
        {errorFailed}
      </div>
    );
  }
}