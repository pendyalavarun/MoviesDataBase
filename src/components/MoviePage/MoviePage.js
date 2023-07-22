import React, { useEffect, useState } from 'react'
import './MoviePage.css'
import { useParams } from 'react-router-dom'
function MoviePage() {
    const id = useParams();
    let [movie, setmovie] = useState({})
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/" + id.id + "?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
            .then((res) => res.json())
            .then((dat) => {
                setmovie(dat)
            })
            .catch((err) => console.log(err))
    }, [id])
    return (
        <div className="movie">
            <div className="movie_intro">
                <img className="movie_backdrop" src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        <img className="movie_poster" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} />
                    </div>
                </div>
                <div className="movie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{movie.original_title}</div>
                        <div className="movie_tagline">{movie.tagline}</div>
                        <div className="movie_rating">
                            {movie.vote_average} <i className="fas fa-star" />
                            <span className="movie_voteCount">{"(" + movie.vote_count + ") votes"}</span>
                        </div>
                        <div className="movie_runtime">{movie.runtime + " mins"}</div>
                        <div className="movie_releaseDate">{"Release date: " + movie.release_date}</div>
                        <div className="movie_genres">
                            {
                                movie && movie.genres
                                    ?
                                    movie.genres.map(genre => (
                                        <><span className="movie_genre" id={genre.id}>{genre.name}</span></>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{movie.overview}</div>
                    </div>

                </div>
            </div>
            <div className="movie_links">
                <div className="movie_heading text-white">Useful Links</div>
                {
                    movie && movie.homepage && <a href={movie.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie_homeButton movie_Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    movie && movie.imdb_id && <a href={"https://www.imdb.com/title/" + movie.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie_imdbButton movie_Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie_heading text-white">Production companies</div>
            <div className="movie_production">
                {
                    movie && movie.production_companies && movie.production_companies.map(company => (
                        <>
                            {
                                company.logo_path
                                &&
                                <span className="productionCompanyImage">
                                    <img className="movie_productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default MoviePage