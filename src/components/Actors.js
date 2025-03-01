import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'react-bootstrap/Spinner';
import Actor from './Actor';

// Use environment variables for API configuration
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const YOUR_API_IDENTIFIER = process.env.REACT_APP_AUDIENCE;

export default function Actors() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [actors, setActors] = useState(null); // Initialize with null for loading state
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleAddActorClick = () => {
    navigate('/actors/new');  // Navigate to the new actor form route
  };

  useEffect(() => {
    const fetchActors = async () => {
      try {
        // Get the access token from Auth0
        const token = await getAccessTokenSilently({
          audience: YOUR_API_IDENTIFIER,
          scope: 'get:actors'  // Ensure this scope matches your API requirement
        });

        console.log('Fetching from URL:', `${BASE_API_URL}/actors`); // Debug log

        // Fetch data from the Flask API
        const response = await fetch(`${BASE_API_URL}/actors`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        // Log response details for debugging
        console.log('Response status:', response.status);
        console.log('Content type:', response.headers.get('content-type'));

        // Check if the response is OK, else throw an error
        if (!response.ok) {
          // Try to get more details from the error response
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Verify we're getting JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const textResponse = await response.text();
          console.error('Received non-JSON response:', textResponse.substring(0, 150));
          throw new Error('Expected JSON response but received a different format');
        }

        // Parse the JSON response and update state
        const results = await response.json();
        
        // Check if the response has the expected structure
        if (!results.actors && Array.isArray(results)) {
          // Handle case where API returns an array directly
          setActors(results);
        } else if (results.actors) {
          // Handle case where API returns an object with actors property
          setActors(results.actors);
        } else {
          console.error('Unexpected response format:', results);
          throw new Error('Unexpected response format from API');
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
        setError(error.message);
      }
    };

    // Only fetch if authenticated
    if (isAuthenticated) {
      fetchActors();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <>
      <br />
      {/* Fixed: Changed 'class' to 'className' and removed invalid 'display' prop */}
      <button type="button" className="button btn btn-success" onClick={handleAddActorClick}>
        Add Actor
      </button>
      <div>
        <br />
        {/* Loading spinner */}
        {actors === null && !error && <Spinner animation="border" />}

        {/* Error message with more details */}
        {error && (
          <div className="alert alert-danger">
            <p>Error loading actors: {error}</p>
            <p>Please check your API configuration and try again.</p>
          </div>
        )}

        {/* Actors data */}
        {actors && actors.length > 0 && actors.map((actor) => (
          <Actor key={actor.id} actor={actor} />
        ))}

        {/* Messages for no data */}
        {actors && actors.length === 0 && <p>There are no actors available.</p>}
      </div>
    </>
  );
}