import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Actor from './Actor';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Actors() {
  const [actors, setActors] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(BASE_API_URL + '/actors');
      if (response.ok) {
        const results = await response.json();
        setActors(results.data);
      }
      else {
        setActors(null);
      }
    })();
  }, []);

  return (
    <>
      {actors === undefined ?
        <Spinner animation="border" />
      :
        <>
          {actors === null ?
            <p>Could not retrieve actors.</p>
          :
            <>
              {actors.length === 0 ?
                <p>There are no actors.</p>
              :
                actors.map(actor => <actor key={actor.id} actor={actor} />)
              }
            </>
          }
        </>
      }
    </>
  );
}