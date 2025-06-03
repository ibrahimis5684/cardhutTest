/*-----------------------buy click to cash out .html-----------------------*/
document.querySelector(".product-buy-btn").addEventListener("click", function () {
    // Get the values
    const title = document.querySelector(".p-title").textContent.trim();
    const price = document.querySelector(".p-price.sell").textContent.trim();
    const style = document.querySelector('input[name="style"]:checked').value;
    const nfc = document.querySelector('input[name="NFC_value"]').value;

    // Store values in localStorage
    localStorage.setItem("Title", title);
    localStorage.setItem("Price", price);
    localStorage.setItem("Style", style);
    localStorage.setItem("NFC", nfc);
});

/*-----------------------------quick logo with and without-----------------------------*/
/*-----------------------------quick nfc yes and no-----------------------------*/
document.addEventListener("DOMContentLoaded", () => { 
  const priceElement = document.querySelector(".p-price.price");
  const sellElement = document.querySelector(".p-price.sell");
  const styleRadios = document.querySelectorAll('input[name="style"]');
  const designRadios = document.querySelectorAll('input[name="design"]');
  const nfcToggle = document.getElementById('nfcToggle');
  const nfcValue = document.getElementById('nfcValue');

  // Pricing configuration
  const basePrice = 1350;
  const baseSell = 600;
  const currencyOptions = {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  function updatePrices() {
    let priceMultiplier = 1;
    let sellMultiplier = 1;

    // Style multiplier
    if (document.querySelector('input[name="style"]:checked')?.value === "Without Quick logo") {
      priceMultiplier += 0.25;
      sellMultiplier += 0.25;
    }

    // NFC multiplier
    if (nfcToggle.checked) {
      priceMultiplier *= 1.20; // 20% increase
      sellMultiplier *= 1.20;
      nfcValue.value = "YES";
    } else {
      nfcValue.value = "NO";
    }

    // Update displays with currency formatting
    priceElement.textContent = (basePrice * priceMultiplier).toLocaleString('en-US', {
      ...currencyOptions,
      currencyDisplay: 'symbol'
    });
    
    sellElement.textContent = (baseSell * sellMultiplier).toLocaleString('en-US', {
      ...currencyOptions,
      currencyDisplay: 'symbol'
    });
  }

  // Event listeners
  styleRadios.forEach(radio => radio.addEventListener("change", updatePrices));
  designRadios.forEach(radio => radio.addEventListener("change", updatePrices));
  nfcToggle.addEventListener("change", updatePrices);

  // Initialize
  updatePrices();
});
/*-----------------------------------------------sub products-----------------------------------------------*/
function changeMainModel(modelSrc, element) {
    const mainModel = document.getElementById('main-model');
    mainModel.src = modelSrc;
  
    // Use const for sub-products collection
    const subProducts = document.querySelectorAll('.sub-product');
  
    // Reset all sub-products to default styling
    subProducts.forEach(el => {
      el.style.borderColor = '#e5e7eb'; // Default border color
      el.style.transform = 'scale(1)';
      el.style.transition = 'transform 0.2s ease'; // Smooth scaling animation
    });
  
    // Apply active styling to clicked element
    element.style.borderColor = '#3b82f6'; // Active border color
    element.style.transform = 'scale(1.1)';
  }
  
  // Initialize first sub-product on load
  document.addEventListener('DOMContentLoaded', () => {
    const subProducts = document.querySelectorAll('.sub-product');
    if (subProducts.length > 0) {
      const firstProduct = subProducts[0];
      const modelSrc = firstProduct.onclick.toString()
        .match(/changeMainModel\('(.*?)',/)[1];
      changeMainModel(modelSrc, firstProduct);
    }
  });