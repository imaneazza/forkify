import ParentView from "./parentView";
import icons from 'url:../../img/icons.svg'
import previewView from './previewView'

class ResultView extends ParentView {
    _parentElement = document.querySelector('ul.results');
    _receipError = 'No recipes found for your query. Please try again!'
    _message = ''
    _generateMarkup() {
        return this._data.map(result => previewView.render(result,false)).join('')

    }


}

export default new ResultView();