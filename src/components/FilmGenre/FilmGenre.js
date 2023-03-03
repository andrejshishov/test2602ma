import { FilmConsumer } from '../../context';

function FilmGenre({ genreId }) {
  return (
    <FilmConsumer>
      {({ genresList }) => {
        const filmGenre = genresList.find((el) => el.id === genreId);
        return (
          <span key={filmGenre.id} className="filmCard__genre">
            {filmGenre.name}
          </span>
        );
      }}
    </FilmConsumer>
  );
}

export default FilmGenre;