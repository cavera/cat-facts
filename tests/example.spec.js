// @ts-check
import { test, expect } from '@playwright/test'

const CAT_IMAGE_PREFIX = 'https://cataas.com'
const LOCAL_HOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')
  // console.log(textContent, imageSrc)
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_IMAGE_PREFIX)).toBeTruthy()
})
