const express = require("express");
const Fuse = require("fuse.js");
const app = express();
const { generate, verify } = require("./bloc");
var http = require("http");
var axios = require("axios").default;
var FormData = require("form-data");

const port = 1300;

function getOptions() {
	return {
		headers: {
			"x-api-key": `234325`,
			// 'Content-Type': 'application/x-www-form-urlencoded',
			"client-id": `NOORTKL-239-AKN`,
		},
	};
}

app.get("/generate", async (req, res) => {
	generate();
});

app.get("/verify/:ref", async (req, res) => {
	verify(req.params.ref);
});

async function bruh() {
	const bruh = http.get(
		`http://noortakafulonline.com/noor_takaful_service/api/states`,
		getOptions(),
		(res) => {
			let data = [];
			return res.on("data", (chunk) => data.push(chunk));
		}
	);

	bruh.on("end", () => {
		console.log("Response ended: ");
		const users = JSON.parse(Buffer.concat(data).toString());
		console.log(users);

		return users;
	});
}

function fuse() {
	let list = [
		{
			insurance_type_id: "1",
			type: "Motor 3rd Party",
			insurance_type_code: "T",
		},
		{
			insurance_type_id: "2",
			type: "Comprehensive",
			insurance_type_code: "C",
		},
	];

	const options = {
		// includeScore: true,
		keys: ["type"],
	};

	const fuse = new Fuse(list, options);
	console.log(fuse.search("comprehensive"));
}

function form() {
	input = {
		email: "rjemekoba@etapinsure.com",
		state_code: "LA",
		number_plate: "AAFRD8FB",
		engine_no: "WDDUG8CB1FA32685",
		chassis_no: "WDDUG8CPOIA32685",
		engine_capacity: 3.1,
		insured_name: "Russell Russell",
		address: "Abuja Nigeria",
		year_of_make: "2015",
		sum_covered: 50000000,
		vehicle_color_id: "2",
		vehicle_category_id: "1",
		insurance_type_code: "C",
		insurance_policy_id: "1",
		rate: 200,
		transaction_id: "xil7hqfx0i",
		vehicle_purpose_id: "1",
		insurance_type_id: "2",
		vehicle_make_id: "1",
		vehicle_model_id: "1",
	};

	const formData = new FormData();
	Object.keys(input).map((e) => {
		formData.append(e, input[e]);
	});
	// formData.append("vehicle_make_id", 1);

	axios
		.post(
			"http://noortakafulonline.com/noor_takaful_service/api/generate_vehicle_certificate_external",
			formData,
			getOptions()
		)
		.then((res) => {
			console.log(res.data);
		});

	// const req = http
	// 	.request(
	// 		{
	// 			...getOptions(),
	// 			method: "POST",
	// 			hostname: "http://noortakafulonline.com/noor_takaful_service/api",
	// 			path: "/vehicle_models",
	// 		},
	// 		(res) => {
	// 			let data = "";

	// 			res.on("data", (chunk) => {
	// 				data += chunk;
	// 			});

	// 			// Ending the response
	// 			res.on("end", () => {
	// 				console.log("Body:", JSON.parse(data));
	// 			});
	// 		}
	// 	)
	// 	.on("error", (err) => {
	// 		console.log("Error: ", err);
	// 	})
	// 	.end();

	// http.request({ ...getOptions(), method: "POST" }, function (res) {
	// 	res.setEncoding("utf8");
	// 	res.on("data", function (chunk) {
	// 		console.log("BODY: " + chunk);
	// 	});
	// 	res.on("error", {});

	// 	req.write(post_data);
	// 	req.end();
	// });
}

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	generate();
	// form();
	// fuse();
});
