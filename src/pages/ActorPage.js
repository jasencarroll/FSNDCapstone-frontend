import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();  // Initialize useNavigate

  // Function to handle Edit button click
  const handleEditActorClick = () => {
    navigate(`/actors/${id}/edit`);  // Navigate to the actor edit page using actor ID
  };

  // Function to handle Delete button click
  const handleDeleteActorClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this actor?');

    if (!confirmDelete) {
      return;  // If the user cancels, do nothing
    }

    try {
      const token = await getAccessTokenSilently({
        audience: YOUR_API_IDENTIFIER,
        scope: 'delete:actors'  // Ensure this matches your API's scope for deletion
      });

      const response = await fetch(`${BASE_API_URL}/actors/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`  // Pass the token in the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // After successful deletion, navigate back to the actors list
      alert('Actor deleted successfully');
      navigate('/actors');

    } catch (error) {
      console.error('Error deleting actor:', error);
      alert('Failed to delete the actor. Please try again.');
    }
  };

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
      <p>Age: {actorData.age || 'Unknown'}</p>
      <p>Gender: {actorData.gender || 'Unknown'}</p>
      <button 
        type="button" 
        className="btn btn-warning button_left" 
        onClick={handleEditActorClick}  // Edit handler
      >
        Edit
      </button>
      <button 
        type="button" 
        className="btn btn-danger button_left" 
        onClick={handleDeleteActorClick}  // Delete handler
      >
        Delete
      </button>
    </Body>
  );
}
