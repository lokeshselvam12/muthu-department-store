/**
 * inventory.js - Inventory Management Logic
 */

let editingProductId = null;

function initInventory() {
    populateCategorySelect();
    renderInventoryTable();
    
    // Add Product button
    document.getElementById('add-product-btn').onclick = () => {
        editingProductId = null;
        document.getElementById('modal-title').innerText = 'Add New Product';
        document.getElementById('product-form').reset();
        openModal('product-modal');
    };
    
    // Form submission
    document.getElementById('product-form').onsubmit = handleProductSubmit;
}

function renderInventoryTable() {
    const products = window.store.getProducts();
    const container = document.getElementById('inventory-table-body');
    
    container.innerHTML = products.map(p => `
        <tr>
            <td><span class="brand-tag" style="background: #eef2ff; color: var(--primary); padding: 4px 8px; border-radius: 6px; font-weight: 600; font-size: 0.8rem;">${p.brand || 'Generic'}</span></td>
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    ${p.image ? 
                        `<img src="${p.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px;">` : 
                        `<div style="width: 40px; height: 40px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 1.2rem;">${p.icon}</div>`
                    }
                    <span>${p.name}</span>
                </div>
            </td>
            <td><span class="category-tab">${p.category}</span></td>
            <td>₹${p.price.toFixed(2)}</td>
            <td><span class="unit-badge" style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; color: #64748b;">${p.unit || 'kg'}</span></td>
            <td>
                <span style="color: ${p.stock < 10 ? 'var(--danger)' : 'inherit'}; font-weight: ${p.stock < 10 ? '700' : 'normal'}">
                    ${Number.isInteger(p.stock) ? p.stock : p.stock.toFixed(2)}
                </span>
            </td>
            <td>
                <button class="btn-text" style="color: var(--primary); margin-right: 12px;" onclick="editProduct('${p.id}')">Edit</button>
                <button class="btn-text" onclick="deleteProduct('${p.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

window.editProduct = (id) => {
    const product = window.store.getProducts().find(p => p.id === id);
    if (!product) return;

    editingProductId = id;
    document.getElementById('modal-title').innerText = 'Edit Product';
    document.getElementById('prod-brand').value = product.brand || '';
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-category').value = product.category;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-stock').value = product.stock;
    document.getElementById('prod-unit').value = product.unit || 'kg';
    document.getElementById('prod-image').value = product.image || '';
    
    openModal('product-modal');
};

function handleProductSubmit(e) {
    e.preventDefault();
    
    const productData = {
        brand: document.getElementById('prod-brand').value,
        name: document.getElementById('prod-name').value,
        category: document.getElementById('prod-category').value,
        price: parseFloat(document.getElementById('prod-price').value),
        stock: parseFloat(document.getElementById('prod-stock').value),
        unit: document.getElementById('prod-unit').value,
        image: document.getElementById('prod-image').value
    };

    window.store.saveProduct(productData, editingProductId);
    closeModal('product-modal');
    renderInventoryTable();
    showToast('Product saved successfully!', 'success');
}

window.deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        window.store.deleteProduct(id);
        renderInventoryTable();
        showToast('Product deleted.', 'success');
    }
};

function populateCategorySelect() {
    const categories = window.store.getCategories();
    const select = document.getElementById('prod-category');
    if (!select) return;

    select.innerHTML = categories.map(cat => `
        <option value="${cat.name}">${cat.name}</option>
    `).join('');
}
