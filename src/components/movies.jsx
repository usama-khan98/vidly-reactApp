import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import { filter } from 'lodash';
import _ from 'lodash';
import MoviesTable from './moviesTable';

class Movies extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,
		genres: [],
		sortColumn: { path: 'title', order: 'asc' }
	};

	componentDidMount() {
		const genres = [ { id: '', name: 'All Genres' }, ...getGenres() ];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m.id !== movie.id);
		this.setState({ movies });
	};
	handleLike = (movie) => {
		const movies = [ ...this.state.movies ];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			genres,
			selectedGenre,
			sortColumn
		} = this.state;
		if (count === 0) return <p>There are no movies in database.</p>;

		const filtered =
			selectedGenre && selectedGenre.id
				? allMovies.filter((m) => m.genre.id === selectedGenre.id)
				: allMovies;

		const sorted = _.orderBy(
			filtered,
			[ sortColumn.path ],
			[ sortColumn.order ]
		);

		const movies = paginate(sorted, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {filtered.length} movies in database.</p>
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
						onPageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
