import { useParams } from 'react-router-dom';
import Body from '../components/Body';

export default function UserPage() {
  const { username } = useParams();

  return (
    <Body sidebar>
      <h1>{username}</h1>
      <p>TODO</p>
      <button type="button" class="btn btn-warning">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    </Body>
  );
}