const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Histogram Endpoint test', () => {
	it('should check if the date histogram endpoint is loading', async () => {
		const browser = await puppeteer.launch({ headless: false, devtools: true })
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'networkidle0', timeout: 0 })

		await page.waitForResponse(res => {
			if (res.url() === 'https://openair-california.airtrfx.com/airfare-sputnik-service/v3/vs/fares/histogram'
				&& res.request().method() === 'POST') {
				return res
			}
		}, { timeout: 0})

		await browser.close()
	});
});
