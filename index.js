const express = require("express");
const app = express();
const https = require("https");

const port = 1300;
let APIKEY = "Bearer sk_test_3e1985b417a1687392580aa3580f6da0ceb7cc77";

function generate() {
	const params = JSON.stringify({
		email: "customer@email.com",
		amount: "20000",
	});

	const options = {
		hostname: "api.paystack.co",
		port: 443,
		path: "/transaction/initialize",
		method: "POST",
		headers: {
			Authorization: APIKEY,
			"Content-Type": "application/json",
		},
	};

	const req = https
		.request(options, (res) => {
			let data = "";
			res.on("data", (chunk) => (data += chunk));
			res.on("end", () => console.log(JSON.parse(data)));
		})
		.on("error", (error) => console.error(error));

	req.write(params);
	req.end();
}

app.get("/generate", async (req, res) => {
	generate();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	generate();
});
