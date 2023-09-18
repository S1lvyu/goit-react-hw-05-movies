import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Loader from './Loader/Loader';

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
export const App = () => {
  return (
    <div>
      <div className="links-container">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/movies" className="link">
          Movies
        </NavLink>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};
