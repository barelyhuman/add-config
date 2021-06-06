import test from 'ava';
import execa from 'execa';

test('Create Configs', async t => {
	let execResponse;
	execResponse = await execa('./dist/cli.js', ['-p', 'temp']);
	t.is(execResponse.stdout, 'Created Config!');
	execResponse = await execa('./dist/cli.js', ['-p', 'temp', '-t', 'node']);
	t.is(execResponse.stdout, 'Created Config!');
	execResponse = await execa('./dist/cli.js', ['-p', 'temp', '-t', 'react-native']);
	t.is(execResponse.stdout, 'Created Config!');
});

test('Fail on invalid type', async t => {
	try {
		await execa('./dist/cli.js', ['-p', 'temp', '-t', 'sad']);
		t.fail();
	} catch (error) {
		const {stdout} = error;
		t.is(stdout, 'Invalid Type: sad, Accepted types: react, node, react-native');
	}
});

test('Fail creation', async t => {
	try {
		await execa('./dist/cli.js', ['-a', 'temp']);
		t.fail();
	} catch {
		t.pass();
	}
});
