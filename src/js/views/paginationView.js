import ParentView from "./parentView";
import icons from 'url:../../img/icons.svg'

class PaginationView extends ParentView {
    _parentElement = document.querySelector('.pagination');

    _getPreviousPage(currentPage) {

        return `
    <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
    `
    }

    _getNextPage(currentPage) {
        return `
         <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.result.length / this._data.resultsPerPage)
        // console.log(numPages)
        const currentPage = this._data.page

        // page 1 and more
        if (currentPage == 1 && numPages > 1) {
            return this._getNextPage(currentPage)
        }

        //last
        if (currentPage == numPages && numPages > 1) {
            return this._getPreviousPage(currentPage);
        }
        //other
        if (currentPage < numPages) {
            return `
            ${this._getPreviousPage(currentPage)}
            ${this._getNextPage(currentPage)}
          `
        }

        //page 1 no more
        return ``
    }
    addHandler(handler){
        this._parentElement.addEventListener('click', (e)=>{
            const btn = e.target.closest('.btn--inline');
            if(!btn) return ;
            const goto = Number(btn.dataset.goto);
            // console.log(btn,goto)
            handler(goto)
        })
    }

}

export default new PaginationView();