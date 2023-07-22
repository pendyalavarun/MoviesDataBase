import React, { useState } from 'react'
import './NavBar.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
function NavBar() {
  let [results, setResults] = useState([]);
  let [input, setInput] = useState("");
  const fetchData = (value) => {
    const apiUrls = [
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US",
      "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US",
      "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US",
    ];

    Promise.all(
      apiUrls.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .then((data) =>
            data.results.filter(
              (movie) =>
                value &&
                movie.original_title &&
                movie.original_title.toLowerCase().includes(value)
            )
          )
      )
    )
      .then((resultsArray) => {
        const mergedResults = resultsArray.flat();
        const uniqueResults = Array.from(new Set(mergedResults.map(JSON.stringify))).map(JSON.parse);
        setResults(uniqueResults);
      })
      .catch((err) => console.log(err));
  };
  let handleChange = (data) => {
    setInput(data);
    fetchData(data);
  };

  return (
    <div className='nnavbbar'>
      <div className='d-flex justify-content-between navitems'>
        <div>
          <Link className="nav-link m-2 fs-3" to="/Home"> Find Movie</Link>
        </div>
        <div className='d-flex movietype'>
          <div>
            <NavLink className="nav-link m-2 fs-3 " to="/Popular">Popular</NavLink>
          </div>
          <div>
            <NavLink className="nav-link  m-2 fs-3" to="/TopRated">TopRated</NavLink>
          </div>
          <div>
            <NavLink className="nav-link  m-2 fs-3" to="/Upcoming">Upcoming</NavLink>
          </div>
        </div>
        <div>
          <div className='d-flex searchfield m-2'>
            <BsSearch className='searchicon' />
            <input type="text" className='inputfield ' placeholder='Search Movie' value={input} onChange={(e) => handleChange(e.target.value)} />
          </div>
          {
            results.length > 0 && (
              <div className={'searchresults p-2 rounded'}>
                {
                  results && results.map(moviee => (
                    <Link to={'/movie/' + moviee.id} key={moviee.id} className='text-decoration-none' >
                      <div className='searchresult d-flex'>
                        <div>
                          <img src={'https://image.tmdb.org/t/p/original' + moviee.poster_path} alt="img" className='searchimage' />
                        </div>
                        <div className='ms-2'>
                          <p >{moviee.original_title}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>)
          }
        </div>
      </div>
    </div>
  )
}
//ms-3 mb-2 mt-2 fs-3 ps-2 pe-2
export default NavBar