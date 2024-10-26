import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo'; // Ensure the correct import path

export default function Movie({ movie }) {
  return (
    <Stack direction="horizontal" gap={3} className="Movie">
      <div class="Content">
        <Link to={'/movie/' + movie.id}>
          {movie.title}
        </Link>
        &nbsp;&mdash;&nbsp;
        <p>{movie.release_date}</p>
      </div>
    </Stack>
  );
}
