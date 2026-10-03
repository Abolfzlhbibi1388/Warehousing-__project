import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById('add-new-product');
const searchInput = document.getElementById('search-input');
const productsList = document.getElementById('products-list');

class productView {

    constructor() {
        addNewProductBtn.addEventListener('click', (e) => this.addNewProduct(e));
        searchInput.addEventListener('input', (e) => this.searchProducts(e));
        productsList.addEventListener('click', (e) => this.deleteProduct(e));
        this.product = Storage.getAllProducts();
        this.createProductsList(this.product);
        Storage.seedData();
    }

    addNewProduct(e) {
        e.preventDefault();
        let title = document.getElementById('product-title').value;
        let quantity = document.getElementById('product-quantity').value;
        let category = document.getElementById('product-category').value;
        if (!title || !quantity || !category) return;

        Storage.saveProducts({
            title,
            quantity,
            category
        });
        this.product = Storage.getAllProducts();
        this.createProductsList(this.product);

        // پاک کردن فرم بعد از ثبت
        document.getElementById('product-title').value = '';
        document.getElementById('product-quantity').value = '';
        document.getElementById('product-category').value = '';
    }

    deleteProduct(e) {
        const deleteBtn = e.target.closest('[data-id]');
        if (!deleteBtn) return;

        const id = deleteBtn.dataset.id;
        Storage.deleteProduct(id);
        this.product = Storage.getAllProducts();
        this.createProductsList(this.product);
    }

    createProductsList(products) {
        let result = '';

        products.forEach((item) => {
            const selectedCategory = Storage.getAllCategories().find((c) => c.id == item.category);
            const categoryTitle = selectedCategory ? selectedCategory.title : 'بدون دسته‌بندی';

            result += `
            <div class="flex items-center justify-between mb-2">
                <span class="text-slate-400 font-bold">${item.title}</span>
                <div class="gap-x-3 flex">
                    <span class="font-bold text-slate-400">${new Date().toLocaleDateString('fa-IR')}</span>
                    <span class="border-slate-400 text-slate-400 border rounded-2xl py-0.5 px-3">${categoryTitle}</span>
                    <span class="bg-slate-400 border-2 border-slate-300 rounded-[100%] py-1 px-2 text-center text-slate-200">${item.quantity}</span>
                    <button class="border border-red-400 text-red-400 px-3 py-0.5 rounded-2xl" data-id="${item.id}">delete</button>
                </div>
            </div>`;
        });

        productsList.innerHTML = result;
    }

    searchProducts(e) {
        const value = e.target.value.trim().toLowerCase();
        const filteredProducts = value ?
            this.product.filter(p => p.title.toLowerCase().includes(value)) :
            this.product;
        this.createProductsList(filteredProducts);
    }
    
}

export default new productView();