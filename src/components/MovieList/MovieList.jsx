import React, { useEffect, useState } from 'react';

import './MovieList.css';
import Fire from '../../assets/fire.png';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //logic for calling api
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=1731513e3ac041d65fe26b0652832523'
    );

    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <section className='movie_list'>
      <header className='align_center movie_list_header'>
        <h2 className='align_center movie_list_heading'>
          Popular <img src={Fire} alt='fire emoji' className='navbar_emoji' />
        </h2>

        <div className='align_center movie_list_fs'>
          <ui className='align_center movie_filter'>
            <li className='movie_filter_item active'>8+ Star</li>
            <li className='movie_filter_item'>7+ Star</li>
            <li className='movie_filter_item'>6+ Star</li>
          </ui>

          <select name='' id='' className='movie_sorting'>
            <option value=''>SortBy</option>
            <option value=''>Date</option>
            <option value=''>Rating</option>
          </select>

          <select name='' id='' className='movie_sorting'>
            <option value=''>Ascending</option>
            <option value=''>Descending</option>
          </select>
        </div>
      </header>

      <div className='movie_cards'>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </section>
  );
};

export default MovieList;
