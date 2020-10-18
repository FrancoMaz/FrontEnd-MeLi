const CategoryService = require("../../service/categoryService");

//Función que ordena las categorías del servicio de search por cantidad de resultados
function sortCategories(categories) {
    return categories.sort((a, b) => (a.results < b.results) ? 1 : -1);
}

//Función que obtiene las categorías a devolver. Dado un id, se va al servicio de categorías para obtener las que se deben devolver
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

//Función que ejecuta las dos funciones anteriores
async function sortAndMapCategories(categories) {
    let categoriesSorted = sortCategories(categories);
    return await mapCategories(categoriesSorted[0].id)
}

module.exports = {
  sortCategories,
  mapCategories,
  sortAndMapCategories
};