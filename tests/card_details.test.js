const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Card details test', () => {
	it('should check if card shows moth, year, fare label, currency and asterisk', async () => {
		const browser = await puppeteer.launch({ headless: false })
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'networkidle0', timeout: 0 })

		const response = await page.evaluate(() => {
			const date = document.querySelector('.histogram-body-container .top-section').children
			const currency = document.querySelector('.histogram-body-container .fare-atom-price-currency')
			const price = document.querySelector('.histogram-body-container .fare-atom-price-total-price')
			const asterisk = document.querySelector('.histogram-body-container .fare-atom-price-disclaimer-indicator')

			for (let i = 0; i < date.length; i++) {
				if (date[i].innerText === ''){
					return false
				}
			}
			if (currency.innerText === '') return false
			if (price.innerText === '') return false
			if (asterisk.innerText === '') return false

			return true
		})

		expect(response).to.equal(true)

		await browser.close()
	});
});
