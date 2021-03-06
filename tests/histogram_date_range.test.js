const puppeteer = require('puppeteer')
const expect = require('chai').expect

const moment = require('moment')

describe('Histogram Date Range test', () => {
	it('should check if the date range match with current histogram card info', async () => {
		const browser = await puppeteer.launch({ headless: false, devtools: true })
		const page = await browser.newPage()

			await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
				{ waitUntil: 'networkidle0', timeout: 0 })

		const response = await page.waitForResponse(res => {
			if (res.url() === 'https://openair-california.airtrfx.com/airfare-sputnik-service/v3/vs/fares/histogram'
				&& res.request().method() === 'POST') {
				return res
			}
		}, { timeout: 0})

		const data = await response.request().postData()

		const parsedData = JSON.parse(data)

		const date = await page.evaluate(() => {
			const data = document.querySelector('div.slick-slide.slick-active .top-section')
			console.log({ month: data.children[0].innerText, year: data.children[1].innerText })
			return { month: data.children[0].innerText, year: data.children[1].innerText }
		})

		const month = moment().month(date.month).format('MM')
		const currentDate = `${date.year}-${month}`
		const currentParseDate = moment(currentDate).format('YYYY-MM-DD')

		const checkRange = moment(currentParseDate).isSameOrBefore(parsedData.dateRange.start)
		expect(checkRange).to.equal(true)

		await browser.close()
	});
});
