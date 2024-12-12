import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import './MovieList.css';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const MovieList = ({ type, title, emoji }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: 'default',
    order: 'asc',
  });

  // // no dependency, so callback function will run when component is re-rendered
  // useEffect(() => {
  //   //logic for calling api
  //   fetchMovies();
  // }, []);

  // dependency is from type property, any changes from type property will run this callback function
  useEffect(() => {
    //logic for calling api
    fetchMovies();
  }, [type]);

  // dependency is from sort property, any changes from sort will run this callback function
  useEffect(() => {
    if (sort.by !== 'default') {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=1731513e3ac041d65fe26b0652832523`
    );

    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results);
  };

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);

      const filtered = movies.filter((movie) => {
        return movie.vote_average >= rate;
      });

      setFilterMovies(filtered);
    }
  };

  const handleSort = (event) => {
    const { name, value } = event.target;
    setSort((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <section className='movie_list' id={type}>
      <header className='align_center movie_list_header'>
        <h2 className='align_center movie_list_heading'>
          {title}{' '}
          <img src={emoji} alt={`${emoji} icon`} className='navbar_emoji' />
        </h2>

        <div className='align_center movie_list_fs'>
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          <select
            name='by'
            id=''
            onChange={handleSort}
            value={sort.by}
            className='movie_sorting'
          >
            <option value='default'>SortBy</option>
            <option value='release_date'>Date</option>
            <option value='vote_average'>Rating</option>
          </select>

          <select
            name='order'
            id=''
            onChange={handleSort}
            value={sort.order}
            className='movie_sorting'
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </header>

      <div className='movie_cards'>
        {filterMovies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </section>
  );
};

export default MovieList;
