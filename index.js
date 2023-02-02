const express = require("express");
const Fuse = require("fuse.js");
const app = express();
const { generate, verify } = require("./bloc");
var http = require("http");

const port = 1300;

app.get("/generate", async (req, res) => {
	generate();
});

app.get("/verify/:ref", async (req, res) => {
	verify(req.params.ref);
});

async function bruh() {
	function getOptions() {
		return {
			headers: {
				"x-api-key": `234325`,
				// 'Content-Type': 'application/x-www-form-urlencoded',
				"client-id": `NOORTKL-239-AKN`,
			},
		};
	}

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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	generate();

	// fuse();
});
