/**
 * data.js - Persistent Data Management for Muthu Store
 * Handles localStorage operations and initial data seeding.
 */

const STORAGE_KEYS = {
    PRODUCTS: 'muthu_products_v11',
    ORDERS: 'muthu_orders',
    CATEGORIES: 'muthu_categories'
};

const DEFAULT_PRODUCTS = [
    // Rice
    { id: 1, brand: 'Organic Tattva', name: 'Premium Basmati Rice (5kg)', category: 'Rice', price: 850, stock: 50, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400', icon: '🌾' },
    
    // Grains & Pulses
    { id: 2, brand: 'Aashirvaad', name: 'Whole Wheat Atta (10kg)', category: 'Grains & Pulses', price: 445, stock: 100, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', icon: '🌾' },
    { id: 3, brand: 'Tata Sampann', name: 'Fine Maida (1kg)', category: 'Grains & Pulses', price: 55, stock: 80, image: 'https://images.unsplash.com/photo-1627485750592-9e03b4ebfe6c?auto=format&fit=crop&q=80&w=400', icon: '🌾' },
    { id: 4, brand: 'Fortune', name: 'Premium Sooji (500g)', category: 'Grains & Pulses', price: 35, stock: 60, image: 'https://images.unsplash.com/photo-1543320485-d0d5a49c2b2e?auto=format&fit=crop&q=80&w=400', icon: '🌾' },
    { id: 5, brand: 'MDS', name: 'Poha (Flattened Rice)', category: 'Grains & Pulses', price: 50, stock: 70, image: 'https://images.unsplash.com/photo-1589135339644-8097b3992004?auto=format&fit=crop&q=80&w=400', icon: '🌾' },

    // Dals
    { id: 6, brand: 'Tata Sampann', name: 'Toor Dal (1kg)', category: 'Dals', price: 165, stock: 40, image: 'https://images.unsplash.com/photo-1545114197-285288504a44?auto=format&fit=crop&q=80&w=400', icon: '🥣' },
    { id: 7, brand: '24 Mantra', name: 'Organic Moong Dal (1kg)', category: 'Dals', price: 145, stock: 40, image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=400', icon: '🥣' },
    { id: 8, brand: 'MDS', name: 'Urad Dal (1kg)', category: 'Dals', price: 130, stock: 40, image: 'https://images.unsplash.com/photo-1545114197-285288504a44?auto=format&fit=crop&q=80&w=400', icon: '🥣' },
    { id: 9, brand: 'MDS', name: 'Chana Dal (1kg)', category: 'Dals', price: 95, stock: 40, image: 'https://images.unsplash.com/photo-1585996841295-da9067586ca9?auto=format&fit=crop&q=80&w=400', icon: '🥣' },
    { id: 10, brand: 'MDS', name: 'Masoor Dal (1kg)', category: 'Dals', price: 100, stock: 40, image: 'https://images.unsplash.com/photo-1545114197-285288504a44?auto=format&fit=crop&q=80&w=400', icon: '🥣' },

    // Oil
    { id: 11, brand: 'Fortune', name: 'Sunflower Oil (1L)', category: 'Oil', price: 155, stock: 30, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400', icon: '🍾' },
    { id: 12, brand: 'Dhara', name: 'Filtered Groundnut Oil', category: 'Oil', price: 185, stock: 30, image: 'https://images.unsplash.com/photo-1620706122141-8600192767e1?auto=format&fit=crop&q=80&w=400', icon: '🍾' },
    { id: 13, brand: 'MDS', name: 'Coconut Oil (500ml)', category: 'Oil', price: 210, stock: 30, image: 'https://images.unsplash.com/photo-1620706122141-8600192767e1?auto=format&fit=crop&q=80&w=400', icon: '🍾' },
    { id: 14, brand: 'Dhara', name: 'Mustard Oil (1L)', category: 'Oil', price: 180, stock: 30, image: 'https://images.unsplash.com/photo-1620706122141-8600192767e1?auto=format&fit=crop&q=80&w=400', icon: '🍾' },
    
    // Ghee
    { id: 15, brand: 'Amul', name: 'Pure Cow Ghee (500ml)', category: 'Ghee', price: 320, stock: 20, image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=400', icon: '🧈' },

    // Masala
    { id: 16, brand: 'MDS', name: 'Turmeric Powder', category: 'Masala', price: 35, stock: 100, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { id: 17, brand: 'MDS', name: 'Red Chilli Powder', category: 'Masala', price: 45, stock: 100, image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { id: 18, brand: 'MDS', name: 'Coriander Powder', category: 'Masala', price: 30, stock: 100, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { id: 19, brand: 'MDS', name: 'Garam Masala', category: 'Masala', price: 50, stock: 100, image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { id: 20, brand: 'MDS', name: 'Cumin Seeds', category: 'Masala', price: 60, stock: 100, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },
    { id: 21, brand: 'MDS', name: 'Mustard Seeds', category: 'Masala', price: 40, stock: 100, image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&q=80&w=400', icon: '🌶️' },

    // Salt
    { id: 70, brand: 'Tata', name: 'Iodized Salt (1kg)', category: 'Salt', price: 28, stock: 150, image: 'https://images.unsplash.com/photo-1626197031107-c09bc824ff5e?auto=format&fit=crop&q=80&w=400', icon: '🧂' },

    // Sugar & Sweeteners
    { id: 22, brand: 'MDS', name: 'Refined Sugar (1kg)', category: 'Sugar & Sweeteners', price: 45, stock: 200, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400', icon: '🍯' },
    { id: 23, brand: 'MDS', name: 'Organic Jaggery', category: 'Sugar & Sweeteners', price: 60, stock: 150, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400', icon: '🍯' },
    { id: 24, brand: 'Patandjali', name: 'Pure Honey (250g)', category: 'Sugar & Sweeteners', price: 150, stock: 50, image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&q=80&w=400', icon: '🍯' },

    // Pickles
    { id: 25, brand: 'Priya', name: 'Mango Pickle', category: 'Pickles', price: 80, stock: 40, image: 'https://images.unsplash.com/photo-1544333323-c242b442436d?auto=format&fit=crop&q=80&w=400', icon: '🥒' },
    { id: 26, brand: 'Priya', name: 'Lemon Pickle', category: 'Pickles', price: 75, stock: 40, image: 'https://images.unsplash.com/photo-1544333323-c242b442436d?auto=format&fit=crop&q=80&w=400', icon: '🥒' },
    { id: 27, brand: 'Mothers Recipe', name: 'Mixed Pickle', category: 'Pickles', price: 85, stock: 40, image: 'https://images.unsplash.com/photo-1544333323-c242b442436d?auto=format&fit=crop&q=80&w=400', icon: '🥒' },

    // Sauces
    { id: 28, brand: 'Maggi', name: 'Tomato Ketchup', category: 'Sauces', price: 120, stock: 50, image: 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=400', icon: '🥫' },
    { id: 29, brand: 'MDS', name: 'Soy Sauce', category: 'Sauces', price: 90, stock: 30, image: 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=400', icon: '🥫' },

    // Biscuits
    { id: 30, brand: 'Oreo', name: 'Chocolate Biscuits', category: 'Biscuits', price: 40, stock: 100, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', icon: '🍪' },

    // Packaged Food
    { id: 31, brand: 'Lay\'s', name: 'Classic Salted Chips', category: 'Packaged Food', price: 20, stock: 100, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400', icon: '🍱' },

    // Noodles
    { id: 32, brand: 'Maggi', name: '2-Minute Noodles (pk)', category: 'Noodles', price: 14, stock: 200, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400', icon: '🍜' },

    // Pasta
    { id: 33, brand: 'MDS', name: 'Masala Pasta', category: 'Pasta', price: 45, stock: 60, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400', icon: '🍝' },

    // Semiya
    { id: 71, brand: 'MTR', name: 'Roasted Vermicelli (Semiya)', category: 'Semiya', price: 40, stock: 80, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400', icon: '🍜' },

    // Nuts
    { id: 72, brand: 'Happilo', name: 'Premium Cashews (200g)', category: 'Nuts', price: 280, stock: 40, image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=400', icon: '🥜' },

    // Household
    { id: 34, brand: 'Surf Excel', name: 'Detergent Powder (1kg)', category: 'Detergent Powder', price: 156, stock: 50, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧺' },
    { id: 35, brand: 'Vim', name: 'Dish Wash Liquid (500ml)', category: 'Dishwash Liquid', price: 95, stock: 50, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧽' },
    { id: 50, brand: 'Dove', name: 'Beauty Bar Soap', category: 'Body Soap', price: 75, stock: 100, image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400', icon: '🧼' },
    { id: 51, brand: 'Head & Shoulders', name: 'Anti-Dandruff Shampoo', category: 'Shampoo', price: 180, stock: 40, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400', icon: '🧴' },

    // New additions for missing categories
    { id: 73, brand: 'Comfort', name: 'Fabric Liquid Detergent', category: 'Liquid Detergent', price: 120, stock: 40, image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', icon: '🧴' },
    { id: 74, brand: 'Rin', name: 'Detergent Soap Bar', category: 'Detergent Soap', price: 15, stock: 100, icon: '🧼' },
    { id: 75, brand: 'Vim', name: 'Vim Bar (Dishwash Soap)', category: 'Dishwash Soap', price: 20, stock: 150, icon: '🧽' },
    { id: 76, brand: 'Horlicks', name: 'Health Drink (500g)', category: 'Nutritional Drink', price: 260, stock: 30, icon: '🥛' },
    { id: 77, brand: 'Gillette', name: 'Presto Bladess (pk)', category: 'Shaving Blade', price: 45, stock: 100, icon: '🪒' },
    { id: 78, brand: 'Cadbury', name: 'Dairy Milk Silk', category: 'Chocolates', price: 80, stock: 60, icon: '🍫' },

    // Beverages
    { id: 60, brand: '3 Roses', name: 'Red Label Tea (500g)', category: 'Tea Powder', price: 250, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },
    { id: 61, brand: 'TATA TEA', name: 'Chakra Gold (50g)', category: 'Tea Powder', price: 35, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },
    { id: 62, brand: 'TATA TEA', name: 'Chakra Gold (100g)', category: 'Tea Powder', price: 70, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },
    { id: 63, brand: 'TATA TEA', name: 'Chakra Gold (250g)', category: 'Tea Powder', price: 145, stock: 50, image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=400', icon: '🍵' },
    { id: 64, brand: 'Bru', name: 'Instant Coffee (100g)', category: 'Coffee Powder', price: 180, stock: 50, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', icon: '☕' },
    { id: 65, brand: 'Nescafe', name: 'Classic Coffee (100g)', category: 'Coffee Powder', price: 320, stock: 50, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', icon: '☕' }
];
class DataStore {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
        }
    }

    // Products
    getProducts() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
    }

    saveProduct(product) {
        const products = this.getProducts();
        if (product.id) {
            const index = products.findIndex(p => p.id === product.id);
            products[index] = product;
        } else {
            product.id = Date.now();
            product.icon = this.getCategoryIcon(product.category);
            products.push(product);
        }
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return product;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }

    // Orders
    getOrders() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    }

    saveOrder(order) {
        const orders = this.getOrders();
        order.id = 'ORD-' + Date.now();
        order.timestamp = new Date().toISOString();
        orders.push(order);
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

        // Update stock
        const products = this.getProducts();
        order.items.forEach(item => {
            const p = products.find(prod => prod.id === item.id);
            if (p) p.stock -= item.qty;
        });
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

        return order;
    }

    deleteOrder(id) {
        let orders = this.getOrders();
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }

    getCategoryIcon(category) {
        const icons = {
            'Rice': '🌾',
            'Dals': '🥣',
            'Oil': '🍾',
            'Salt': '🧂',
            'Sugar & Sweeteners': '🍯',
            'Semiya': '🍜',
            'Pasta': '🍝',
            'Noodles': '🍜',
            'Tea Powder': '🍵',
            'Coffee Powder': '☕',
            'Masala': '🌶️',
            'Pickles': '🥒',
            'Sauces': '🥫',
            'Biscuits': '🍪',
            'Packaged Food': '🍱',
            'Ghee': '🧈',
            'Nuts': '🥜',
            'Shampoo': '🧴',
            'Detergent Powder': '🧺',
            'Liquid Detergent': '🧴',
            'Detergent Soap': '🧼',
            'Body Soap': '🧼',
            'Dishwash Soap': '🧽',
            'Dishwash Liquid': '🧽',
            'Nutritional Drink': '🥛',
            'Shaving Blade': '🪒',
            'Grains & Pulses': '🌾',
            'Chocolates': '🍫'
        };
        return icons[category] || '📦';
    }
}

const store = new DataStore();
window.store = store; // Make it globally accessible
