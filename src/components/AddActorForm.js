import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';  // Auth0 for authorization
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const AddActorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: ''
  });

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  // Handle input change to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: 'create:actors'
      });

      console.log('Form data:', formData);  // Log the form data to inspect it before sending

      const response = await fetch(`${BASE_API_URL}/actors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)  // Send the form data as JSON
      });

      if (!response.ok) {
        const errorText = await response.text();  // Capture detailed error info
        console.error('Error response status:', response.status);  // Log status code
        console.error('Error response text:', errorText);  // Log response text
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Actor added successfully:', result);

      // Redirect to the /actors page after successful POST
      navigate('/actors');

    } catch (error) {
      console.error('Error adding actor:', error);
    }
  };

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

      <button type="submit">Add Actor</button>
    </form>
  );
};

export default AddActorForm;
