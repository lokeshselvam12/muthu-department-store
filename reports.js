/**
 * reports.js - Analytics & Sales History
 */

function initReports() {
    renderMetrics();
    renderSalesHistory();
}

function renderMetrics() {
    const orders = window.store.getOrders();
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalBills = orders.length;
    const avgBill = totalBills > 0 ? (totalRevenue / totalBills) : 0;

    document.getElementById('total-revenue').innerText = `₹${totalRevenue.toLocaleString()}`;
    document.getElementById('total-bills').innerText = totalBills;
    document.getElementById('avg-bill').innerText = `₹${avgBill.toFixed(2)}`;
}

function renderSalesHistory() {
    const orders = window.store.getOrders();
    const container = document.getElementById('sales-history-body');
    
    // Sort by most recent
    const sortedOrders = [...orders].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    container.innerHTML = sortedOrders.map(order => {
        const customerDisplay = order.customerName || 'Guest Customer';

        return `
            <tr>
                <td>${new Date(order.timestamp).toLocaleString()}</td>
                <td><span style="font-weight: 500;">${customerDisplay}</span></td>
                <td>${order.items.length} items</td>
                <td style="font-weight: 600;">₹${order.total.toFixed(2)}</td>
                <td>
                    <button class="btn-text" style="color: var(--primary); margin-right: 12px;" onclick="viewOrderReceipt('${order.id}')">View</button>
                    <button class="btn-text" style="color: var(--danger);" onclick="deleteOrder('${order.id}')">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

window.deleteOrder = (id) => {
    if (confirm('Are you sure you want to void/delete this transaction? This will remove it from the reports.')) {
        window.store.deleteOrder(id);
        initReports();
        showToast('Transaction deleted.', 'success');
    }
};

window.viewOrderReceipt = (orderId) => {
    const orders = window.store.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Simple view simulation (could be a modal)
    let details = `Order ID: ${order.id}\nDate: ${new Date(order.timestamp).toLocaleString()}\n\nItems:\n`;
    order.items.forEach(item => {
        details += `- ${item.name} x${item.qty} : ₹${(item.price * item.qty).toFixed(2)}\n`;
    });
    details += `\nTOTAL: ₹${order.total.toFixed(2)}`;
    
    alert(details);
};
