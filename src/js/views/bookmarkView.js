import ParentView from "./parentView";
import previewView from './previewView'

class BookmarkView extends ParentView {
    _parentElement = document.querySelector('ul.bookmarks__list');
    _receipError = 'No bookmarks yet. Find a nice recipe and bookmark it :)'
    _message = ''

    addHandlerRender(handler){
        window.addEventListener('load',handler)

    }

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')

    }


}

export default new BookmarkView();