import icons from 'url:../../img/icons.svg'

export default class ParentView {
    _data;

    render(data , render=true) {
        if (!data || (Array.isArray(data) && data.length ===0))
            return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        if(!render) return markup;
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    update(data){
        this._data = data;
        const markup = this._generateMarkup();
        // console.log(markup)
        const newDom= document.createRange().createContextualFragment(markup);
        const newElement = Array.from(newDom.querySelectorAll("*"));
        const curElemet = Array.from(this._parentElement.querySelectorAll('*'));
        // console.log(curElemet,newElement)
        newElement.forEach((newE,i)=>{
            const curEl = curElemet[i];
            // console.log(curEl)
            if(!newE.isEqualNode(curEl) && curEl.firstChild && curEl.firstChild.nodeValue.trim() !==''){
                curEl.textContent = newE.textContent;
                // console.log('done')
            }
            if(!newE.isEqualNode(curEl) ){
                Array.from(newE.attributes).forEach(att=>
                    curEl.setAttribute(att.name,att.value)
                )
            }


        })


    }


    _clear() {
        this._parentElement.innerHTML = ''
    }


    renderError(message = this._receipError) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderSpinner() {
        const markup = `
  <div class="spinner">
           <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
`
        this._parentElement.innerHTML = ''
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
}