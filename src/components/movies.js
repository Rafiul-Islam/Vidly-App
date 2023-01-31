import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/fakeGenreService";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
    }

    componentDidMount() {
        const genres = [{name: 'All Genres'}, ...getGenres()]
        this.setState({
            movies: getMovies(),
            genres
        })
    }

    handleDelete = (movieId) => {
        const updatedMovies = this.state.movies.filter(movie => movie._id !== movieId)
        this.setState({movies: updatedMovies});
    }

    handleLike = (movie) => {
        const updatedMovies = this.state.movies.map(m => {
            if (m._id === movie._id) {
                return {...m, liked: !m.liked};
            }
            return m;
        });
        this.setState({movies: updatedMovies});
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    }

    handleGenreSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1
        })
    }

    render() {
        const {length: count} = this.state.movies
        const {pageSize, currentPage, movies: allMovies, genres, selectedGenre} = this.state;
        if (count === 0)
            return <p>There are no movies in the database.</p>

        const filtered = selectedGenre && selectedGenre._id ?
            allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies

        const movies = paginate(filtered, currentPage, pageSize)
        return (
            <div className="row">
                <div className='col-lg-3 col-xl-2 pb-5 pb-lg-0'>
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className='col'>
                    <p>
                        Showing {filtered.length} movies in the database.
                    </p>
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            movies.map(movie =>
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre?.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like
                                            liked={movie.liked}
                                            onClick={() => this.handleLike(movie)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => this.handleDelete(movie._id)}
                                                className="btn bg-danger text-white">Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
