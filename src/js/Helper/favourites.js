class favouritesButton {
    constructor() {
        this.favouriteButton = document.querySelector('.dropdown-content');      
        this.link = document.querySelector('.dropdown-trigger'); 
    }

    async checkFavouriteButton() {
        await this.link.addEventListener('click', () =>
        {
            // const fragment = '';
            if(!this.favouriteButton.children) {
                // fragment = favouritesButton.checkTemplate();
                this.favouriteButton.innerHTML = '<div>Hello</div>';
            }
            // this.favouriteButton.insertAdjacentHTML('afterbegin', fragment);
        })
    }

    // static checkTemplate() {
    //     return `
    //     <div>Нет выбранных билетов</div>
    //     `
    // }
}

export default favouritesButton;