// ==UserScript==
// @name         Marriott Yen to USD Converter
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Convert JPY prices to USD on marriott.com pages where the currency label is "JPY / NIGHT" or "JPY / Night".
// @author       cbxss
// @match        https://www.marriott.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Rough exchange rate for JPY to USD (update this as needed)
    const JPY_TO_USD_RATE = 0.007; // 1 JPY = 0.007 USD (example rate, update as needed)
    const CONVERSION_MARKER = 'usd-converted'; // Marker to prevent re-conversion

    // Function to format the USD amount
    function formatUSD(amount) {
        return `$${amount.toFixed(2)}`;
    }

    // Function to convert JPY to USD and display it next to the JPY amount
    function convertJPYtoUSD() {
        // Select all elements with the class 'currency-label' that contain 'JPY / NIGHT' or 'JPY / Night'
        const currencyLabels = document.querySelectorAll('.currency-label, .idr-currency-label');
        let isJPYNight = false;

        currencyLabels.forEach(label => {
            const labelText = label.textContent.trim().toUpperCase();
            if (labelText.includes('JPY / NIGHT')) {
                isJPYNight = true;
            }
        });

        // If "JPY / NIGHT" label is not present, don't convert prices
        if (!isJPYNight) return;

        // Select all elements with the classes 'm-price' and 'room-rate'
        const priceElements = document.querySelectorAll('.m-price, .room-rate');

        priceElements.forEach(priceElement => {
            // Skip already converted prices
            if (priceElement.classList.contains(CONVERSION_MARKER)) return;

            const yenText = priceElement.textContent.replace(/[^0-9]/g, ''); // Extract only numbers
            const yenAmount = parseFloat(yenText);

            // If yen amount is valid, proceed
            if (!isNaN(yenAmount)) {
                const usdAmount = yenAmount * JPY_TO_USD_RATE; // Convert to USD
                const usdText = formatUSD(usdAmount);

                // Create a new span element to display the USD amount
                const usdSpan = document.createElement('span');
                usdSpan.textContent = ` (${usdText})`;
                usdSpan.style.color = 'green'; // Set the text color to green
                usdSpan.style.marginLeft = '5px'; // Add some space between the yen and USD amounts

                // Append the USD amount next to the yen price
                priceElement.appendChild(usdSpan);
                
                // Mark this price as converted
                priceElement.classList.add(CONVERSION_MARKER);
            }
        });
    }

    // Run the conversion on page load
    window.addEventListener('load', () => {
        setTimeout(convertJPYtoUSD, 1000); // Wait for 1 second to ensure all content is loaded
    });

    // Debounced version of the convert function (avoids freezing)
    let debounceTimer;
    const debouncedConvertJPYtoUSD = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => convertJPYtoUSD(), 1000); // Wait 1 second before calling the conversion
    };

    // Monitor for DOM changes (for dynamic loading) using MutationObserver
    const observer = new MutationObserver(() => debouncedConvertJPYtoUSD());
    observer.observe(document.body, { childList: true, subtree: true });

})();
