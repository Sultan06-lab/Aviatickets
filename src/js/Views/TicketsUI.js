import currencyUI from './CurrencyUI';

class TicketsUI {
    constructor(currency){
        this.container = document.querySelector('.row');
        this.currencySymbol = currency.getCurrencySymbol.bind(currency);
    }

    ticketsRender(tickets) {

        this.clearContainer();

        if (!tickets) {
            this.showEmptyMessage();
            return;
        }

        let fragment = '';

        tickets.forEach(ticket => {
            const component = TicketsUI.templateTicket(ticket, this.currencySymbol());
            fragment += component;
        });

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        this.container.innerHTML = '';

    }

    showEmptyMessage() {
        const ticket = TicketsUI.staticShowEmptyMessage();
        this.container.insertAdjacentHTML('afterbegin', ticket);
    }

    static temlateShowEmptyMessage () {
        return `
        <div class="tickets-empty-res-msg">
				По вашему запросу билетов не найдено.
			</div>
        `;
    }

    static templateTicket (ticket, symbol) {

        const id = Math.random();
        let name = '';
        if(!ticket.nameofAirlane.en){
            name = ticket.nameofAirlane;
        }
        else{
            name = ticket.nameofAirlane.en;

        }
        return `
        <div class="col s12 m6">
				<div class="card ticket-card">
					<div class="ticket-airline d-flex align-items-center">
						<img
							src="${ticket.logoAirplane}"
							class="ticket-airline-img"
						/>
						<span class="ticket-airline-name"
							>${name}</span
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
                    <a class="waves-effect button-add waves-light btn" data-ticket='${JSON.stringify(ticket)}'>Add to favourites</a>
                    </div>
                    </div>
                    </div>
                    
        `

    }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;