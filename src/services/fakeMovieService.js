import * as genresAPI from './fakeGenreService';

const movies = [
	{
		id: '5b21ca3eeb7f6fbccd471815',
		title: 'Terminator',
		numberInStock: 6,
		genre: { id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
		dailyRentalRate: 2.5,
		publishData: '2020-01-03T19:04:2.809Z',
		liked: true
	},
	{
		id: '5b21ca3eeb7f6fbccd471816',
		title: 'Die Hard',
		numberInStock: 5,
		genre: { id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
		dailyRentalRate: 2.5
	},
	{
		id: '5b21ca3eeb7f6fbccd471817',
		title: 'Get Out',
		numberInStock: 8,
		genre: { id: '5b21ca3eeb7f6fbccd4718120', name: 'Thriller' },
		dailyRentalRate: 3.5
	},
	{
		id: '5b21ca3eeb7f6fbccd471819',
		title: 'Trip to Italy',
		numberInStock: 8,
		genre: { id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
		dailyRentalRate: 2.5
	},
	{
		id: '5b21ca3eeb7f6fbccd47181a',
		title: 'Airplane',
		numberInStock: 7,
		genre: { id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
		dailyRentalRate: 2.5
	},
	{
		id: '5b21ca3eeb7f6fbccd47181b',
		title: 'Wedding Crashers',
		numberInStock: 10,
		genre: { id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
		dailyRentalRate: 4.5
	},
	{
		id: '5b21ca3eeb7f6fbccd47181e',
		title: 'Gone Girl',
		numberInStock: 10,
		genre: { id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
		dailyRentalRate: 4.5
	},
	{
		id: '5b21ca3eeb7f6fbccd47181f',
		title: 'The Sixth Sense',
		numberInStock: 4,
		genre: { id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
		dailyRentalRate: 3.5
	},
	{
		id: '5b21ca3eeb7f6fbccd471821',
		title: 'The Avengers',
		numberInStock: 7,
		genre: { id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
		dailyRentalRate: 3.5
	}
];

export function getMovies() {
	return movies;
}

export function getMovie(id) {
	return movies.find((m) => m.id === id);
}

export function saveMovie(movie) {
	let movieInDb = movies.find((m) => m.id === movie.id) || {};
	movieInDb.title = movie.title;
	movieInDb.genre = genresAPI.genres.find((g) => g.id === movie.genreId);
	movieInDb.numberInStock = movie.numberInStock;
	movieInDb.dailyRentalRate = movie.dailyRentalRate;

	if (!movieInDb.id) {
		movieInDb.id = Date.now().toString();
		movies.push(movieInDb);
	}

	return movieInDb;
}

export function deleteMovie(id) {
	let movieInDb = movies.find((m) => m.id === id);
	movies.splice(movies.indexOf(movieInDb), 1);
	return movieInDb;
}
