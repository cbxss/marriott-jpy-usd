// ==UserScript==
// @name         Yen to USD Converter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Convert yen prices to USD on the fly
// @author       cbxss
// @match        https://www.marriott.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the rough conversion rate (can be updated as needed)
    const YEN_TO_USD_RATE = 0.007; // Example: 1 Yen = 0.007 USD

    // Helper function to format the price as USD
    function formatUSD(amount) {
        return `$${amount.toFixed(2)}`; // Formats the number to two decimal places with a dollar sign
    }

    // Function to convert yen to USD and display it next to the yen price
    function convertYenToUSD() {
        // Get all elements with the class 'm-price'
        const priceElements = document.querySelectorAll('.m-price');
        
        priceElements.forEach(element => {
            // Extract the yen value from the element's text content
            const yenText = element.textContent.replace(/[^\d]/g, ''); // Remove non-numeric characters
            const yenValue = parseFloat(yenText);
            
            if (!isNaN(yenValue)) {
                // Convert yen to USD
                const usdValue = yenValue * YEN_TO_USD_RATE;
                
                // Check if the USD value is already displayed to avoid duplication
                if (!element.classList.contains('usd-converted')) {
                    // Create a new span element to display the USD price
                    const usdElement = document.createElement('span');
                    usdElement.textContent = ` (${formatUSD(usdValue)})`;
                    usdElement.style.color = 'green'; // Optional: Style the USD amount
                    usdElement.style.marginLeft = '5px';
                    
                    // Mark the element as converted to avoid duplication
                    element.classList.add('usd-converted');
                    
                    // Insert the USD price after the yen price
                    element.appendChild(usdElement);
                }
            }
        });
    }

    // Run the conversion function after the page loads
    window.addEventListener('load', () => {
        convertYenToUSD();

        // Optionally, observe the page for dynamically loaded content
        const observer = new MutationObserver(() => {
            convertYenToUSD();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
