// titel , description => {} => saveCategory => ...

import Storage from "./Storage.js";

const titleCategory = document.getElementById('categoty-title');
const descriptionCategory = document.getElementById('categoty--description');
const addNewCategoryBtn = document.getElementById('add-new-category');

class categoryViwe {
    constructor() {
        addNewCategoryBtn.addEventListener('click', (e) => this.addNewCategory(e));
        this.categories = [];
    }

    addNewCategory(e) {
        e.preventDefault();
        let title = titleCategory.value;
        let description = descriptionCategory.value;
        if (!title || !description) return;
        Storage.saveCategories({
            title,
            description
        })
        this.categories = Storage.getAllCategories();
        this.createCategoriesList();
        titleCategory.value = "";
        descriptionCategory.value = "";
    }

    setApp() {
        this.categories = Storage.getAllCategories();
    }

    createCategoriesList() {
        let result = `<option class="bg-slate-500 text-slate-300" value="">slect a category</option>`;
        this.categories.forEach(element => {
            result += `<option class="bg-slate-500 text-slate-300" value="${element.id}">${element.title}</option>`
        });
        const categoryDOM = document.getElementById('product-category');
        categoryDOM.innerHTML = result;
    }
}

export default new categoryViwe();