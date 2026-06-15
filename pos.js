/**
 * pos.js - Point of Sale Logic
 */

let cart = [];
let selectedCategory = 'All';

function initPOS() {
    renderCategories();
    renderProducts();
    renderCart();

    // UI Event Listeners
    document.getElementById('pos-search').addEventListener('input', (e) => {
        renderProducts(e.target.value);
    });

    document.getElementById('checkout-btn').onclick = handleCheckout;

    document.getElementById('clear-cart').onclick = () => {
        cart = [];
        renderCart();
    };

    // Category scroll handlers
    const tabsContainer = document.getElementById('category-tabs');
    document.getElementById('cat-scroll-left').onclick = () => {
        tabsContainer.scrollBy({ left: -200, behavior: 'smooth' });
    };
    document.getElementById('cat-scroll-right').onclick = () => {
        tabsContainer.scrollBy({ left: 200, behavior: 'smooth' });
    };
}

function renderCategories() {
    const storeCategories = window.store.getCategories();
    const categories = [
        { name: 'All', icon: '🛍️' },
        ...storeCategories
    ];
    const container = document.getElementById('category-tabs');

    container.innerHTML = categories.map(cat => `
        <button class="category-tab ${cat.name === selectedCategory ? 'active' : ''}" 
                onclick="filterCategory('${cat.name}')">
            <span class="cat-icon">${cat.icon}</span>
            ${cat.name}
        </button>
    `).join('');
}

window.filterCategory = (category) => {
    selectedCategory = category;
    renderCategories();
    renderProducts();
};

function renderProducts(searchTerm = '') {
    const products = window.store.getProducts();
    const container = document.getElementById('product-grid');

    const filtered = products.filter(p => {
        const query = searchTerm.toLowerCase();
        const matchesSearch = p.name.toLowerCase().includes(query) || 
                              (p.brand && p.brand.toLowerCase().includes(query)) ||
                              p.category.toLowerCase().includes(query);
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    const renderCard = p => {
        const isLoose = p.category === 'Loose Items';
        return `
        <div class="product-card" onclick="addToCart('${p.id}')">
            ${p.image ?
            `<img src="${p.image}" class="product-img" alt="${p.name}">` :
            `<div class="product-image-placeholder">${p.icon}</div>`
        }
            <div class="product-info">
                <span style="font-size: 0.7rem; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">${p.subCategory ? p.subCategory + ' • ' : ''}${p.brand || 'Generic'}</span>
                <h4>${p.name}</h4>
                <div class="price">₹${p.price.toFixed(2)}</div>
                <div class="stock">${p.stock} in stock</div>
                ${isLoose ? `
                <div class="weight-btns" style="margin-top: 8px;" onclick="event.stopPropagation()">
                    <button class="weight-btn" onclick="addToCartWithOptions('${p.id}', 0.25)">1/4</button>
                    <button class="weight-btn" onclick="addToCartWithOptions('${p.id}', 0.5)">1/2</button>
                    <button class="weight-btn" onclick="addToCartWithOptions('${p.id}', 0.75)">3/4</button>
                    <button class="weight-btn" onclick="addToCartWithOptions('${p.id}', 1)">1</button>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    };

    if (selectedCategory === 'Loose Items' && !searchTerm) {
        const groups = {};
        filtered.forEach(p => {
            const sub = p.subCategory || 'Other';
            if (!groups[sub]) groups[sub] = [];
            groups[sub].push(p);
        });

        let html = '';
        for (const [sub, items] of Object.entries(groups)) {
            html += `
                <div style="grid-column: 1 / -1; margin-top: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">
                    <h3 style="color: var(--primary); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">${sub}</h3>
                </div>
            `;
            html += items.map(renderCard).join('');
        }
        container.innerHTML = html;
    } else {
        container.innerHTML = filtered.map(renderCard).join('');
    }
}

window.addToCart = (productId) => {
    const product = window.store.getProducts().find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        showToast('Item out of stock!', 'error');
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.qty < product.stock) {
            cartItem.qty++;
        } else {
            showToast('Max stock reached!', 'error');
        }
    } else {
        cart.push({ ...product, qty: 1 });
    }

    renderCart();
};

window.addToCartWithOptions = (productId, qty) => {
    const product = window.store.getProducts().find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        showToast('Item out of stock!', 'error');
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (qty <= product.stock) {
            cartItem.qty = qty;
        } else {
            showToast('Max stock reached!', 'error');
        }
    } else {
        cart.push({ ...product, qty: qty });
    }

    renderCart();
};

