const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Daily Histogram test', () => {
	it('should check if bars count are equal to the month fares', async () => {
		const browser = await puppeteer.launch({ headless:false })
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'load', timeout: 0 })

		const response = await page.waitForResponse(res => {
			if (res.url() === 'https://openair-california.airtrfx.com/airfare-sputnik-service/v3/vs/fares/histogram'
				&& res.request().method() === 'POST') {
				return res
			}
		}, { timeout: 0})

		console.log(response)

		const data = await response.request().postData()

		const parsedData = JSON.parse(data)

		await page.evaluate(() => {
			const bars = document.querySelectorAll('.chart-bar')
			console.log(bars)
		})

		// await browser.close()
	});
});
