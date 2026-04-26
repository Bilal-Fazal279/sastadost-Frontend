# Task: Test SastaDost Search and UI

## Checklist
- [x] Read scratchpad and initialize progress (Done)
- [x] Type "Samsung" into search input (id="main-search-input")
- [x] Click "Find Best Price" button (id="main-search-btn")
- [x] Capture shimmer/skeleton loader screenshot (Done: Button changed to "Searching...")
- [x] Wait 4 seconds for results
- [ ] Capture full-page results screenshot (Failed: Backend connection error)
- [ ] Sort results by "Price: Low to High" (N/A)
- [ ] Capture sorted results screenshot (N/A)
- [ ] Click "View Price History" and capture chart screenshot (N/A)
- [ ] Verify Deal Score badges, price matrix, and CTA buttons (N/A)
- [x] Check for console errors (Done: ERR_CONNECTION_REFUSED to localhost:5000)
- [ ] Final report

### Findings
- The "Searching..." state was observed on the button after clicking "Find Best Price".
- The search failed with a `net::ERR_CONNECTION_REFUSED` error when trying to fetch from `http://localhost:5000/api/search?q=Samsung`.
- A "Connection Error" screen appeared on the UI, suggesting the backend is not running or accessible.
- I cannot proceed with testing product cards, sorting, or price history without the backend.
