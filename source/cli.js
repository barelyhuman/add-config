#!/usr/bin/env node

import {promises as fs} from 'node:fs';
import path from 'node:path';
import meow from 'meow';
import mkdirp from 'mkdirp';
import reactConfigGenerator from './templates/react/config.js';
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
	const invalidFlags = [];
	for (const flag of Object.keys(cli.flags)) {
		if (!acceptedFlags.has(flag)) {
			invalidFlags.push(flag);
		}
	}

	if (invalidFlags.length > 0) {
		console.log('Invalid Option:', invalidFlags.join(','));
		return cli.showHelp();
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
			return createReactConfig(dirPath);
		}

		default: {
			console.error('Couldn\'t create config...');
			process.exit(1);
		}
	}
}

async function createReactConfig(dirPath) {
	const config = reactConfigGenerator();
	const filePath = path.join(dirPath, 'config.js');
	await fs.writeFile(filePath, String(config));
	console.log('Created Config!');
}

main();
