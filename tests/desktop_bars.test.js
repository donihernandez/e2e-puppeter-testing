const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Desktop View Histogram bars test', () => {
	it('should check if the count of bars in desktop view is 35 ', async () => {
		const browser = await puppeteer.launch({ headless:false })
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'load', timeout: 0 })

		const count = await page.$$eval('.chart-bar', elements => elements.length)
		expect(count).to.equal(35)

		await browser.close()
	});
});
