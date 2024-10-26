import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    release_date: ''
  });

  const { getAccessTokenSilently } = useAuth0();  // Auth0 access token
  const navigate = useNavigate();  // Initialize navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload

    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: 'create:movies'
      });

      const response = await fetch(`${BASE_API_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`  // Include the Auth0 access token
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Movie added successfully:', result);

      // Redirect to the Movies page after successful POST
      navigate('/movies');  // Adjust the path if needed

    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
