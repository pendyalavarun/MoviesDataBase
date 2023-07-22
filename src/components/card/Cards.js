import React from 'react'
import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs'
import './Card.css'
function card(props) {
    return (
        <div>
            <Link to={'/movie/' + props.movie.id} >
                <div className='cards'>
                    <div >
                        <img src={'https://image.tmdb.org/t/p/original' + props.movie.poster_path} alt="" className='cardimg' />
                    </div>
                    <div className='card_overlay text-white'>
                        <h1 className='card_title'>{props.movie.original_title}</h1>
                        <div className='card_runtime'>
                            {props.movie.release_date}
                            <span className='card_rating'>
                                <BsFillStarFill className='text-warning mb-1 me-1' />
                                {props.movie.vote_average}
                            </span>
                        </div>
                        <div className='card_description'>{props.movie.overview.slice(0, 100) + "..."}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default card