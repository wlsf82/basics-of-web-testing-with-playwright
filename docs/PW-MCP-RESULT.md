# Playwright MCP — Session Result

## Prompts

1. Using Playwright's MCP, open the TAT CSC app based on the baseUrl defined in the `@playwright.config.ts` file.
2. Now, fill in the mandatory fields with valid data, submit the form, and assert on the success message.
3. Close the browser.

---

Done. ✅

**What happened:**

- Filled the four mandatory fields with valid data:
  - First name → `Walmyr`
  - Last name → `Filho`
  - Email → `walmyr@example.com`
  - How can we help you? → `I would like to know more about the courses.`
- Clicked **Send**.
- Asserted the success message, which passed:
  - `successVisible: true` — the `.success` element is displayed (`display: block`)
  - `successText: "Message successfully sent."` — exact expected text
  - `firstNameCleared: true` — the form reset, which the app only does after a valid submission

**One useful thing I learned from the app's `script.js` that matters for your automated tests:** the success message is shown by setting inline `style.display = 'block'` and then **hidden after 3000 ms** via `setTimeout`. It is **not** toggled with a CSS class. So in a real Playwright test, prefer a web-first assertion that races the timeout, e.g.:

```ts
await page.getByRole('button', { name: 'Send' }).click()
await expect(page.locator('.success')).toBeVisible()
```

`toBeVisible()` auto-retries and will pass within that 3-second window, so you don't have to worry about the round-trip timing that tripped up the manual `waitFor` here.
