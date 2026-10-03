const products = [{
        id: 1,
        title: "React.js",
        category: 'frontEnd',
        createdAt: '2021-10-31T15:02:00.411Z'
    },
    {
        id: 2,
        title: "Node.js",
        category: 'backEnd',
        createdAt: '2021-10-31T15:03:23.556Z'
    },
    {
        id: 3,
        title: "Vue.js",
        category: 'frontEnd',
        createdAt: '2021-11-01T10:47:26.889Z'
    },
];

const categories = [{
        id: 1,
        title: "frontEnd",
        description: "frontend of application",
        createdAt: '2021-10-01T10:47:26.889Z'
    },
    {
        id: 2,
        title: "backEnd",
        description: "the backend of application",
        createdAt: '2021-11-01T10:47:26.889Z'
    }
];

export default class Storage {

    // همه دسته‌بندی‌ها رو از مرورگر می‌خونه و مرتب برمی‌گردونه //
    static getAllCategories() {
        const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
        return savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
        })
    }

    // اگه دسته‌بندی جدید باشه اضافه می‌کنه، اگه قبلاً بوده ویرایش می‌کنه //
    static saveCategories(categoryToSave) {
        const savedCategories = Storage.getAllCategories();

        const existedItem = savedCategories.find((c) => c.id == categoryToSave.id);
        if (existedItem) {
            existedItem.title = categoryToSave.title;
            existedItem.description = categoryToSave.description;
        } else {
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }
        localStorage.setItem('category', JSON.stringify(savedCategories));
    }

    // همه دسته‌بندی‌ها رو از مرورگر می‌خونه و مرتب برمی‌گردونه //
    static getAllProducts() {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        return savedProducts.sort((a, b) => {
            return new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1;
        })
    }

    // اگه دسته‌بندی جدید باشه اضافه می‌کنه، اگه قبلاً بوده ویرایش می‌کنه //
    static saveProducts(productToSave) {
        const savedProducts = Storage.getAllProducts();

        const existedItem = savedProducts.find((c) => c.id === productToSave.id);
        if (existedItem) {
            existedItem.title = productToSave.title;
            existedItem.quantity = productToSave.quantity;
            existedItem.category = productToSave.category;
        } else {
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave);
        }
        localStorage.setItem('products', JSON.stringify(savedProducts));
    }

    // ← متد جدید برای حذف
    static deleteProduct(id) {
        const savedProducts = Storage.getAllProducts();
        const filteredProducts = savedProducts.filter(p => p.id != id);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
    }

    static seedData() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify(products));
        }
        if (!localStorage.getItem('category')) {
            localStorage.setItem('category', JSON.stringify(categories));
        }
    }
    
}