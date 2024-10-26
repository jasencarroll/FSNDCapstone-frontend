import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Body from '../components/Body';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const YOUR_API_IDENTIFIER = process.env.REACT_APP_AUDIENCE;

export default function MoviePage() {
  const { id } = useParams();  // Use id from the URL parameters
  const [movieData, setMovieData] = useState(null);  // Movie data state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Get the access token from Auth0
        const token = await getAccessTokenSilently({
          audience: YOUR_API_IDENTIFIER,
          scope: 'get:movies'  // Ensure this scope matches your API requirement
        });

        // Fetch data from the Flask API
        const response = await fetch(`${BASE_API_URL}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the Authorization header
          }
        });

        // Check if the response is OK, else throw an error
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON response and update state
        const result = await response.json();
        setMovieData(result.movie);  // Assuming Flask returns the movie as 'movie'
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError(error.message);
      } finally {
        setLoading(false);  // Stop the loading state
      }
    };

    fetchMovie();
  }, [getAccessTokenSilently, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Ensure movieData is available before rendering its properties
  if (!movieData) {
    return <p>No movie data available.</p>;
  }

  return (
    <Body sidebar>
      <h1>{movieData.title || 'No Title Available'}</h1>
      <p>{movieData.description || 'No description available.'}</p>
      <p>Directed by: {movieData.director || 'Unknown'}</p>
      <p>Release Date: {movieData.release_date || 'Unknown'}</p>
      <button type="button" className="btn btn-warning button_left">Edit</button>
      <button type="button" className="btn btn-danger  button_left">Delete</button>
    </Body>
  );
}
