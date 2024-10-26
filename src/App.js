import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ActorsPage from './pages/ActorsPage';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import ActorPage from './pages/ActorPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import PrivateRoute from './components/PrivateRoute';
import NewMoviePage from './pages/NewMoviePage';
import NewActorPage from './pages/NewActorPage';
import EditMoviePage from './pages/EditMoviePage';
import EditActorPage from './pages/EditActorPage';

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/movies" element={<PrivateRoute><MoviesPage /></PrivateRoute>} />
          <Route path="/actors" element={<PrivateRoute><ActorsPage /></PrivateRoute>} />
          <Route path="/logout" element={<PrivateRoute><LogoutPage /></PrivateRoute>} />
          <Route path="/movies/:id" element={<PrivateRoute><MoviePage /></PrivateRoute>} />
          <Route path="/actors/:id" element={<PrivateRoute><ActorPage /></PrivateRoute>} />
          <Route path="/movies/new" element={<PrivateRoute><NewMoviePage /></PrivateRoute>} />
          <Route path="/actors/new" element={<PrivateRoute><NewActorPage /></PrivateRoute>} />
          <Route path="/movies/:id/edit" element={<PrivateRoute><EditMoviePage /></PrivateRoute>} />
          <Route path="/actors/:id/edit" element={<PrivateRoute><EditActorPage /></PrivateRoute>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}