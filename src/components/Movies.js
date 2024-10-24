import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Movie from './Movie';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Movies() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(BASE_API_URL + '/api/feed');
      if (response.ok) {
        const results = await response.json();
        setMovies(results.data);
      }
      else {
        setMovies(null);
      }
    })();
  }, []);

  return (
    <>
      {movies === undefined ?
        <Spinner animation="border" />
      :
        <>
          {movies === null ?
            <p>Could not retrieve blog movies.</p>
          :
            <>
              {movies.length === 0 ?
                <p>There are no blog movies.</p>
              :
                movies.map(post => <Movie key={post.id} post={post} />)
              }
            </>
          }
        </>
      }
    </>
  );
}