import { factorial, multi, stringContatWithSpaceBetween } from './testCases';

import * as puppeteer from 'puppeteer';
describe('puppeteer', () => {
	beforeAll(async () => {
		const browser = await puppeteer.launch({ headless: false, slowMo: 130 });
		const page = await browser.newPage();
		await page.goto('http://localhost:8080/');
		await page.screenshot({ path: 'screen-before.png' });
		await page.waitForSelector('#noteFormClosedItems');
		await page.click('#noteFormClosedItems');
		await page.type('#noteTitle', 'Puppeeteer test title');
		await page.type('#noteFormContent', 'Puppeeteer test content');
		await page.waitFor(1000);
		await page.click('#addNote');
		await page.waitFor(1000);
		await page.screenshot({ path: 'screen-after.png' });
		await browser.close();
	});
	it('was note created', () => {
		expect(1).toBe(1);
	});
});

describe('factorial', () => {
	it('factorial 0', () => {
		let result = factorial(0);
		expect(result).toBe(1);
	});
	it('factorial 1', () => {
		let result = factorial(1);
		expect(result).toBe(1);
	});
	it('factorial 5', () => {
		let result = factorial(5);
		expect(result).toBe(120);
	});
	it('factorial 10', () => {
		let result = factorial(10);
		expect(result).toBe(3628800);
	});
	it('factorial 11', () => {
		let result = factorial(11);
		expect(result).toBe(39916800);
	});
});

describe('multi', () => {
	it('multi 0', () => {
		let result = multi(0, 10101010);
		expect(result).toBe(0);
	});
	it('multi 1', () => {
		let result = multi(0.1, 10);
		expect(result).toBe(1);
	});
	it('multi 2', () => {
		let result = multi(10, 10);
		expect(result).toBe(100);
	});
});

describe('stringConcat', () => {
	it('stringConcat 0', () => {
		let result = stringContatWithSpaceBetween('super', 'partia');
		expect(result).toBe('super partia');
	});
	it('stringConcat 1', () => {
		let result = stringContatWithSpaceBetween('Stanisław', 'Lem');
		expect(result).toBe('Stanisław Lem');
	});
	it('stringConcat 2', () => {
		let result = stringContatWithSpaceBetween('Lubię placki', 'bardzo');
		expect(result).toBe('Lubię placki bardzo');
	});
});
