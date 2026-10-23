# NORTH & THREAD

A responsive static demo fashion store for a Meta Ads Sales Campaign training practical. The checkout is simulated: no payment gateway, server, order fulfilment, or real customer account is connected.

## Run locally

Open `index.html` in a browser, or serve the project from this folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. The complete flow is Home → Shop → Product → Bag → Checkout → Success. Cart, wishlist, and the latest demo order are saved in browser `localStorage`.

## Publish on GitHub Pages

1. Create a new GitHub repository named **north-and-thread-store**.
2. Open a terminal in this project folder. If the folder is not already a Git repository, run:

```sh
git init
git add .
git commit -m "Initial NORTH & THREAD store"
git branch -M main
git remote add origin REPOSITORY_URL
git push -u origin main
```

Replace `REPOSITORY_URL` with the repository's Git URL, such as `https://github.com/USERNAME/north-and-thread-store.git`. If Git was already initialized or a remote already exists, skip the corresponding command. Subsequent updates use `git add .`, `git commit -m "Your message"`, and `git push`.

3. In the GitHub repository, open **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, then **main** and **/root**, and click **Save**.
4. GitHub will provide a public URL similar to `https://USERNAME.github.io/north-and-thread-store/`.

All local links and assets use relative paths, so the site works from that repository subdirectory.

## Meta Pixel setup

Meta Pixel ID `2570376396769911` is installed in the `<head>` of every HTML page. The no-script image fallback sits immediately inside each `<body>` so the HTML remains valid. [`js/tracking.js`](js/tracking.js) sends the product, cart, checkout, and purchase events through the Pixel initialized by those page snippets. If the Pixel ID changes, update it in all HTML files and in `js/tracking.js`.

The file has beginner-friendly helpers for PageView (every page), ViewContent (product page), AddToCart (add button), InitiateCheckout (checkout page), and Purchase (success page). Event data uses product IDs, values, and `LKR`. Purchase fires once per order in that browser when the success page loads. Test your own Pixel installation with Meta's Test Events tool after adding the ID.

## Demo notes

- The checkout accepts contact and delivery details only; never enter payment credentials.
- No real order is created or sent to a business. The latest order remains only in your browser's local storage.
- The product images and hero were generated specifically for this demo and stored locally as compressed WebP files.
- Prices, product text, and delivery rules are demo data in `js/products.js` and `js/cart.js`.
