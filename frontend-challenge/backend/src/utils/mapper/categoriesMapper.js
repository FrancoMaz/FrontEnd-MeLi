const CategoryService = require("../../service/categoryService");

function sortCategories(categories) {
    return categories.sort((a, b) => (a.results < b.results) ? 1 : -1); //Ordeno para quedarme con la categoría que tiene más resultados
}

async function mapCategories(categoryId) {
    let categoriesNames = [];
    let categoryServiceResponse = await CategoryService(categoryId);
    //Si no vienen las categorías, no devuelvo error pero devuelvo un vector vacío
    if (!categoryServiceResponse) {
        return categoriesNames;
    }
    //Path_from_root contiene las categorías a devolver en el endpoint, que son las que se deben mostrar en el breadcrumb
    categoryServiceResponse.path_from_root.forEach(category => {
        categoriesNames.push(category.name);
    });
    return categoriesNames;
}

async function sortAndMapCategories(categories) {
    let categoriesSorted = sortCategories(categories);
    return await mapCategories(categoriesSorted[0].id)
}

module.exports = {
  sortCategories,
  mapCategories,
  sortAndMapCategories
};