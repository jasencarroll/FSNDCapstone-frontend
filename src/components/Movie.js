import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo'; // Ensure the correct import path

export default function Movie({ movie }) {
  return (
    <Stack direction="horizontal" gap={3} className="Movie">
      <div>
        <p>
          <Link to={'/movie/' + movie.title}>
            {movie.title}
          </Link>
          &nbsp;&mdash;&nbsp;
        </p>
        <p>{movie.text}</p>
      </div>
    </Stack>
  );
}
