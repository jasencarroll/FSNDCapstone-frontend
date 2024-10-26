import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const EditActorForm = () => {
  const { id } = useParams();  // Get the actor ID from the URL parameters
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [loading, setLoading] = useState(true);  // Loading state for fetching data
  const [error, setError] = useState(null);  // Error state for API issues
  const { getAccessTokenSilently } = useAuth0();  // Auth0 for authorization
  const navigate = useNavigate();  // For navigating back after form submission

  useEffect(() => {
    // Fetch the existing actor data when the component mounts
    const fetchActor = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUDIENCE,
          scope: 'get:actors'  // Ensure this matches the API scope
        });

        const response = await fetch(`${BASE_API_URL}/actors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setFormData({
          name: result.actor.name,
          age: result.actor.age,
          gender: result.actor.gender
        });
      } catch (error) {
        console.error('Error fetching actor:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [getAccessTokenSilently, id]);

  // Handle input changes to update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission for updating actor data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: 'update:actors'  // Ensure this matches the API scope for updates
      });

      const response = await fetch(`${BASE_API_URL}/actors/${id}`, {
        method: 'PATCH',  // Update actor using PUT or PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Actor updated successfully');
      navigate('/actors');  // Navigate back to the actors list after successful update

    } catch (error) {
      console.error('Error updating actor:', error);
    }
  };

  if (loading) {
    return <p>Loading actor data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Name Input */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Age Input */}
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      {/* Gender Select */}
      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit">Update Actor</button>
    </form>
  );
};

export default EditActorForm;
