import { Rate } from 'antd';

import { FilmConsumer } from '../../context';

function RateBar({ id, rating }) {
  return (
    <FilmConsumer>
      {({ rateFilm }) => (
        <Rate
          allowHalf
          className="filmCard__rate"
          defaultValue={rating}
          count={10}
          onChange={(value) => rateFilm(id, value)}
          style={{
            fontSize: 16,
          }}
        />
      )}
    </FilmConsumer>
  );
}

export default RateBar;