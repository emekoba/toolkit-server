const https = require("https");
require("dotenv").config();

let APIKEY = `Bearer ${process.env.PAYSTACK_APIKEY}`;

function generate() {
	const params = JSON.stringify({
		email: "rjemekoba@email.com",
		amount: 23750000,
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

function verify(ref) {
	const options = {
		hostname: "api.paystack.co",
		port: 443,
		path: `/transaction/verify/${ref}`,
		method: "GET",
		headers: {
			Authorization: APIKEY,
		},
	};

	const req = https
		.request(options, (res) => {
			let data = "";
			res.on("data", (chunk) => (data += chunk));
			res.on("end", () => console.log(JSON.parse(data)));
		})
		.on("error", (error) => console.error(error));

	req.end();
}

module.exports = { generate, verify };
