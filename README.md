# Yen to USD Converter Marriott

## Description
marriot website always defaults to local currency on new search....
This Tampermonkey script automatically converts Japanese Yen prices on the [Marriott website](https://www.marriott.com/) into US Dollars and displays the converted value next to the yen price.
![image](https://github.com/user-attachments/assets/b0114603-891c-493f-b6e2-c5e93966fc38)
## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. Create a new script and paste the provided JavaScript code into the editor.
3. Save the script and ensure it's enabled.
## How It Works
1. When you visit a page on `https://www.marriott.com/`, the script:
   - Searches for all elements with the class `m-price`.
   - Extracts the yen value and converts it to USD using the predefined exchange rate (`1 JPY = 0.007 USD`).
   - Appends the USD value next to the yen price in green text.
2. The script includes a mutation observer to handle dynamically loaded content, ensuring all prices on the page are converted.
## Configuration
- You can update the conversion rate in the script:
  ```javascript
  const YEN_TO_USD_RATE = 0.007;
  ```
  Adjust this value based on the current exchange rate if needed.
## Example
Original:
```html
<span class="m-price">8,515</span>
```
Converted:
```html
<span class="m-price">8,515 <span style="color: green;">($59.61)</span></span>
```
