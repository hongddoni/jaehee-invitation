export const throttle = (func: () => void, delay: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	return () => {
		if (!timeout) {
			timeout = setTimeout(() => {
				func();
			}, delay);
		}
	};
};
