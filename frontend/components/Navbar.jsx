import { Link } from "react-router-dom";
import { Home } from "../pages/Home";

export const Navbar = () => {

	return (
		<header>
			<div className="container">
				<div className="inner-content">
					<div className="brand">
						<Link to="/">MovieList</Link>
					</div>

					<ul className="nav-links">
						<li>
							<Link to="/add" className="btn">Add</Link>
						</li>
						<li>
							<Link to="/watched">Watched</Link>
						</li>
						<li>
							<Link to="/favorites">Favorites</Link>
						</li>
					</ul>
				</div>	
			</div>
		</header>			
	);
};
export default Home;