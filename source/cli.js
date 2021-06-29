import { promises as fs } from "fs";
import path from "path";
import mri from "mri";
import mkdirp from "mkdirp";
import reactConfigGenerator from "./templates/react/config.js";
import nodeConfigGenerator from "./templates/node/config.js";
import reactNativeConfigGenerator from "./templates/react-native/config.js";
import usageMessage from "./templates/usage.js";
import { depdown } from "depdown";

function parseCli() {
	const argv = process.argv.slice(2);
	const flags = mri(argv, {
		default: {
			path: ".",
			type: "react",
			help: false,
		},
		alias: {
			p: "path",
			t: "type",
			h: "help",
		},
		boolean: ["help"],
		unknown: (arg) => console.log(usageMessage),
	});

	if (flags.help) {
		console.log(usageMessage);
		process.exit(0);
	}

	return flags;
}

function main() {
	const cli = parseCli();
	runCommand(cli);
}

async function runCommand(flags) {
	const dirPath = path.join(flags.path, "config");
	await mkdirp(dirPath);

	switch (flags.type) {
		case "react": {
			await createReactConfig(dirPath);
			break;
		}

		case "node": {
			await createNodeConfig(dirPath);
			break;
		}

		case "react-native": {
			await createReactNativeConfig(dirPath);
			break;
		}

		default: {
			console.error("Couldn't create config...");
			process.exit(1);
		}
	}

	console.log("Created Config!");
}

async function createReactConfig(dirPath) {
	const config = reactConfigGenerator();
	const filePath = path.join(dirPath, "config.js");
	await fs.writeFile(filePath, String(config));
	return true;
}

async function createNodeConfig(dirPath) {
	const config = nodeConfigGenerator();
	const filePath = path.join(dirPath, "config.js");
	await fs.writeFile(filePath, String(config));
	return true;
}

async function createReactNativeConfig(dirPath) {
	const config = reactNativeConfigGenerator();
	const filePath = path.join(dirPath, "config.js");
	await fs.writeFile(filePath, String(config.code));
	return await depdown(config.dependencies, { mode: "direct" });
}

main();
