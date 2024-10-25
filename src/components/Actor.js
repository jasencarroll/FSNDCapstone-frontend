import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo'; // Ensure the correct import path

export default function actor({ actor }) {
  return (
    <Stack direction="horizontal" gap={3} className="actor">
      <div>
        <p>
          <Link to={'/user/' + actor.name}>
            {actor.name}
          </Link>
          &nbsp;&mdash;&nbsp;
        </p>
        <p>{actor.text}</p>
      </div>
    </Stack>
  );
}
