const test = require('ava');
const VolatileMap = require('./dist/index').default;

/**
 * Simple utility timeout method that returns a promise.
 */
const timeoutPromise = function (cb, time) {
	return new Promise(resolve => {
		setTimeout(() => {
			cb();
			resolve();
		}, time);
	});
};

test('Should delete properties after TTL', async t => {
	const m = new VolatileMap(300);

	m.set('a', 1);
	m.set('b', 2);

	t.is(m.get('a'), 1);
	t.is(m.get('b'), 2);

	await timeoutPromise(() => {
		t.is(m.get('a'), undefined);
		t.is(m.get('b'), undefined);
	}, 500);
});

test('Should allow for custom TTL', async t => {
	const m = new VolatileMap(300);

	m.set('a', 1);
	m.set('b', 2, 600);

	t.is(m.get('a'), 1);
	t.is(m.get('b'), 2);

	await timeoutPromise(() => {
		t.is(m.get('a'), undefined);
		t.is(m.get('b'), 2);
	}, 500);
	await timeoutPromise(() => {
		t.is(m.get('a'), undefined);
		t.is(m.get('b'), undefined);
	}, 300);
});

test('Should reset TTL after a non expired value is set', async t => {
	const m = new VolatileMap(300);

	m.set('a', 1);

	t.is(m.get('a'), 1);

	await timeoutPromise(() => {
		t.is(m.get('a'), 1);
		m.set('a', 1);
	}, 200);
	await timeoutPromise(() => {
		t.is(m.get('a'), 1);
	}, 200);
	await timeoutPromise(() => {
		t.is(m.get('a'), undefined);
	}, 200);
});

test('Should delete timer after deleting a value', async t => {
	const m = new VolatileMap();

	m.set('a', 1);
	m.delete('a');
	t.is(m.get('a'), undefined);

	await timeoutPromise(() => {
		t.is(m.get('a'), undefined);
	}, 400);
});
