import categoryViwe from "./categoryViwe.js";
import productViwe from "./productViwe.js";

document.addEventListener('DOMContentLoaded', () => {
    categoryViwe.setApp();
    categoryViwe.createCategoriesList();
    productViwe.createProductsList(productViwe.product);
})