const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Heading order test', () => {
	it('should check if heading shows before select', async () => {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'load', timeout: 0 })
		await page.waitFor('h2', { timeout: 0 })
		const isFirst = await page.evaluate(() => {
			const elements = document.querySelector('.fare-monthly--histogram').children[0].children
			for (let i = 0; i < elements.length; i++) {
				if (elements[i].innerText === 'Book your Orlando to Manchester flight within the next 90 days' && i < elements.length) {
					return true
				}
			}
			return false
		})

		expect(isFirst).to.be.a('boolean').to.equal(true)

		await browser.close()
	});
});
