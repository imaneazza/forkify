import ParentView from "./parentView";

class AddRecipeView extends ParentView {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
    _message = 'Recipe was successfully Uploaded !'
    constructor() {
        super();
        this._addHundlerShow();
        this._addHundlerHide();
     }
    toggleWindow(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }
    _addHundlerShow(){
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
    }

    _addHundlerHide(){
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
        this._overlay.addEventListener('click',this.toggleWindow.bind(this))
    }

    addHandleruplaodForm(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const data= [...new FormData(this)]
            const newData = Object.fromEntries(data)
            handler(newData)
        })
    }


    _generateMarkup() {


    }


}

export default new AddRecipeView();