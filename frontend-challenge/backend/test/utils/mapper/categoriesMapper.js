import {sortCategories, mapCategories, sortAndMapCategories} from "../../../src/utils/mapper/categoriesMapper";
const categoriesMock = require('../../resources/mocks/categories.json');

test('SortCategories should sort a list of categories by results', () => {

    expect(sortCategories(categoriesMock)[0].id).toEqual("MLA412445");
});

test('MapCategories should return the path of categories given an id', async () => {

    const categories = await mapCategories("MLA412445");

    expect(categories.length).toEqual(2);
    expect(categories[0]).toEqual("Libros, Revistas y Comics");
    expect(categories[1]).toEqual("Libros");

});

test('SortAndMapCategories should return the path of categories of the category with more results', async () => {

    const pathOfCategories = await sortAndMapCategories(categoriesMock);

    expect(pathOfCategories.length).toEqual(2);
    expect(pathOfCategories[0]).toEqual("Libros, Revistas y Comics");
    expect(pathOfCategories[1]).toEqual("Libros");

});