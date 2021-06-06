#!/usr/bin/env node

import {promises as fs} from 'node:fs';
import path from 'node:path';
import meow from 'meow';
import mkdirp from 'mkdirp';
import reactConfigGenerator from './templates/react/config.js';
import nodeConfigGenerator from './templates/node/config.js';
import reactNativeConfigGenerator from './templates/react-native/config.js';
import usageMessage from './templates/usage.js';

function parseCli() {
	const cli = meow(usageMessage, {
		importMeta: import.meta,
		flags: {
			path: {
				type: 'string',
				alias: 'p',
				default: '.'
			},
			type: {
				type: 'string',
				alias: 't',
				default: 'react'
			}
		}
	});
	return cli;
}

function validateFlags(cli) {
	const acceptedFlags = new Set(['path', 'type']);
	const acceptedTypes = ['react', 'node', 'react-native'];
	const invalidFlags = [];
	for (const flag of Object.keys(cli.flags)) {
		if (!acceptedFlags.has(flag)) {
			invalidFlags.push(flag);
		}
	}

	if (cli.flags && cli.flags.type && !acceptedTypes.includes(cli.flags.type)) {
		console.log(
			`Invalid Type: ${cli.flags.type}, Accepted types: ${acceptedTypes.join(
				', '
			)}`
		);
		return process.exit(1);
	}

	if (invalidFlags.length > 0) {
		console.log('Invalid Option:', invalidFlags.join(','));
		cli.showHelp();
		return process.exit(1);
	}
}

function main() {
	const cli = parseCli();
	validateFlags(cli);
	runCommand(cli.input, cli.flags);
}

async function runCommand(inputs, flags) {
	const dirPath = path.join(flags.path, 'config');
	await mkdirp(dirPath);

	switch (flags.type) {
		case 'react': {
			await createReactConfig(dirPath);
			break;
		}

		case 'node': {
			await createNodeConfig(dirPath);
			break;
		}

		case 'react-native': {
			await createReactNativeConfig(dirPath);
			break;
		}

		default: {
			console.error('Couldn\'t create config...');
			process.exit(1);
		}
	}

	console.log('Created Config!');
}

async function createReactConfig(dirPath) {
	const config = reactConfigGenerator();
	const filePath = path.join(dirPath, 'config.js');
	await fs.writeFile(filePath, String(config));
	return true;
}

async function createNodeConfig(dirPath) {
	const config = nodeConfigGenerator();
	const filePath = path.join(dirPath, 'config.js');
	await fs.writeFile(filePath, String(config));
	return true;
}

async function createReactNativeConfig(dirPath) {
	const config = reactNativeConfigGenerator();
	const filePath = path.join(dirPath, 'config.js');
	await fs.writeFile(filePath, String(config));
	return true;
}

main();
