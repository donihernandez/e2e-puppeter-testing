const puppeteer = require('puppeteer')
const expect = require('chai').expect

const moment = require('moment')

describe('Cards test', () => {
	it('should check if only displays 3 cards with consecutive months', async () => {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

			await page.goto('https://vs-prod.airtrfx.com/en-us/flights-from-orlando-to-manchester',
				{ waitUntil: 'networkidle0', timeout: 0 })

		const count = await page.$$eval('div.slick-slide.slick-active', elements => {
			return elements.length
		})
		expect(count).to.equal(3)

		const months = await page.evaluate(() => {
			const cardMonths = document.querySelectorAll('.slick-active .top-section')
			let response = []
			cardMonths.forEach((card) => {
				response.push({ month: card.children[0].innerText, year: card.children[1].innerText })
			})
			return response
		})
		for(let i = 0; i < months.length; i++) {
			if (months[i + 1] !== undefined) {
				const month = moment().month(months[i].month).format('MM')
				const currentDate = `${months[i].year}-${month}`
				const currentParseDate = moment(currentDate).format('YYYY-MM')

				const nextMonth = moment().month(months[i+1].month).format('MM')
				const nextDate = `${months[i+1].year}-${nextMonth}`
				const nextParseDate = moment(nextDate).format('YYYY-MM')

				let check = moment(currentParseDate).isBefore(nextParseDate)
				expect(check).to.equal(true)
			}
		}
		await browser.close()
	});
});
