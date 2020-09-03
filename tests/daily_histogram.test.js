const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Daily Histogram test', () => {
	it('should check if selected month is equal to histogram month', async () => {
		const browser = await puppeteer.launch({ headless:false })
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'load', timeout: 0 })

		await page.waitFor('.chart-bar', { timeout: 0 })
		const currentMonth = await page.$eval('.slick-active .top-section span', element => element.innerText)
		const histogramMonth = await page.$eval('.vertical-line', element => element.innerText)

		let check = false
		if (currentMonth.toLowerCase().includes(histogramMonth.toLowerCase())) {
			check = true
		}

		expect(check).to.equal(true)

		await browser.close()
	});
});
