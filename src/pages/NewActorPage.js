import React from 'react';
import AddActorForm from '../components/AddActorForm';  // Import the AddActorForm component
import Body from '../components/Body';  // Assuming you have a layout component

export default function NewActorPage() {
  return (
    <Body sidebar>
      <h1>Add a New Actor</h1>
      <AddActorForm />
    </Body>
  );
}
