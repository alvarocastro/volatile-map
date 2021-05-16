import test from 'ava';
import delay from 'delay';
import VolatileMap from './index.js';

test('Should delete properties after TTL', async t => {
	const m = new VolatileMap(300);

	m.set('a', 1);
	m.set('b', 2);

	t.is(m.get('a'), 1);
	t.is(m.get('b'), 2);

	await delay(500);

	t.is(m.get('a'), undefined);
	t.is(m.get('b'), undefined);
});

test('Should allow for custom TTL', async t => {
	const m = new VolatileMap(300);

	m.set('a', 1);
	m.set('b', 2, 600);

	t.is(m.get('a'), 1);
	t.is(m.get('b'), 2);

	await delay(500);

	t.is(m.get('a'), undefined);
	t.is(m.get('b'), 2);

	await delay(300);

	t.is(m.get('a'), undefined);
	t.is(m.get('b'), undefined);
});

test('Should reset TTL after a non expired value is set', async t => {
	const m = new VolatileMap(300);

	m.set('a', 1);

	t.is(m.get('a'), 1);

	await delay(200);

	t.is(m.get('a'), 1);
	m.set('a', 1);

	await delay(200);

	t.is(m.get('a'), 1);

	await delay(200);

	t.is(m.get('a'), undefined);
});

test('Should delete timer after deleting a value', async t => {
	const m = new VolatileMap();

	m.set('a', 1);
	m.delete('a');
	t.is(m.get('a'), undefined);

	await delay(400);

	t.is(m.get('a'), undefined);
});
