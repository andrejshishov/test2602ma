
import React, { Component } from 'react';
import { Alert, Tabs } from 'antd';
import { debounce } from 'lodash';
import { Online, Offline } from 'react-detect-offline';

import FilmList from '../FilmList';
import './App.css';
import ErrorMessage from '../ErrorMessage';
import SearchBar from '../FilmSearch';
import PagePagination from '../FilmPagination';
import SearchTab from '../SearchTab';
import RatedTab from '../RatedTab';
import { FilmProvider } from '../../context';
import FilmService from '../../services/moviedb-service';
import Spinner from '../Spinner';


export default class App extends Component {
  state = {
    totalPages: 1,
    films: [],
    ratedPages: 1,
    ratedFilms: [],
    search: 'lord',
    noResults: false,
    loading: true,
    error: false,
    connection: true,
    currentTab: 'search',
  };

  moviedb = new FilmService();

  async componentDidMount() {
    try {
      await this.moviedb.startNewSession();
    } catch {
      this.stateError();
    }
    await this.requestFilms();
  }

  onSearchDebounce = debounce((input) => {
    this.setState({ search: input });
  }, 800)

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search === '') return;
    if (this.state.search !== prevState.search) this.requestFilms();
    if (this.state.currentTab === 'rated' && this.state.currentTab !== prevState.currentTab) this.requestRatedFilms();
    if (this.state.currentTab === 'search' && this.state.currentTab !== prevState.currentTab) this.requestFilms();
  }

  onLoadFilms = (allFilms) => {
    this.setState({ loading: true, noResults: false });
    if (allFilms.length === 0) {
      return this.setState({ noResults: true, loading: false });
    }
    let newData = [];
    allFilms.forEach((film) => {
      newData = [...newData, this.createFilmData(film)];
    });
    if (this.state.ratedFilms.length !== 0) {
      this.state.ratedFilms.forEach((ratedFilm) => {
        newData.forEach((film, i) => (ratedFilm.id === film.id ? (newData[i] = { ...ratedFilm }) : film));
      });
    }
    this.setState({ films: newData, loading: false });
  };

  onLoadRatedFilms = (ratedFilms) => {
    this.setState({ loading: true });
    let newData = [];
    ratedFilms.forEach((film) => {
      newData = [...newData, this.createFilmData(film)];
      this.setState({ ratedFilms: newData });
    });
    this.setState({
      loading: false,
    });
  };

  stateError = () => {
    if (!window.navigator.onLine) {
      this.setState({
        connection: false,
        loading: false,
      });
    } else {
      this.setState({
        error: true,
        loading: false,
      });
    }
  };

  requestFilms = (page = 1) => {
    this.moviedb
      .getAllFilms(this.state.search, page)
      .then((res) => {
        this.setState({ totalPages: res.total_pages });
        return res.results;
      })
      .then(this.onLoadFilms)
      .catch(() => this.stateError());
  };

  requestRatedFilms = (page = 1) => {
    this.moviedb
      .getRatedFilms(page)
      .then((res) => {
        this.setState({ ratedPages: res.total_pages });
        return res.results;
      })
      .then(this.onLoadRatedFilms)
      .catch(() => this.stateError());
  };

  onTabChange = (tab) => {
    this.setState({ currentTab: tab });
  };

  createFilmData(film) {
    return {
      title: film.title,
      date: film.release_date,
      poster: film.poster_path,
      overview: film.overview,
      id: film.id,
      rating: film.rating,
      avgRating: film.vote_average.toFixed(1),
      filmGenres: film.genre_ids,
    };
  }

  render() {
    const {
 films, loading, error, connection, totalPages, noResults, currentTab, ratedFilms, ratedPages,
} = this.state;
    const pageIsReady = !(loading || error || !connection);

    const search = pageIsReady ? <SearchBar onSearchDebounce={this.onSearchDebounce} results={noResults} /> : null;
    const loadingIndicator = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage message="Oooops...Something went wrong <',__,)~" /> : null;
    const offline = !connection ? <ErrorMessage message="Unlucky! You have problems with internet connection TT" /> : null;
    const filmList = pageIsReady ? <FilmList filmsData={films} posterBase={this.moviedb.posterBase} /> : null;
    const ratedFilmsList = pageIsReady ? (
      <FilmList filmsData={ratedFilms} posterBase={this.moviedb.posterBase} loading={loading} />
    ) : null;
    const pagination = pageIsReady ? (
      <PagePagination totalFilms={totalPages * 20} onPageChange={this.requestFilms} />
    ) : null;
    const ratedPagination = pageIsReady ? (
      <PagePagination totalFilms={ratedPages * 20} onPageChange={this.requestRatedFilms} />
    ) : null;

    const items = [
      {
        key: 'search',
        label: 'Search',
        children: (
          <SearchTab
            search={search}
            loadingIndicator={loadingIndicator}
            errorMessage={errorMessage}
            offline={offline}
            filmList={filmList}
            pagination={pagination}
          />
        ),
      },
      {
        key: 'rated',
        label: 'Rated',
        children: (
          <RatedTab
            loadingIndicator={loadingIndicator}
            errorMessage={errorMessage}
            offline={offline}
            ratedFilmsList={ratedFilmsList}
            ratedPagination={ratedPagination}
          />
        ),
      },
    ];

    return (
      <div>
    <Online>
      <FilmProvider value={this.moviedb}>
          <section className="movieApp">
            <Tabs
              defaultActiveKey="search"
              activeKey={currentTab}
              onChange={(tab) => this.onTabChange(tab)}
              items={items}
              centered
            />
          </section>
        </FilmProvider>
     </Online>
    <Offline>
      <Alert
            message="No connection"
            description="Please, check your internet connection and come back stronger!"
            type="error"
            closable
          />
    </Offline>
    </div>
    )
  }
}