import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo'; // Ensure the correct import path

export default function Movie({ movie }) {
  return (
    <Stack direction="horizontal" gap={3} className="Movie">
      <Image
        src={movie.author.avatar_url + '&s=48'}
        alt={movie.author.username}
        roundedCircle
      />
      <div>
        <p>
          <Link to={'/user/' + movie.author.username}>
            {movie.author.username}
          </Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={movie.timestamp} />:
        </p>
        <p>{movie.text}</p>
      </div>
    </Stack>
  );
}
