import cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";


const OwnerLogIn = () => {

	var navigate = useNavigate();
	var [data, setData] = useState("");
	var [message,setMessage] = useState("");

	function handleData(e) {
		setData(e.target.value);
	}

	function sendData() {
		fetch("http://localhost:3007/api/v1/authentication/ownerLogIn", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ownerPassword: data, token: cookies.get("token") })
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					cookies.set("ownerToken", res.ownerToken);
					navigate("/owner");
				}else{
					setMessage(res.message);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}

	useEffect(() => {
		if (!cookies.get("token")) {
			navigate("/");
		}
	})

	return (
		<>
			<Link to="/" className="my-link my-hover-green fs-1 m-3">&larr;</Link>
			<div className="container-sm bg-light border border-secondary rounded position-absolute top-50 start-50 translate-middle">
				<div className="text-center fs-3">Owner Log in</div>
				<div className="text-danger">{message}</div>

				<label className="form-label">Owner Password</label>
				<input className="form-control" placeholder="Owner Password" type="password" name="ownerPassword"
					onChange={handleData}></input>

				<div className="d-flex p-2 justify-content-between align-items-center">
					<button className="btn btn-primary m-2"
						onClick={sendData}>Log in</button>
				</div>

			</div>
		</>
	);
}

export default OwnerLogIn;