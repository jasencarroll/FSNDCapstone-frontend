import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo'; // Ensure the correct import path

export default function Actor({ actor }) {  // Updated component name to follow React conventions
  return (
    <Stack direction="horizontal" gap={3} className="actor">
      <div className="Content"> {/* Updated to className */}
        <Link to={'/actors/' + actor.id}>
          {actor.name}
        </Link>
        <p>Age: {actor.age}</p>
        <p>Gender: {actor.gender}</p> {/* Display actor's gender */}
      </div>
    </Stack>
  );
}
