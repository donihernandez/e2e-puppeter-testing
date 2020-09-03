const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Histogram data set test', () => {
	it('should check if there are two filters and match with context', async () => {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'networkidle0', timeout: 0 })
		await page.waitFor('h2', { timeout: 0 })
		let origin = ''
		let destination = ''

		const tooltip = await page.evaluate(() => {
			const selects = document.querySelectorAll('select.select-destination')
			let values = []
			selects.forEach((select) => {
				values.push(select.value)
			})
			origin = values[0]
			destination = values[1]
			return document.querySelector('.title-tooltip-deal').innerText
		})
		const fare = `${origin} - ${destination}`
		expect(fare).to.equal(tooltip)

		await browser.close()
	});
});
