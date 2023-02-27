export default class FilmService {
    apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=8bf2c58a16765632c7e800b05d331912';

    apiKey = '8bf2c58a16765632c7e800b05d331912';

    posterBase = 'https://image.tmdb.org/t/p/original';

    newSession = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8bf2c58a16765632c7e800b05d331912';

    newSessionId;

    genresList = [];

    async getResource(url) {
      const res = await fetch(`${this.apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Sorry, could not fetch ${url}, received ${res.status}`);
      }
      return res.json();
    }

    async getAllFilms(search, page = 1) {
      return this.getResource(`&query=${search}&page=${page}`);
    }

    async startNewSession() {
      const res = await fetch(`${this.newSession}`);
      const session = await res.json();
      this.newSessionId = session.guest_session_id;
      const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
      const genresObj = await genresRes.json();
      this.genresList = genresObj.genres;
    }

    async getRatedFilms(page) {
      const res = await fetch(
        `https://api.themoviedb.org/3/guest_session/${this.newSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`,
      );
      return res.json();
    }

  rateFilm = async (id, value) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.newSessionId}`;
    const rating = { value };

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(rating),
    }).catch((err) => {
        throw new Error('Unsuccessful fetch request to server', err.message);
    });
};
}
