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

function generateOrderHTML(order) {
    const dateStr = new Date(order.timestamp).toLocaleString();
    const itemsRows = order.items.map(item => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 0; text-align: left; font-size: 0.9rem; color: #334155;">
                <div style="font-weight: 600;">${item.name}</div>
                <div style="font-size: 0.75rem; color: #64748b;">${item.brand || 'Generic'}</div>
            </td>
            <td style="padding: 10px 0; text-align: center; font-size: 0.9rem; color: #334155;">${item.qty}</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 600; font-size: 0.9rem; color: #1e293b;">₹${(item.price * item.qty).toFixed(2)}</td>
        </tr>
    `).join('');

    return `
        <div style="padding: 40px; font-family: 'Outfit', 'Inter', sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px;">
                <h1 style="margin: 0; font-size: 1.8rem; color: #4f46e5; font-weight: 700; letter-spacing: -0.02em;">MUTHU DEPARTMENT STORE</h1>
                <p style="margin: 5px 0 0 0; color: #64748b; font-size: 0.9rem;">Apparao Street, Kanchipuram</p>
                <p style="margin: 2px 0 0 0; color: #64748b; font-size: 0.9rem; font-weight: 500;">Ph: 9894465996</p>
            </div>
            
            <!-- Metadata -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; font-size: 0.9rem;">
                <div>
                    <span style="color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Bill To</span>
                    <strong style="color: #1e293b; font-size: 1rem;">${order.customerName || 'Guest Customer'}</strong>
                </div>
                <div style="text-align: right;">
                    <span style="color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Invoice Details</span>
                    <div style="color: #334155; font-weight: 600; margin-bottom: 2px;">Bill No: <span style="color: #4f46e5;">${order.billNo || order.id}</span></div>
                    <div style="color: #64748b; font-size: 0.8rem;">Date: ${dateStr}</div>
                </div>
            </div>
            
            <!-- Items Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="border-bottom: 2px solid #cbd5e1; text-transform: uppercase; font-size: 0.75rem; font-weight: 700; color: #64748b;">
                        <th style="padding: 8px 0; text-align: left;">Item Description</th>
                        <th style="padding: 8px 0; text-align: center;">Qty</th>
                        <th style="padding: 8px 0; text-align: right;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsRows}
                </tbody>
            </table>
            
            <!-- Total Section -->
            <div style="margin-left: auto; width: 250px; border-top: 2px solid #cbd5e1; padding-top: 10px; margin-bottom: 40px;">
                <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.95rem;">
                    <span style="color: #64748b; font-weight: 500;">Subtotal:</span>
                    <span style="color: #334155; font-weight: 600;">₹${order.total.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px solid #e2e8f0; font-size: 1.2rem;">
                    <span style="color: #1e293b; font-weight: 700;">Grand Total:</span>
                    <span style="color: #4f46e5; font-weight: 700;">₹${order.total.toFixed(2)}</span>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; color: #94a3b8; font-size: 0.8rem; font-weight: 500;">
                <p style="margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">Thank you for shopping with us!</p>
                <p style="margin: 5px 0 0 0;">This is a computer generated invoice and does not require physical signature.</p>
            </div>
        </div>
    `;
}

function generateOrderModalHTML(order) {
    const dateStr = new Date(order.timestamp).toLocaleString();
    const itemsList = order.items.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;">
            <div style="flex: 1; padding-right: 10px;">
                <strong>${item.name}</strong>
                <div style="font-size: 0.75rem; color: #64748b;">Qty: ${item.qty}</div>
            </div>
            <div style="text-align: right; font-weight: 600; min-width: 80px;">₹${(item.price * item.qty).toFixed(2)}</div>
        </div>
    `).join('');

    return `
        <div style="color: #1e293b;">
            <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 12px;">
                <h4 style="margin: 0; color: var(--primary); font-size: 1.15rem; font-weight: 700;">MUTHU DEPARTMENT STORE</h4>
                <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">Apparao Street, Kanchipuram</div>
            </div>
            <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 6px; margin-bottom: 20px; font-size: 0.8rem; display: flex; justify-content: space-between;">
                <div>
                    <div><strong>Bill No:</strong> ${order.billNo || order.id}</div>
                    <div><strong>Customer:</strong> ${order.customerName || 'Guest'}</div>
                </div>
                <div style="text-align: right;">
                    <div>${dateStr}</div>
                </div>
            </div>
            <div style="margin-bottom: 20px; max-height: 220px; overflow-y: auto; padding-right: 4px;">
                ${itemsList}
            </div>
            <div style="border-top: 2px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; font-weight: 700; font-size: 1.15rem;">
                <span>Total:</span>
                <span style="color: var(--primary);">₹${order.total.toFixed(2)}</span>
            </div>
        </div>
    `;
}

window.downloadOrderPDF = (orderId) => {
    const orders = window.store.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (typeof html2pdf === 'undefined') {
        showToast('PDF library loading... Please try again in a moment.', 'error');
        return;
    }

    // Create a temporary element to hold the HTML
    const element = document.createElement('div');
    element.innerHTML = generateOrderHTML(order);
    document.body.appendChild(element); // briefly append to render correctly
    
    // Configure html2pdf options
    const opt = {
        margin:       15,
        filename:     `Invoice_${order.billNo || order.id}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Generate and save PDF, then remove temporary element
    html2pdf().set(opt).from(element).save().then(() => {
        document.body.removeChild(element);
    }).catch(err => {
        console.error('PDF Generation Error:', err);
        document.body.removeChild(element);
    });
};

window.viewOrderReceipt = (orderId) => {
    const orders = window.store.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const modalBody = document.getElementById('receipt-modal-body');
    modalBody.innerHTML = generateOrderModalHTML(order);
    
    const downloadBtn = document.getElementById('download-pdf-btn');
    downloadBtn.onclick = () => {
        downloadOrderPDF(order.id);
    };

    const printBtn = document.getElementById('print-receipt-btn');
    printBtn.onclick = () => {
        printOrderReceipt(order.id);
    };

    openModal('receipt-modal');
};

window.printOrderReceipt = (orderId) => {
    const orders = window.store.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const formattedDate = new Date(order.timestamp).toLocaleString();
    
    // Create hidden iframe for printing
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
            <head>
                <title>Bill ${order.billNo || order.id}</title>
                <style>
                    @page { margin: 0; }
                    body { 
                        font-family: 'Courier New', Courier, monospace; 
                        width: 280px; 
                        margin: 0 auto; 
                        color: #000; 
                        padding: 8px; 
                        font-size: 11px;
                        line-height: 1.3;
                        display: flex;
                        flex-direction: column;
                    }
                    .center { text-align: center; }
                    .header { width: 100%; margin-bottom: 5px; }
                    .header h1 { margin: 0; font-size: 14px; text-transform: uppercase; }
                    .header p { margin: 1px 0; font-size: 10px; }
                    .divider { border-top: 1px dashed #000; margin: 5px 0; width: 100%; }
                    
                    .meta-row { display: flex; justify-content: space-between; font-size: 10px; text-transform: uppercase; margin: 2px 0; width: 100%; }
                    
                    .item-container { width: 100%; }
                    .item-row { display: flex; justify-content: space-between; width: 100%; font-weight: bold; margin-top: 4px; }
                    .item-name { width: 70%; word-wrap: break-word; }
                    .item-price { width: 30%; text-align: right; }
                    .item-sub { font-size: 9px; margin-bottom: 4px; color: #333; }

                    .total-section { width: 100%; margin-top: 5px; }
                    .total-row { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; padding: 4px 0; }
                    .footer { font-size: 10px; margin-top: 10px; width: 100%; }
                </style>
            </head>
            <body>
                <div class="header center">
                    <h1>MUTHU DEPARTMENT STORE</h1>
                    <p>Apparao Street Kanchipuram</p>
                    <p>Ph: 9894465996</p>
                </div>
                <div class="divider"></div>
                <div class="meta-row">
                    <span>BILL NO: ${order.billNo || order.id}</span>
                    <span>${formattedDate}</span>
                </div>
                <div class="meta-row">
                    <span>CUST: ${(order.customerName || 'GUEST')}</span>
                </div>
                <div class="divider"></div>
                <div class="item-container">
                    <div class="item-row" style="font-size: 10px; margin-bottom: 2px;">
                        <span>DESCRIPTION</span>
                        <span>AMOUNT</span>
                    </div>
                    <div class="divider"></div>
                    ${order.items.map(item => `
                        <div class="item-group">
                            <div class="item-row">
                                <span class="item-name">${item.name}</span>
                                <span class="item-price">${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                            <div class="item-sub">
                                Qty: ${item.qty}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="divider"></div>
                <div class="total-section">
                    <div class="total-row">
                        <span>GRAND TOTAL:</span>
                        <span>₹${order.total.toFixed(2)}</span>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="footer center">
                    <p>ITEMS: ${order.items.length}</p>
                    <p>THANK YOU FOR SHOPPING!</p>
                </div>
                <script>
                    window.onload = function() { 
                        window.print(); 
                        setTimeout(() => {
                            window.parent.document.body.removeChild(window.frameElement);
                        }, 500);
                    }
                </script>
            </body>
        </html>
    `);
    doc.close();
};
