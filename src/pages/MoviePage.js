import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Body from '../components/Body';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const YOUR_API_IDENTIFIER = process.env.REACT_APP_AUDIENCE;

export default function MoviePage() {
  const { id } = useParams();  // Get the movie ID from the URL parameters
  const [movieData, setMovieData] = useState(null);  // Movie data state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();  // Initialize useNavigate for programmatic navigation

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',  // "Wed"
      year: 'numeric',   // "2020"
      month: 'short',    // "Jul"
      day: 'numeric'     // "15"
    });
  };

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

  // Function to handle the Edit button click
  const handleEditMovieClick = () => {
    navigate(`/movies/${id}/edit`);  // Programmatically navigate to the edit page
  };

  // Function to handle the Delete button click
  const handleDeleteMovieClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

    if (!confirmDelete) {
      return;  // If the user cancels, do nothing
    }

    try {
      const token = await getAccessTokenSilently({
        audience: YOUR_API_IDENTIFIER,
        scope: 'delete:movies'  // Ensure this matches your API's scope for deletion
      });

      const response = await fetch(`${BASE_API_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`  // Pass the token in the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // After successful deletion, navigate back to the movies list
      alert('Movie deleted successfully');
      navigate('/movies');

    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete the movie. Please try again.');
    }
  };

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
      <p>Release Date: {formatDate(movieData.release_date) || 'Unknown'}</p>
      <p>{movieData.description || 'No description available.'}</p>
      <button 
        type="button" 
        className="btn btn-warning button_left"
        onClick={handleEditMovieClick}  // Trigger navigation to edit page
      >
        Edit
      </button>
      <button 
        type="button" 
        className="btn btn-danger button_left"
        onClick={handleDeleteMovieClick}  // Trigger delete confirmation and deletion
      >
        Delete
      </button>
    </Body>
  );
}
