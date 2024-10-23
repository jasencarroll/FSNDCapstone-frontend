import Body from '../components/Body';
import LogoutButton from '../components/logout_button';

export default function LoginPage() {
  return (
    <Body sidebar>
      <h1>Logout form</h1>
      <p><LogoutButton></LogoutButton></p>
    </Body>
    
  );
}