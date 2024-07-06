document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Retrieve form values
    const productPrice = parseFloat(document.getElementById('product-price').value);
    const salesCount = parseInt(document.getElementById('sales-count').value);
    const adCost = parseFloat(document.getElementById('ad-cost').value);
    const platformOrders = parseInt(document.getElementById('platform-orders').value);
    const productCost = parseFloat(document.getElementById('product-cost').value);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Fixed expenses
    const confirmationCost = 4; // $ per sale
    const shippingCost = 6.5; // $ per sale
    const platformOrderFeeRate = 0.2; // $ per platform order
    const codFeeRate = 0.10; // 10% COD fee

    // Calculate total expenses
    const totalProductCost = productCost * salesCount;
    const totalConfirmationCost = confirmationCost * salesCount;
    const totalShippingCost = shippingCost * salesCount;
    const totalPlatformOrderFees = platformOrderFeeRate * platformOrders;
    const totalCodFees = (productPrice * codFeeRate) * salesCount;
    const totalExpenses = totalProductCost + totalConfirmationCost + totalShippingCost + totalPlatformOrderFees + totalCodFees + adCost;

    // Calculate total revenue
    const totalRevenue = productPrice * salesCount;

    // Calculate gross profit (before deducting product cost and ad cost)
    const grossProfit = totalRevenue - (totalConfirmationCost + totalShippingCost + totalPlatformOrderFees + totalCodFees);

    // Calculate net profit (after deducting product cost and ad cost)
    const netProfit = totalRevenue - totalExpenses;

    // Display results
    document.getElementById('total-expenses').textContent = `Total Charge: $${totalExpenses.toFixed(2)}`;
    document.getElementById('total-revenue').textContent = `Total Revenue: $${totalRevenue.toFixed(2)}`;
    document.getElementById('gross-profit').textContent = `Gross Profit (before product and ad costs): $${grossProfit.toFixed(2)}`;

    const netProfitElement = document.getElementById('net-profit');
    netProfitElement.textContent = `Net Profit (after product and ad costs): $${netProfit.toFixed(2)}`;

    // Set color based on net profit value
    if (netProfit >= 0) {
        netProfitElement.classList.remove('negative');
        netProfitElement.classList.add('positive');
    } else {
        netProfitElement.classList.remove('positive');
        netProfitElement.classList.add('negative');
    }
});

document.getElementById('download-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const productPrice = parseFloat(document.getElementById('product-price').value);
    const salesCount = parseInt(document.getElementById('sales-count').value);
    const adCost = parseFloat(document.getElementById('ad-cost').value);
    const platformOrders = parseInt(document.getElementById('platform-orders').value);
    const productCost = parseFloat(document.getElementById('product-cost').value);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const totalExpenses = document.getElementById('total-expenses').textContent;
    const totalRevenue = document.getElementById('total-revenue').textContent;
    const grossProfit = document.getElementById('gross-profit').textContent;
    const netProfit = document.getElementById('net-profit').textContent;

    doc.text("Revenue Calculator Results", 10, 10);
    doc.text(`From: ${startDate} To: ${endDate}`, 10, 20);
    doc.text(`Product Sale Price: $${productPrice}`, 10, 30);
    doc.text(`Quantity Products Received: ${salesCount}`, 10, 40);
    doc.text(`Ad Cost: $${adCost}`, 10, 50);
    doc.text(`Orders Fees: ${platformOrders}`, 10, 60);
    doc.text(`Product Cost: $${productCost}`, 10, 70);
    doc.text(totalExpenses, 10, 80);
    doc.text(totalRevenue, 10, 90);
    doc.text(grossProfit, 10, 100);
    doc.text(netProfit, 10, 110);

    doc.save('results.pdf');
});
