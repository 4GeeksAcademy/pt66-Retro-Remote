import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FetchInitialData from "./FetchInitialData";
import { MovieDetails } from "./components/MovieDetails";
import PersonalQueue from "./pages/PersonalQueue";
import  UserRecommend from "./pages/UserRecommend";

export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Other Routes */}
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="personal-queue" element={<PersonalQueue />} />
          <Route path="user-recommend" element={<UserRecommend />} />

          {/* FetchInitialData Component - Only if necessary */}
          <Route path="/fetch-data" element={<FetchInitialData />} />

      </Route>
  )
);
