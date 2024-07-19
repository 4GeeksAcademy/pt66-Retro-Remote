import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import TopRated from "../components/TopRated.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (	
				<TopRated />
			);
}; 