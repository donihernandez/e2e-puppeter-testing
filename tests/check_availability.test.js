const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Card Check Availability test', () => {
	it('should check if a card with no data shows a "check availability" button', async () => {
		const browser = await puppeteer.launch({ headless: false })
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'networkidle0', timeout: 0 })

		await page.waitFor('div.slick-slide')
		const checkAvailability = await page.$eval('div.slick-slide .is-empty-fare .link-check-availability a', element => element.innerText)

		expect(checkAvailability).to.equal('Check availability')

		await browser.close()
	});
});
