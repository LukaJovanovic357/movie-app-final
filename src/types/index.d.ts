type Genres = {
  id: number;
  name: string;
};

type Favorite = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: string;
};

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  genres: Genres[];
  release_date: string;
  vote_average: string;
  popularity: string;
  runtime: string;
  origin_country: string;
  country: string;
};

type DataTrailers = {
  id: number;
  results: Trailers[];
};

type Trailers = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export { Movie, Trailers, DataTrailers, Favorite, Genres };