window.updateQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        const product = window.store.getProducts().find(p => p.id === id);
        const isLoose = product && product.category === 'Loose Items';
        const newQty = isLoose ? (item.qty + delta) : Math.round(item.qty + delta);
        if (newQty <= 0) {
            cart = cart.filter(i => i.id !== id);
        } else if (product && newQty > product.stock) {
            showToast('Max stock reached!', 'error');
        } else {
            item.qty = newQty;
        }
    }
    renderCart();
};

window.setQty = (id, qty) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        const product = window.store.getProducts().find(p => p.id === id);
        const newQty = parseFloat(qty);
        if (isNaN(newQty) || newQty <= 0) {
            cart = cart.filter(i => i.id !== id);
        } else if (product && newQty > product.stock) {
            showToast('Max stock reached!', 'error');
            item.qty = product.stock;
        } else {
            item.qty = newQty;
        }
    }
    renderCart();
};

window.handleQtyInput = (id, value) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        const product = window.store.getProducts().find(p => p.id === id);
        const newQty = parseFloat(value);
        if (!isNaN(newQty) && newQty > 0) {
            if (product && newQty > product.stock) {
                showToast('Max stock reached!', 'error');
                item.qty = product.stock;
            } else {
                item.qty = newQty;
            }
            updateTotals();
            
            const lineTotal = document.getElementById(`line-total-${id}`);
            if (lineTotal) lineTotal.textContent = `₹${(item.price * item.qty).toFixed(2)}`;
            const lineDetail = document.getElementById(`line-detail-${id}`);
            if (lineDetail) lineDetail.textContent = `Qty: ${item.qty}`;
        }
    }
};

function renderCart() {
    const container = document.getElementById('cart-items');

    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-muted);">Cart is empty</div>';
        updateTotals();
        return;
    }

    container.innerHTML = cart.map(item => {
        const lineTotal = (item.price * item.qty).toFixed(2);
        return `
        <div class="cart-item-block">
            <div class="cart-item-top">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <span id="line-detail-${item.id}">Qty: ${item.qty}</span>
                </div>
                <div class="cart-item-total">
                    <span id="line-total-${item.id}" class="line-total">₹${lineTotal}</span>
                    <button class="cart-remove-btn" onclick="setQty('${item.id}', 0)" title="Remove">✕</button>
                </div>
            </div>
            <div class="cart-item-controls">
                ${item.category === 'Loose Items' ? `
                <div class="weight-btns">
                    <button class="weight-btn ${item.qty === 0.25 ? 'active' : ''}" onclick="setQty('${item.id}', 0.25)">¼</button>
                    <button class="weight-btn ${item.qty === 0.5 ? 'active' : ''}" onclick="setQty('${item.id}', 0.5)">½</button>
                    <button class="weight-btn ${item.qty === 0.75 ? 'active' : ''}" onclick="setQty('${item.id}', 0.75)">¾</button>
                    <button class="weight-btn ${item.qty === 1 ? 'active' : ''}" onclick="setQty('${item.id}', 1)">1</button>
                </div>
                ` : ''}
                <div class="qty-stepper">
                    <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
                    <input type="number" class="qty-input" value="${item.qty}" min="0.01" step="any"
                        onchange="handleQtyInput('${item.id}', this.value)"
                        oninput="handleQtyInput('${item.id}', this.value)">
                    <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                </div>
            </div>
        </div>
    `;
    }).join('');

    updateTotals();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cart-subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `₹${subtotal.toFixed(2)}`;

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
}

function handleCheckout() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const customerName = document.getElementById('cart-customer-name').value;
    const billNo = 'MDS-' + Math.floor(Math.random() * 90000 + 10000);

    const order = {
        billNo: billNo,
        items: [...cart],
        total: total,
        customerName: customerName || 'Guest',
        date: new Date().toLocaleString()
    };

    // Save to data store (this updates reports and stock)
    window.store.saveOrder(order);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear().toString().slice(-2)} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

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
                <title>Bill ${billNo}</title>
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
                    <span>BILL NO: ${billNo}</span>
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
                    ${cart.map(item => `
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
                        <span>₹${total.toFixed(2)}</span>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="footer center">
                    <p>ITEMS: ${cart.length}</p>
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

    // Reset UI
    cart = [];
    document.getElementById('cart-customer-name').value = "";
    renderCart();
    renderProducts();
}
