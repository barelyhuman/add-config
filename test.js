const test = require("ava");
const execa = require("execa");

test("Create Configs", async (t) => {
	let execResponse;
	execResponse = await execa("./dist/cli.js", ["-p", "temp/react/"]);
	t.is(execResponse.stdout, "Created Config!");
	execResponse = await execa("./dist/cli.js", [
		"-p",
		"temp/node/",
		"-t",
		"node",
	]);
	t.is(execResponse.stdout, "Created Config!");
	execResponse = await execa("./dist/cli.js", [
		"-p",
		"temp/react-native/",
		"-t",
		"react-native",
	]);
	t.regex(execResponse.stdout, /Checking for dependencies|Created Config/);
});
