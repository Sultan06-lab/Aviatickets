import '../css/style.css'
import location from "./Store/location";
import './Plugins'
import formUI from './Views/Form'
import currencyUI from './Views/CurrencyUI'
import ticketsUI from './Views/TicketsUI';
import favouriteTickets from './Views/FavouriteTickets';
import favouritesButton from './Helper/favourites'; 


document.addEventListener('DOMContentLoaded', (e) => {
	const form = formUI.form;

    initApp();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onHandleSubmit();
    })

	async function initApp() {
		await location.init();
		formUI.setAutocompleteData(location.shortCitiesList);
        favouritesButton.checkFavouriteButton;
	}

    async function onHandleSubmit() {
        const origin = location.getCityCodeByKey(formUI.originValue);
        const destination = location.getCityCodeByKey(formUI.destinationValue);
        const departDate = formUI.departDate;
        const returnDate = formUI.returnDate;
        const currency = currencyUI.currencyValue
        

       const result = await location.fetchTickets({origin, destination, departDate, currency})
       ticketsUI.ticketsRender(result);
       console.log(location.serializeTickets(result));


        ticketsUI.container.addEventListener('click', (e) => {

            console.log(e.target);
            const ticket = JSON.parse(e.target.getAttribute('data-ticket'));
            console.log(ticket);
            favouriteTickets.addTicket(ticket);
            e.target.className = "buttonClass teal darken-3 btn-small "
            M.toast({ html: 'Билет добавлен в избранное', classes: 'green darken-3', displayLength: 5000 });
        });

        favouriteTickets.list.addEventListener('click', (e) => {
            if (e.target.className = 'button-delete'){
                console.log('b');
            }

            const ticket = JSON.parse(e.target.getAttribute('data-ticket'));
            favouriteTickets.deleteFavouriteTicket(ticket);
            M.toast({ html: 'Билет удален из избранное', classes: 'green darken-3', displayLength: 5000, margin: ' 0 auto' });        
        })
    }   

});
