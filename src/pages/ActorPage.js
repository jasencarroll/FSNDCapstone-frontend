import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Body from '../components/Body';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const YOUR_API_IDENTIFIER = process.env.REACT_APP_AUDIENCE;

export default function ActorPage() {
  const { id } = useParams();  // Use id from the URL parameters
  const [actorData, setActorData] = useState(null);  // Actor data state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchActor = async () => {
      try {
        // Get the access token from Auth0
        const token = await getAccessTokenSilently({
          audience: YOUR_API_IDENTIFIER,
          scope: 'get:actors'  // Ensure this scope matches your API requirement
        });

        // Fetch data from the Flask API
        const response = await fetch(`${BASE_API_URL}/actors/${id}`, {
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
        setActorData(result.actor);  // Assuming Flask returns the actor as 'actor'
      } catch (error) {
        console.error('Error fetching actor:', error);
        setError(error.message);
      } finally {
        setLoading(false);  // Stop the loading state
      }
    };

    fetchActor();
  }, [getAccessTokenSilently, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Ensure actorData is available before rendering its properties
  if (!actorData) {
    return <p>No actor data available.</p>;
  }

  return (
    <Body sidebar>
      <h2>{actorData.name || 'No Name Available'}</h2>
      <p>{actorData.bio || 'No biography available.'}</p>
      <p>Date of Birth: {actorData.dob || 'Unknown'}</p>
      <p>Number of Movies: {actorData.movie_count || 'Unknown'}</p>
      <button type="button" className="btn btn-warning button_left">Edit</button>
      <button type="button" className="btn btn-danger button_left">Delete</button>
    </Body>
  );
}
