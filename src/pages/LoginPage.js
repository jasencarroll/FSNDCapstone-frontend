import Body from '../components/Body';
import LoginButton from '../components/login_button';

export default function LoginPage() {
  return (
    <Body sidebar>
      <h1>Login form</h1>
      <p><LoginButton></LoginButton></p>
    </Body>
    
  );
}