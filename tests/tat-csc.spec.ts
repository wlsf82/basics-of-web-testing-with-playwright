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

  test('errors out when required fields are missing', async ({ page }) => {
    // Act
    await page.getByRole('button', { name: 'Send' }).click()

    // Assert
    const errorMessage = await page.locator('.error')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toHaveText('Validate the required fields!')
  })

  test('errors out when submitting the form filling mandatory fields but with invalid email', async ({ page }) => {
    // Act
    await page.getByLabel('First name').fill('John')
    await page.getByLabel('Last name').fill('Doe')
    await page.getByLabel('Email').fill('invalid-email')
    await page.locator('textarea').fill('I would like to know more about your services.')
    await page.getByRole('button', { name: 'Send' }).click()

    // Assert
    const errorMessage = await page.locator('.error')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toHaveText('Validate the required fields!')
  })
})
