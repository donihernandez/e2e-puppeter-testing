const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Filters test', () => {
	it('should check if there are two filters and match with context', async () => {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		let origin = ''
		let destination = ''

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'networkidle0', timeout: 0 })
		const count = await page.$$eval('select.select-destination', elements => {
			return elements.length
		})
		expect(count).to.equal(2)

		await page.evaluate(() => {
			const selects = document.querySelectorAll('select.select-destination')
			let values = []
			selects.forEach((select) => {
				values.push(select.value)
			})
			origin = values[0]
			destination = values[1]
		})

		const response = await page.waitForResponse(res => {
			if (res.url() === 'https://openair-california.airtrfx.com/airfare-sputnik-service/v3/vs/fares/histogram'
				&& res.request().method() === 'POST') {
				return res
			}
		}, { timeout: 0})

		const data = await response.request().postData()

		const parsedData = JSON.parse(data)

		expect(origin).to.equal(parsedData.origin)
		expect(destination).to.equal(parsedData.destination)

		await browser.close()
	});
});
