import React, {Component} from 'react';
import _ from "lodash";
import {deleteMovie, getMovies} from "../services/movieService";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import getGenres from "../services/genreService";
import MoviesTable from "./moviesTable";
import {NavLink} from "react-router-dom";
import SearchBox from "./common/searchBox";
import {toast} from "react-toastify";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        searchQuery: '',
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        sortColumn: {
            path: 'title',
            order: 'asc'
        }
    }

    async componentDidMount() {
        const {data} = await getGenres();
        const genres = [{_id: "", name: 'All Genres'}, ...data]

        const {data: movies} = await getMovies();
        this.setState({
            movies: [...movies],
            genres
        })
    }

    getPageData() {
        const {selectedGenre, searchQuery, movies: allMovies, sortColumn, currentPage, pageSize} = this.state;

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)

        return {totalCount: filtered.length, movies}
    }

    handleDelete = async (movieId) => {
        const originalMovies = this.state.movies;
        const updatedMovies = originalMovies.filter(movie => movie._id !== movieId)
        this.setState({movies: updatedMovies});

        try {
            await deleteMovie(movieId);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("This movie has already been deleted!");
            }
            this.setState({
                movies: originalMovies
            });
        }
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
            searchQuery: '',
            currentPage: 1
        })
    }

    handleSearch = (query) => {
        this.setState({
            selectedGenre: null,
            searchQuery: query,
            currentPage: 1
        })
    }

    handleSort = (sortColumn) => {
        this.setState({sortColumn})
    }

    render() {
        const { user } = this.props;
        const {length: count} = this.state.movies
        const {pageSize, currentPage, genres, selectedGenre, sortColumn, searchQuery} = this.state;
        if (count === 0)
            return <p>There are no movies in the database.</p>

        const {totalCount, movies} = this.getPageData()
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
                    {user && <NavLink to='/movies/new' className="btn btn-primary py-2 mb-4">New Movie</NavLink>}
                    <p>Showing {totalCount} movies in the database.</p>
                    <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
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
