import { isThisSecond } from 'date-fns';
import {funcDropDown} from '../Plugins/materialize';
import currencyUI from './CurrencyUI';



class FavouriteTickets {
    constructor(dropDown, currency) {
     this.favourites = document.querySelector('.dropdown-trigger');  
     this.DropDown = dropDown(this.favourites);
     this.list = document.querySelector('.dropdown-content');
     this.currencySymbol = currency.getCurrencySymbol.bind(currency);;
     this.favourites = [];
    }

    addTicket(ticket) {
        this.favourites.push(ticket);
        this.displayTickets();
        console.log(this.favourites);
    }

    displayTickets()
    {   
        this.clear();
        this.favourites;
        if(!this.favourites) {
            return;
        }

        this.favourites.forEach(element => {       
        let fragment= '';
        fragment = FavouriteTickets.templateTicket(element, this.currencySymbol());
        this.list.insertAdjacentHTML('afterbegin', fragment);     
        });
    }

    clear () {
        this.list.innerHTML = '';
    }

    deleteFavouriteTicket(ticket) {
        if(!ticket){
            return'';
        }

        const newArr = this.favourites.filter(element => element.data_id !== ticket.data_id)
        this.favourites = newArr;
        this.displayTickets();
    }

    static templateTicket (ticket, symbol) {
        let name = '';
        if(!ticket.nameofAirlane.en){
            name = ticket.nameofAirlane;
        }
        else{
            name = ticket.nameofAirlane.en;
        }
        return `
        <li class="rowc">
        <div class="col favourite-ticket-item">
				<div class="card ticket-card">
					<div class="ticket-airline d-flex align-items-center">
						<img
							src="${ticket.logoAirplane}"
							class="ticket-airline-img"
						/>
						<span class="ticket-airline-name"
							>${ticket.nameofAirlane.en || ticket.nameofAirlane}</span
						>
					</div>
					<div class="ticket-destination d-flex align-items-center">
						<div class="d-flex align-items-center mr-auto">
							<span class="ticket-city">${name}</span>
							<i class="medium material-icons">flight_takeoff</i>
						</div>
						<div class="d-flex align-items-center">
							<i class="medium material-icons">flight_land</i>
							<span class="ticket-city">${ticket.destinationName}</span>
						</div>
					</div>
					<div class="ticket-time-price d-flex align-items-center">
						<span class="ticket-time-departure">${ticket.departure_at}</span>
						<span class="ticket-price ml-auto">${symbol}${ticket.price}</span>
					</div>
					<div class="ticket-additional-info">
						<span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
						<span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
					</div>
                    <div class="buttonClass">
                    <a class="waves-effect button-delete waves-light btn" data-ticket='${JSON.stringify(ticket)}'>Delete</a>
                    </div>
                    </li>
        `

    }
    

}

const favouriteTickets = new FavouriteTickets(funcDropDown, currencyUI);

export default favouriteTickets;