const puppeteer = require('puppeteer')
const expect = require('chai').expect
const iPhone = puppeteer.devices['iPhone 6'];

describe('Mobile View Histogram bars test', () => {
	it('should check if the count of bars in mobile view is 10 ', async () => {
		const browser = await puppeteer.launch({ headless:false })
		const page = await browser.newPage()

		await page.emulate(iPhone);

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'load', timeout: 0 })

		const count = await page.$$eval('.bar-container', elements => elements.length)
		expect(count).to.equal(10)

		await browser.close()
	});
});
