import test from 'ava';
import execa from 'execa';

test('Create Config', async t => {
	const {stdout} = await execa('./dist/cli.js', ['-p', 'temp']);
	t.is(stdout, 'Created Config!');
});

test.failing('Fail creation', async t => {
	try {
		await execa('./dist/cli.js', ['-a', 'temp']);
		t.pass();
	} catch {
		t.fail();
	}
});
