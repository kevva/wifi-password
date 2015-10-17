import test from 'ava';
import fn from './';

test(async t => {
	t.plan(1);
	t.ok(await fn());
});
