import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import {
	getMovies,
	getMovie,
	saveMovie,
	deleteMovie
} from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MoviesForm extends Form {
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
		id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number()
			.required()
			.min(0)
			.max(100)
			.label('Number In Stock'),
		dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
	};

	componentDidMount() {
		const genres = getGenres();
		this.setState({ genres });

		const movieId = this.props.match.params.id;
		if (movieId === 'new') return;

		const movie = getMovie(movieId);
		if (!movie) return this.props.history.replace('/notfound');

		this.setState({ data: this.mapToViewModel(movie) });
	}

	mapToViewModel(movie) {
		return {
			id: movie.id,
			title: movie.title,
			genreId: movie.genreId,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	}

	doSubmit = () => {
		saveMovie(this.state.data);

		this.props.history.push('/movies');
	};

	render() {
		return (
			<div>
				<h1>Movie Form</h1>
				{this.renderInput('title', 'Title')}
				{this.renderSelect('genreId', 'Genre', this.state.genres)}
				{this.renderInput('numberInStock', 'Number In Stock', 'number')}
				{this.renderInput('dailyRentalRate', 'Rate')}
				{this.renderButton('Save')}
			</div>
		);
	}
}

export default MoviesForm;
