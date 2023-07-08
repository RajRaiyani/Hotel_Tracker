import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

var useGetTables = () => {
	var [Tables, setTables] = useState([]);

	useEffect(() => {

		fetch("http://localhost:3007/api/v1/home/table", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				if(res.status==="OK"){
					setTables(res.data);			
				}
			})
			.catch(e => {
				console.log(e);
			})
	}, []);

	return [Tables, setTables];
}

export default useGetTables;