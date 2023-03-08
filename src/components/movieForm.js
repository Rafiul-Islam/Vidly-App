import React from 'react';
import Joi from "joi-browser/dist/joi-browser.min";
import Form from "./common/form";
import {getGenres} from "../services/genreService";
import {getMovie, saveMovie} from "../services/movieService";

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string().label('Id'),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate'),
    }

    populateGenres = async () => {
        const {data} = await getGenres()
        const genres = [...data];
        this.setState({genres})
    }

    populateMovie = async () => {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === 'new') return;

            const {data: movieObj} = await getMovie(movieId);
            const movie = {...movieObj};
            this.setState({data: this.mapToViewModel(movie)});
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.push("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.push("/movies");
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('Title', 'title')}
                    {this.renderSelect('Genre', 'genreId', this.state.genres)}
                    {this.renderInput('Number in Stock', 'numberInStock', 'number')}
                    {this.renderInput('Daily Rental Rate', 'dailyRentalRate', 'number')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;
