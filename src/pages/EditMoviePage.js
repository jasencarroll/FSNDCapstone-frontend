import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const EditMoviePage = () => {
  const { id } = useParams();  // Get the movie ID from the URL parameters
  const [formData, setFormData] = useState({
    title: '',
    release_date: ''
  });
  const [loading, setLoading] = useState(true);  // Loading state for fetching data
  const [error, setError] = useState(null);  // Error state for API issues
  const { getAccessTokenSilently } = useAuth0();  // Auth0 for authorization
  const navigate = useNavigate();  // For navigating back after form submission

  useEffect(() => {
    // Helper function to format the release date to 'YYYY-MM-DD'
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];  // Format as 'YYYY-MM-DD'
    };

    // Fetch the existing movie data when the component mounts
    const fetchMovie = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUDIENCE,
          scope: 'get:movies'  // Ensure this matches the API scope
        });

        const response = await fetch(`${BASE_API_URL}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        // Format release date before setting it in the state
        const formattedDate = formatDate(result.movie.release_date);

        setFormData({
          title: result.movie.title,
          release_date: formattedDate  // Set the formatted date
        });
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [getAccessTokenSilently, id]);

  // Handle input changes to update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission for updating movie data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: 'update:movies'  // Ensure this matches the API scope for updates
      });

      const response = await fetch(`${BASE_API_URL}/movies/${id}`, {
        method: 'PATCH',  // Update movie using PUT or PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Movie updated successfully');
      navigate('/movies');  // Navigate back to the movies list after successful update

    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  if (loading) {
    return <p>Loading movie data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Title Input */}
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Release Date Input */}
      <div>
        <label>Release Date:</label>
        <input
          type="date"
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Update Movie</button>
    </form>
  );
};

export default EditMoviePage;
