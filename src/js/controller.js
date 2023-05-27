import * as model from "./model.js";
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import recipeView from './views/recipeView';
import bookmarkView from './views/bookmarkView';
import searchView from './views/searchView';
import paginationView from './views/paginationView';
import resultView from './views/resultView'
import addRecipeView from "./views/addRecipeView";
import {CLOSE_MODAL} from "./config";

const recipeContainer = document.querySelector('.recipe');

const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1)
        if (!id) return;
        recipeView.renderSpinner()
        resultView.update(model.getSearchPage())
        bookmarkView.update(model.state.bookmark)

        await model.loadRecipe(id)
        //render recipe
        recipeView.render(model.state.recipe)
    } catch (err) {
        // console.log(err)
        recipeView.renderError()
    }
};
const controlSearch = async function () {
    try {
        resultView.renderSpinner();
        const query = searchView.getQuery();
        if (!query) return;
        await model.loadSearch(query)
        resultView.render(model.getSearchPage())

        paginationView.render(model.state.search)

    } catch (err) {
        // console.log(err)
        recipeView.renderError()
    }
}
const controlPagination = function (page) {
    resultView.render(model.getSearchPage(page))
    paginationView.render(model.state.search)

}
const controlServings = function (newServing) {
    //update the receipe servings
    model.updateServings(newServing)
    // recipeView.render(model.state.recipe)
    recipeView.update(model.state.recipe)

}
const controlAddBookmark = function () {
    if (model.state.recipe.bookmarked)
        model.deleteBookmarked(model.state.recipe.id);
    else model.addBookmark(model.state.recipe);
    recipeView.update(model.state.recipe)
    bookmarkView.render(model.state.bookmark)
}
const controlBookmarks = function () {
    bookmarkView.render(model.state.bookmark)
}
const controlCreateRecipe = async function (newRecipe) {
    try {
        addRecipeView.renderSpinner()
        console.log(newRecipe)
        await model.upload(newRecipe)
        recipeView.render(model.state.recipe)
        addRecipeView.renderMessage();
        bookmarkView.render(model.state.bookmark)
        window.history.pushState(null,'',`#${model.state.recipe.id}`)

        setTimeout(() =>
            addRecipeView.toggleWindow(), CLOSE_MODAL)

    } catch (e) {
        addRecipeView.renderError(e.message)
    }

}
const init = function () {
    recipeView.addHandlerRender(controlRecipe)
    searchView.addHandlerSearch(controlSearch)
    paginationView.addHandler(controlPagination)
    recipeView.addHandlerUpdateServings(controlServings)
    bookmarkView.addHandlerRender(controlBookmarks)
    recipeView.addHandlerBookmark(controlAddBookmark)
    addRecipeView.addHandleruplaodForm(controlCreateRecipe)
}

init();