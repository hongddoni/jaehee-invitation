export const debounce = (func: () => void, delay: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	return () => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(func, delay);
	};
};
