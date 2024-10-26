import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ActorsPage from './pages/ActorsPage';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/actors" element={<PrivateRoute><ActorsPage /></PrivateRoute>} />
          <Route path="/movies" element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
          <Route path="/logout" element={<PrivateRoute><LogoutPage /></PrivateRoute>} />
          <Route path="/movie/:id" element={<PrivateRoute><MoviePage /></PrivateRoute>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}