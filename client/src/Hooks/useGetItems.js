import { useEffect, useState } from "react";
import cookie from "js-cookie";

var useGetItems = () => {
	var [items, setItems] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/item", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			}
		})
			.then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setItems(res.data);
				}

			})
			.catch(e => {
				console.log(e);
			})
	}, []);
	
	return [items, setItems];
}

export default useGetItems;