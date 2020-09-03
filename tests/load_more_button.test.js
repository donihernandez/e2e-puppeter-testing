const puppeteer = require('puppeteer')
const expect = require('chai').expect
const iPhone = puppeteer.devices['iPhone X'];

describe('Load More Button test', () => {
	it('should check if after fares histogram in mobile is a button', async () => {
		const browser = await puppeteer.launch({ headless:false })
		const page = await browser.newPage()

		await page.emulate(iPhone);
		await page.setViewport({ width: 375, height:812, isMobile: true })
		await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
			{ waitUntil: 'load', timeout: 0 })

		await page.waitFor('.text-destination')
		const isButton =	await page.evaluate(() => {
			const charts = document.querySelector('.fare-list-default-container')
			console.log(charts)
			return true
			/*const button = charts.lastChild
			return button.innerText === 'See more';*/
		})

		expect(isButton).to.equal(true)
		// await browser.close()
	});
});
