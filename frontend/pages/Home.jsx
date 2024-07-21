
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import TopRated from "../components/TopRated.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (	
				<TopRated />
			);
}; 