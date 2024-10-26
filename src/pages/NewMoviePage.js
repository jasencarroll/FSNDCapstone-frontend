import React from 'react';
import NewMovie from '../components/NewMovie'; // Assuming the form is in the components folder
import Body from '../components/Body';

export default function NewMoviePage() {
  return (
    <Body sidebar>
      <h1>Add a New Movie</h1>
      <NewMovie />  
    </Body>
  );
}
