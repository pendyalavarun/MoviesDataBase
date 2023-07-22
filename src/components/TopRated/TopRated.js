import React from 'react'
import './TopRated.css';
import { useEffect, useState } from 'react';
import Cards from '../card/Cards';
function TopRated() {
  let [page, setPage] = useState(1);
  let [topRatedMovies, settopRatedMovies] = useState([]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=" + page)
      .then((res) => res.json())
      .then((dat) => settopRatedMovies(dat.results))
      .catch((err) => console.log(err))
  }, [page]);
  let loadPage = (p) => {
    if (p <= 500 && p > 0)
      setPage(p);
  }
  return (
    <div className='movie_list'>
      <div className='headsection'>
        <h2 className='m-5 text-white fw-bold'>TOP RATED MOVIES</h2>
        <div className='pageinput'>
          <label htmlFor="pagenumber" className='me-3'>PAGE</label>
          <input type="number" name='pagenumber' defaultValue={1} max={500} min={1} onChange={(e) => { loadPage(e.target.value) }} className='pageinputfield' />
        </div>
      </div>
      <div className="list_cards">
        {
          topRatedMovies.map(movie => (
            <Cards movie={movie} key={movie.id} />
          ))
        }
      </div>
    </div>
  )
}

export default TopRated