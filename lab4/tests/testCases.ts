export const factorial = (n: number): number => {
	if (n === 0) return 1;
	let result = 1;
	for (let i = 1; i <= n; i++) {
		result *= i;
	}

	return result;
};

export const multi = (x: number, y: number): number => {
	return x * y;
};

export const stringContatWithSpaceBetween = (x: string, y: string): string => {
	return `${x} ${y}`;
};
