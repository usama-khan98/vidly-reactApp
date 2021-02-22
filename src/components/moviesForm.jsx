import React from 'react';

const MoviesForm = ({ match, history }) => {
	return (
		<div>
			<h1>Movies Form {match.params.id}</h1>
			<button
				className="btn btn-primary m-2"
				onClick={() => history.push('/movies')}
			>
				Save
			</button>
		</div>
	);
};

export default MoviesForm;
