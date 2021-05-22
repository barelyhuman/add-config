import test from 'ava';
import execa from 'execa';

test('Create React Config', async t => {
	const {stdout} = await execa('./dist/cli.js', ['-p', 'temp']);
	t.is(stdout, 'Created Config!');
});

test('Create Node Config', async t => {
	const {stdout} = await execa('./dist/cli.js', ['-p', 'temp', '-t', 'node']);
	t.is(stdout, 'Created Config!');
});

test('Fail on invalid type', async t => {
	try {
		await execa('./dist/cli.js', ['-p', 'temp', '-t', 'sad']);
		t.fail();
	} catch (error) {
		const {stdout} = error;
		t.is(stdout, 'Invalid Type: sad, Accepted types: react, node');
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
