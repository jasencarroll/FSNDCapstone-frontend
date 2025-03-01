import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';

export default function Movie({ movie }) {
  return (
    <Stack direction="horizontal" gap={3} className="Movie">
      <div className="Content">
        <Link to={'/movies/' + movie.id}>
          {movie.title}
        </Link>
        <p>{movie.release_date}</p>
      </div>
    </Stack>
  );
}
