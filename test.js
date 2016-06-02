import test from 'ava';
import m from './';

test(async t => {
	t.truthy(await m());
});
