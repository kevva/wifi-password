import test from 'ava';
import fn from './';

test(async t => {
	t.plan(1);

	const password = await fn();
	t.ok(password);
});
