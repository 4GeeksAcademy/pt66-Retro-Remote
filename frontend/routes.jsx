import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import  Home from "./pages/Home";
import FetchInitialData from "./pages/FetchInitialData";
import MovieDetails  from "./components/MovieDetails";
import PersonalQueue from "./pages/PersonalQueue";
import Movie from "./pages/Movie";
import ShowDetails from "./pages/ShowDetails";

export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

          {/* Home Route */}
          <Route path="/home" element={<Home />} />

          {/* Other Routes */}
          <Route path="movie/:id" element={<Movie/>}/>
        <Route path="show/:id" element={<ShowDetails />} />
          <Route path="personal-queue" element={<PersonalQueue />} />
         

          {/* FetchInitialData Component - Only if necessary */}
          <Route path="/fetch-data" element={<FetchInitialData />} />


      </Route>
  )
);
