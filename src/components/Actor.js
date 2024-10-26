import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo'; // Ensure the correct import path

export default function actor({ actor }) {
  return (
    <Stack direction="horizontal" gap={3} className="actor">
      <div class="Content">
        <Link to={'/actors/' + actor.id}>
          {actor.name}
        </Link>
        <p>{actor.age}</p>
      </div>
    </Stack>
  );
}

