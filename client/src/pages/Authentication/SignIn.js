import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



const SignIn = () => {

	var navigate = useNavigate();

	const [data, setData] = useState({
		hotelName: "",
		email: "",
		password: "",
		cpassword: "",
		ownerPassword: "",
		cownerPassword: ""
	});
	const [message, setMessage] = useState("");

	function handleData(e) {
		var name = e.target.name;
		var value = e.target.value;
		setData({ ...data, [name]: value });
	}

	function sendData() {
		fetch("http://localhost:3007/api/authentication/signin", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "ok") {
					navigate("/login")
					return;
				} else {
					setMessage(res.message);
				}

			})
			.catch((e) => {
				console.log(e);
			})
	}

	return (
		<>
			<Link to="/" className="my-link my-hover-green fs-1 m-3">&larr;</Link>
			<div className="container-sm bg-light border border-secondary rounded position-absolute top-50 start-50 translate-middle">
				<div className="text-center fs-3">Sign in</div>

				<div className="text-danger">{message}</div>
				<label className="form-label">Hotel Name</label>
				<input className="form-control" placeholder="Name" type="text" name="hotelName"
					onChange={handleData}></input>
				<label className="form-label">Email</label>
				<input className="form-control" placeholder="Email" type="email" name="email"
					onChange={handleData}></input>

				<label className="form-label">Password</label>
				<input className="form-control" placeholder="Password" type="password" name="password"
					onChange={handleData}></input>

				<label className="form-label">Confirm Password</label>
				<input className="form-control" placeholder="confirm password" type="password" name="cpassword"
					onChange={handleData}></input>

				<label className="form-label">Owner Password &#40; this will be your admin password &#41;</label>
				<input className="form-control" placeholder="Owner password" type="password" name="ownerPassword"
					onChange={handleData}></input>
				<label className="form-label">Confirm Owner Password</label>
				<input className="form-control" placeholder="Confirm Owner password" type="password" name="cownerPassword"
					onChange={handleData}></input>

				<div className="d-flex p-2 justify-content-between align-items-center">
					<button className="btn btn-primary m-2"
						onClick={sendData}>Log in</button>
					<Link to="/login">alrady have an account?</Link>
				</div>

			</div>
		</>
	);
}

export default SignIn;