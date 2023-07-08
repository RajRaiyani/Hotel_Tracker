import Cookies from "js-cookie";

async function addItem(data) {
	let response = false
	await fetch("http://localhost:3007/api/v1/owner/item/add", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"token": Cookies.get("ownerToken")
		},
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => {
			
			if (res.status === "OK") {
				response = res; 
			}

		})
		.catch(e => console.log("error : " + e));
		return response;
}

export default addItem;