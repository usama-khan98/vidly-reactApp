import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		searchQuery: '',
		selectedGenre: null,
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
		this.setState({
			selectedGenre: genre,
			searchQuery: '',
			currentPage: 1
		});
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1
		});
	};

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
			sortColumn,
			searchQuery
		} = this.state;

		let filtered = allMovies;
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre.id)
			filtered = allMovies.filter((m) => m.genre.id === selectedGenre.id);

		const sorted = _.orderBy(
			filtered,
			[ sortColumn.path ],
			[ sortColumn.order ]
		);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			genres,
			selectedGenre,
			sortColumn,
			searchQuery
		} = this.state;

		if (count === 0) return <p>There are no movies in database.</p>;

		const { totalCount, data: movies } = this.getPageData();

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-3">
						<ListGroup
							items={genres}
							selectedItem={selectedGenre}
							onItemSelect={this.handleGenreSelect}
						/>
					</div>
					<div className="col">
						<Link to="/movies/new" className="btn btn-primary m-2">
							New Movie
						</Link>
						<p>Showing {totalCount} movies in database.</p>
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
							onPageChange={this.handlePageChange}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;
