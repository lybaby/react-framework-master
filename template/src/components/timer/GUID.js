export default function () {
	function randomString(list, length) {
		const l = [];
		for (let i = 0; i < length; i += 1) {
			l.push(list[parseInt(Math.random() * list.length, 10)]);
		}
		return l.join('');
	}

	const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	const ids = [
		randomString(chars, 8),
		randomString(chars, 4),
		randomString(chars, 4),
		randomString(chars, 4),
		randomString(chars, 12),
	];
	return ids.join('-');
}
