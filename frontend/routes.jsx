import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FetchInitialData from "./pages/FetchInitialData";
import PersonalQueue from "./pages/PersonalQueue";
import Login from "./pages/Loginform";
import Movie from "./pages/Movie";
import TvShow from "./pages/TvShow";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* FetchInitialData Component - Only if necessary */}
      <Route path="/" element={<FetchInitialData />} />
      
      {/* Home Route */}
      <Route path="/home" element={<Home />} />
      <Route path="home/movie/:id" element={<Movie />} />
      <Route path="home/show/:id" element={<TvShow />} />
      
      {/* Personal Queue Route */}
      <Route path="personal-queue" element={<PersonalQueue />} />
      
      {/* Movie and TV Show Routes */}
      <Route path="movie/:id" element={<Movie />} />
      <Route path="show/:id" element={<TvShow />} />
      
      {/* Login Route */}
      <Route path="/login" element={<Login />} />
    </Route>
  )
);
