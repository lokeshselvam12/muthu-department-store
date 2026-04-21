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
    const categories = [
        { name: 'All', icon: '🛍️' },
        { name: 'Rice', icon: '🌾' },
        { name: 'Dals', icon: '🥣' },
        { name: 'Oil', icon: '🍾' },
        { name: 'Salt', icon: '🧂' },
        { name: 'Sugar & Sweeteners', icon: '🍯' },
        { name: 'Semiya', icon: '🍜' },
        { name: 'Pasta', icon: '🍝' },
        { name: 'Noodles', icon: '🍜' },
        { name: 'Tea Powder', icon: '🍵' },
        { name: 'Coffee Powder', icon: '☕' },
        { name: 'Masala', icon: '🌶️' },
        { name: 'Pickles', icon: '🥒' },
        { name: 'Sauces', icon: '🥫' },
        { name: 'Biscuits', icon: '🍪' },
        { name: 'Packaged Food', icon: '🍱' },
        { name: 'Ghee', icon: '🧈' },
        { name: 'Nuts', icon: '🥜' },
        { name: 'Shampoo', icon: '🧴' },
        { name: 'Detergent Powder', icon: '🧺' },
        { name: 'Liquid Detergent', icon: '🧴' },
        { name: 'Detergent Soap', icon: '🧼' },
        { name: 'Body Soap', icon: '🧼' },
        { name: 'Dishwash Soap', icon: '🧽' },
        { name: 'Dishwash Liquid', icon: '🧽' },
        { name: 'Nutritional Drink', icon: '🥛' },
        { name: 'Shaving Blade', icon: '🪒' },
        { name: 'Grains & Pulses', icon: '🌾' },
        { name: 'Chocolates', icon: '🍫' }
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
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    container.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="addToCart(${p.id})">
            ${p.image ?
            `<img src="${p.image}" class="product-img" alt="${p.name}">` :
            `<div class="product-image-placeholder">${p.icon}</div>`
        }
            <div class="product-info">
                <span style="font-size: 0.7rem; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">${p.brand || 'Generic'}</span>
                <h4>${p.name}</h4>
                <div class="price">₹${p.price.toFixed(2)}</div>
                <div class="stock">${p.stock} in stock</div>
            </div>
        </div>
    `).join('');
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

window.updateQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    renderCart();
};

function renderCart() {
    const container = document.getElementById('cart-items');

    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-muted);">Cart is empty</div>';
        updateTotals();
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h5>${item.name}</h5>
                <span>₹${item.price} x ${item.qty}</span>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

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
                        padding: 10px; 
                        font-weight: bold;
                        font-size: 14px;
                        line-height: 1.2;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .center { text-align: center; }
                    .header { width: 100%; }
                    .header h1 { margin: 0; font-size: 18px; text-transform: uppercase; }
                    .header p { margin: 1px 0; font-size: 13px; }
                    .divider { border-top: 1px dashed #000; margin: 6px 0; width: 100%; }
                    
                    .meta-row { display: flex; justify-content: space-between; font-size: 12px; text-transform: uppercase; margin: 3px 0; width: 100%; }
                    
                    .item-row { display: flex; width: 100%; font-size: 13px; margin-bottom: 4px; align-items: flex-start; gap: 8px; }
                    .col-name { width: 130px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                    .col-qty { width: 45px; text-align: center; }
                    .col-amt { width: 75px; text-align: right; }

                    .total-row { display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin: 10px 0; padding: 5px 0; width: 100%; }
                    .footer { font-size: 13px; margin-top: 15px; padding-top: 10px; width: 100%; }
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
                    <span>CUST: ${(order.customerName || 'GUEST')}</span>
                    <span>${formattedDate}</span>
                </div>
                <div class="divider"></div>
                <div class="item-row" style="font-size: 11px;">
                    <span class="col-name">ITEM NAME</span>
                    <span class="col-qty">QTY</span>
                    <span class="col-amt">AMOUNT</span>
                </div>
                <div class="divider"></div>
                ${cart.map(item => `
                    <div class="item-row">
                        <span class="col-name">${item.name}</span>
                        <span class="col-qty">${item.qty}</span>
                        <span class="col-amt">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div class="divider"></div>
                <div class="total-row">
                    <span>GRAND TOTAL:</span>
                    <span>₹${total.toFixed(2)}</span>
                </div>
                <div class="divider"></div>
                <div class="footer center">
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
