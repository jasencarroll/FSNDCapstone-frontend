import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo'; // Ensure the correct import path

export default function actor({ actor }) {
  return (
    <Stack direction="horizontal" gap={3} className="actor">
      <Image
        src={actor.author.avatar_url + '&s=48'}
        alt={actor.author.username}
        roundedCircle
      />
      <div>
        <p>
          <Link to={'/user/' + actor.author.username}>
            {actor.author.username}
          </Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={actor.timestamp} />:
        </p>
        <p>{actor.text}</p>
      </div>
    </Stack>
  );
}
