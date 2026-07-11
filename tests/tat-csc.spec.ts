import { test, expect } from '@playwright/test'

test.describe('TAT CSC form', () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('/index.html')
  })

  test('successfully submits the form', async ({ page }) => {
    // Act
    await page.getByLabel('First name').fill('John')
    await page.getByLabel('Last name').fill('Doe')
    await page.getByLabel('Email').fill('john.doe@example.com')
    await page.locator('textarea').fill('I would like to know more about your services.')
    await page.getByRole('button', { name: 'Send' }).click()

    // Assert
    const successMessage = await page.locator('.success')
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toHaveText('Message successfully sent.')
  })
})
