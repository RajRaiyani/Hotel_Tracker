import Cookies from "js-cookie";

async function addTable(tableName) {
	let response = false
	await fetch("http://localhost:3007/api/v1/owner/table/add", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"token": Cookies.get("ownerToken")
		},
		body: JSON.stringify({ tableName })
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

export default addTable;