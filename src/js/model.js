import {API_URL, KEY, RES_PER_PAGE} from "./config.js";
import {AJAX} from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmark: []
}
const createRecipe = function (data) {
    let {recipe} = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key})
    }
}
export const loadRecipe = async function (id) {
    try {
        let data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
        state.recipe = createRecipe(data)
        state.recipe.bookmarked = !!state.bookmark.some(book => book.id == id)

        // console.log(state.recipe)
    } catch (err) {
        // console.log(err)
        throw err
    }
}
export const loadSearch = async function (query) {
    try {
        state.search.query = query
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
        // console.log(data)
        state.search.result = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && {key: recipe.key})

            }
        })
        state.search.page = 1;
        // console.log(state.search)
    } catch (err) {
        // console.log(err)
        throw err
    }
}
export const getSearchPage = function (page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage
    return state.search.result.slice(start, end)
}
const persistBookmark = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmark))
}
export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    })
    state.recipe.servings = newServings;

}
export const addBookmark = function (recipe) {
    state.bookmark.push(recipe);
    console.log(state)
    state.recipe.bookmarked = (recipe.id == state.recipe.id)
    persistBookmark()

}
export const deleteBookmarked = function (id) {
    const index = state.bookmark.findIndex(el => el.id == id);
    state.bookmark.splice(index, 1);
    state.recipe.bookmarked = !(id == state.recipe.id)
    persistBookmark()

}
const init = function () {
    const storage = localStorage.getItem('bookmarks')
    console.log(JSON.parse(storage))
    if (storage) state.bookmark = JSON.parse(storage)
    console.log(state)
}
init()

export const upload = async function (data) {
    try {
        const ings = Object.entries(data).filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
            .map(ing => {
                const arr = ing[1].replaceAll(' ', '').split(',');
                if (arr.length !== 3) throw new Error('wrong ingredients format ')
                const [quantity, unit, description] = arr;
                return {quantity: quantity ? +quantity : null, unit, description}
            });
        data.ingredients = ings;
        console.log(data)
        const recipe = {
            title: data.title,
            publisher: data.publisher,
            source_url: data.sourceUrl,
            image_url: data.image,
            servings: +data.servings,
            cooking_time: +data.cookingTime,
            ingredients: data.ingredients
        }
        console.log(recipe)
        const dataPOst = await AJAX(`${API_URL}?key=${KEY}`, recipe)
        state.recipe = createRecipe(dataPOst)
        addBookmark(state.recipe);

    } catch (e) {
        throw e
    }

}
