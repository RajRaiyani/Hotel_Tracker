import { Link } from "react-router-dom";

import "./index.css"




const Home = () => {
	return (
		<>
			<div className="fs-1 p-5 text-center text-secondary">
				choose you roll
			</div>
			<div className="d-flex flex-wrap justify-content-around my-5">

				<Link to="/owner" className="my-link">
					<div className="card my-card-hover text-center p-2 m-3" style={{ width: "18rem" }}>
						<img className="card-img-top" src="http://localhost:3007/api/images/3.png" alt="Admin" />
						<div className="card-body">
							<h5 className="card-title">Owner</h5>
							<p className="card-text">if you are owner then click here</p>
						</div>
					</div>
				</Link>

				<Link to="/chef" className="my-link">
					<div className="card my-card-hover text-center p-2 m-3" style={{ width: "18rem" }}>
						<img className="card-img-top" src="http://localhost:3007/api/images/2.png" alt="Admin" />
						<div className="card-body">
							<h5 className="card-title">Chef</h5>
							<p className="card-text">if you are owner then click here</p>
						</div>
					</div>
				</Link>
				<Link to="/waiter" className="my-link">
					<div className="card my-card-hover text-center p-2 m-3" style={{ width: "18rem" }}>
						<img className="card-img-top" src="http://localhost:3007/api/images/1.png" alt="Admin" />
						<div className="card-body">
							<h5 className="card-title">Waiter</h5>
							<p className="card-text">if you are owner then click here</p>
						</div>
					</div>
				</Link>
			</div>
		</>
	)
}

export default Home;