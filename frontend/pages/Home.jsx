import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import TopRated from "../components/TopRated.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (	
				<TopRated />
			);
}; 