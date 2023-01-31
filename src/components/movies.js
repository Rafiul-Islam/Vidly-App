import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
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

    render() {
        const {length: count} = this.state.movies
        const {pageSize, currentPage, movies: allMovies} = this.state;
        if (count === 0)
            return <p>There are no movies in the database.</p>
        const movies = paginate(allMovies, currentPage, pageSize)
        return (
            <>
                <p>
                    Showing {count} movies in the database.
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
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </>
        );
    }
}

export default Movies;