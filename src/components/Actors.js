import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'react-bootstrap/Spinner';
import Actor from './Actor';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const YOUR_API_IDENTIFIER = process.env.REACT_APP_AUDIENCE;

export default function Actors() {
  const { getAccessTokenSilently } = useAuth0();
  const [actors, setActors] = useState(null); // Initialize with null for loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        // Get the access token from Auth0
        const token = await getAccessTokenSilently({
          audience: YOUR_API_IDENTIFIER,
          scope: 'get:actors'  // Ensure this scope matches your API requirement
        });

        // Fetch data from the Flask API
        const response = await fetch(`${BASE_API_URL}/actors`, {
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
        setActors(results.actors); // Assuming Flask returns `actors` in the response
      } catch (error) {
        console.error('Error fetching actors:', error);
        setError(error.message);
      }
    };

    fetchActors();
  }, [getAccessTokenSilently]);

  return (
    <>
      {/* Loading spinner */}
      {actors === null && !error && <Spinner animation="border" />}

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Movies data */}
      {actors && actors.length > 0 && actors.map((actor) => (
        <Actor key={actor.id} actor={actor} />
      ))}

      {/* Messages for no data */}
      {actors && actors.length === 0 && <p>There are no actors available.</p>}
    </>
  );
}
