import Film from '../Film';
import './FilmList.css';

function FilmList({ filmsData, posterBase }) {
  const formatedFilmsList = filmsData.map((film) => <Film key={film.id} filmData={film} posterBase={posterBase} />);

  return <div className="filmsList">{formatedFilmsList}</div>;
}

export default FilmList;