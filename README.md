# Smart Expense Tracker

A simple, responsive expense tracker built with HTML, Tailwind CSS, and vanilla JavaScript. Add income and expenses, view your totals and balance, and remove transactions when needed.

## Features

- Add income using a positive amount and expenses using a negative amount.
- View total income, total expenses, and the current balance.
- See transactions in a scrollable history list.
- Remove individual transactions.
- Save transactions in the browser using `localStorage`, so they remain after refreshing the page.
- Responsive layout for mobile and desktop screens.
- Validate descriptions and amounts before adding transactions.

## Technologies

- HTML
- Tailwind CSS via the browser CDN
- Vanilla JavaScript
- Browser `localStorage`

## Run locally

No build step or package installation is required.

1. Download or clone this repository.
2. Open `index.html` in a browser.

For a more consistent local development experience, open the project folder in Visual Studio Code and use the **Live Server** extension to serve `index.html`.

## Usage

1. Enter a description, such as `Salary` or `Groceries`.
2. Enter a positive amount for income (for example, `500`) or a negative amount for an expense (for example, `-50`).
3. Select **Add Transaction**.
4. Use the **×** button beside a transaction to remove it.

Transactions are stored in the current browser and device. They are not synchronized across browsers or devices.

## Deploy with GitHub Pages

1. Push the project files to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and the `/(root)` folder, then select **Save**.
5. When deployment completes, open the site URL shown in the Pages settings. It usually follows this format:

   `https://<your-github-username>.github.io/<repository-name>/`

The page loads Tailwind CSS from a CDN, so an internet connection is needed for its styling.
