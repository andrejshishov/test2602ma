import './Film.css';
import { format } from 'date-fns';
import React, { Component } from 'react';
import { Spin } from 'antd';

import FilmGenre from '../FilmGenre';
import RateBar from '../FilmRating';
import noDataImage from '../../img/noimage.png';

export default class Film extends Component {
  state = {
    loading: true,
  };

  onLoadImage = () => {
    this.setState({ loading: false });
  };

  fixOverview(text, maxLength) {
    if (text.length < maxLength) return text;
    const newOverview = text.slice(0, maxLength - 3);
    return `${newOverview.slice(0, newOverview.lastIndexOf(' '))} ...`;
  }

  render() {
    const {
      filmData: {
 title, date, poster, overview, id, rating, avgRating, filmGenres,
},
      posterBase,
    } = this.props;
    const { loading } = this.state;
    const colorBorder = avgRating < 3
        ? '#E90000'
        : avgRating < 5
        ? '#E97E00'
        : avgRating < 7
        ? '#E9D100'
        : avgRating >= 7
        ? '#66E900'
        : null;
    const formatedDate = date ? format(new Date(date), 'MMMM d, yyyy') : null;
    const formatedFilmGenres = filmGenres.map((gId) => <FilmGenre key={gId} genreId={gId} />);
    const posterImage = poster ? `${posterBase}${poster}` : noDataImage;

    return (
      <div className="filmCard">
        <div className="filmCard__pic">
          <Spin style={{ display: loading ? 'block' : 'none', alignSelf: 'center' }} />
          <img
            src={posterImage}
            style={{ display: loading ? 'none' : 'block' }}
            className="filmCard__poster"
            onLoad={this.onLoadImage}
            alt="film poster"
          />
        </div>
        <div className="filmCard__description">
          <div className="filmCard__header">
            <div className="filmCard__title">{title}</div>
            <div className="filmCard__avgRating"
             style={{ borderColor: colorBorder }}>
              {avgRating}
            </div>
          </div>
          <div className="filmCard__date">{formatedDate}</div>
          <div className="filmCard__genres">{formatedFilmGenres}</div>
          <div className="filmCard__overview">{this.fixOverview(`${overview || 'Sorry,no overview given yet...'}`, 150)}</div>
          <RateBar id={id} rating={rating} />
        </div>
      </div>
    );
  }
}