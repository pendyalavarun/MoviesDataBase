import React from 'react'
import './Upcoming.css';
import { useEffect, useState } from 'react';
import Cards from '../card/Cards';
function Upcoming() {
  let [page, setPage] = useState(1);
  let [upComingMovies, setupComingMovies] = useState([]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=" + page)
      .then((res) => res.json())
      .then((dat) => setupComingMovies(dat.results))
      .catch((err) => console.log(err))
  }, [page]);
  let loadPage = (p) => {
    if (p <= 25 && p > 0)
      setPage(p);
  }
  return (
    <div className='movie_list'><div className='headsection'>
      <h2 className='m-5 text-white fw-bold'>UPCOMING MOVIES</h2>
      <div className='pageinput'>
        <label htmlFor="pagenumber" className='me-3'>PAGE</label>
        <input type="number" name='pagenumber' defaultValue={1} max={25} min={1} onChange={(e) => { loadPage(e.target.value) }} className='pageinputfield' />
      </div>
    </div>
      <div className="list_cards">
        {
          upComingMovies.map(movie => (
            <Cards movie={movie} key={movie.id} />
          ))
        }
      </div>
    </div>
  )
}

export default Upcoming