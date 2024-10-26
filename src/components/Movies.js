import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'react-bootstrap/Spinner';
import Movie from './Movie';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const YOUR_API_IDENTIFIER = process.env.REACT_APP_AUDIENCE;

export default function Movies() {
  const { getAccessTokenSilently } = useAuth0();
  const [movies, setMovies] = useState(null); // Initialize with null for loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Get the access token from Auth0
        const token = await getAccessTokenSilently({
          audience: YOUR_API_IDENTIFIER,
          scope: 'get:movies'  // Ensure this scope matches your API requirement
        });

        // Fetch data from the Flask API
        const response = await fetch(`${BASE_API_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Check if the response is OK, else throw an error
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON response and update state
        const results = await response.json();
        setMovies(results.movies); // Assuming Flask returns `movies` in the response
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message);
      }
    };

    fetchMovies();
  }, [getAccessTokenSilently]);

  return (
    <>
      <br></br>
      <button display="block" type="button" class="button btn btn-success">Add Movie</button>
      <div>
        <br></br>
        {/* Loading spinner */}
        {movies === null && !error && <Spinner animation="border" />}

        {/* Error message */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Movies data */}
        {movies && movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}

        {/* Messages for no data */}
        {movies && movies.length === 0 && <p>There are no movies available.</p>}
      </div>
    </>
  );
}
