import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: {
            path: 'title',
            order: 'asc'
        }
    }

    componentDidMount() {
        const genres = [{_id: "", name: 'All Genres'}, ...getGenres()]
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

    handleSort = (sortColumn) => {
        this.setState({sortColumn})
    }

    render() {
        const {length: count} = this.state.movies
        const {pageSize, currentPage, movies: allMovies, genres, selectedGenre, sortColumn} = this.state;
        if (count === 0)
            return <p>There are no movies in the database.</p>

        const filtered = selectedGenre && selectedGenre._id ?
            allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)
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
                    <p>Showing {sorted.length} movies in the database.</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
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
