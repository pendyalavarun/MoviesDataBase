import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs'
import Cards from '../card/Cards';
function Home() {
  let [popularMovies, setpopularMovies] = useState([]);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
      .then((res) => res.json())
      .then((dat) => setpopularMovies(dat.results))
      .catch((err) => console.log(err))
  }, []);
  return (
    <div>
      <div className='HeroSection'>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {
            popularMovies.map(movie => (
              <Link to={'/movie/' + movie.id} key={movie.id}>
                <div className='carouimg'>
                  <img src={'https://image.tmdb.org/t/p/original' + movie.backdrop_path} alt="" />
                </div>
                <div className='carouimg_overlay text-white'>
                  <h1 className='carouimg_title'>{movie.original_title}</h1>
                  <div className='carouimg_runtime'>
                    {movie.release_date}
                    <span className='carouimg_rating'>
                      <BsFillStarFill className='text-warning mb-2 me-3' />
                      {movie.vote_average}
                    </span>
                  </div>
                  <div className='carouimg_description'>{movie.overview}</div>
                </div>
              </Link>
            ))
          }
        </Carousel>
        <div className='movie_list'>
          <h2 className='mt-5 fw-bold text-white mb-5'>POPULAR MOVIES</h2>
          <div className="list_cards">
            {
              popularMovies.map(movie => (
                <Cards movie={movie} key={movie.id} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home