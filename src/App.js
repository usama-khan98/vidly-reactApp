import './App.css';
import Movies from './components/movies';
import NavBar from './components/navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notfound';
import React from 'react';
import MoviesForm from './components/moviesForm';

function App() {
	return (
		<React.Fragment>
			<NavBar />
			<main className="container">
				<Switch>
					<Route path="/movies/:id" component={MoviesForm} />
					<Route path="/movies" component={Movies} />
					<Route path="/customers" component={Customers} />
					<Route path="/rentals" component={Rentals} />
					<Route path="/notfound" component={NotFound} />
					<Redirect exact from="/" to="/movies" />
					<Redirect to="/notfound" />
				</Switch>
			</main>
		</React.Fragment>
	);
}

export default App;
