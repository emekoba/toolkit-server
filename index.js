const express = require("express");
const app = express();
const { generate, verify } = require("./bloc");

const port = 1300;

app.get("/generate", async (req, res) => {
	generate();
});

app.get("/verify/:ref", async (req, res) => {
	verify(req.params.ref);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
	generate();
});
