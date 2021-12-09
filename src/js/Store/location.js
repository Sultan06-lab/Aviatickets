import api from '../Service/apiService';
import { formatDate } from '../Helper/Date';


class Location {
    constructor(api, helpers){
        this.api = api;
        this.cities = null;
        this.countries = null;
        this.shortCitiesList = null;
        this.airlines = null;
        this.formatDate = helpers.formatDate;
    }

    async init(){
        let response = await Promise.all([this.api.getCities(), this.api.getCountries(), this.api.getAirlines()]);
        const [cities, countries, airlines] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        console.log(this.countries);
        console.log(this.cities);
        console.log(this.shortCitiesList);
        console.log(this.airlines);
        return response;
    }

    // addFavouriteTickets(ticket) {

    // }

    getCityCodeByKey(key) {
		const city = Object.values(this.cities).find((item) => item.fullName === key);
		return city.code;
	}


    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
            item.name = item.name || item.name_translations;
            acc[item.code] = item; 
            return acc;
        }, {})
    }

    getAirlineNameByCode(code) {
		return this.airlines[code] ? this.airlines[code].name : '';
	}

	getAirlineLogoByCode(code) {
		return this.airlines[code] ? this.airlines[code].logo : '';
	}


    createShortCitiesList(cities){
        return Object.entries(cities).reduce((acc, [, value]) => {
            acc[value.fullName] = null;
            return acc;
        }, {})
    }

    getCountryNameByCode(code){
		return this.countries[code].name;
	}
 

    serializeCountries(countries){
        return countries.reduce((acc, country) =>{
            acc[country.code] = country;
            return acc;
        }, {})
    }

    serializeCities(cities){
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCode(city.country_code);
            let fullName = `${city.name},${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
            fullName,
        }
            return acc;
        }, {});
    }
    
    getCityNameByCode(code){
        return this.cities[code].name;
    }

    async fetchTickets(params){
        const res = await this.api.prices(params);
        return this.serializeTickets(res.data);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map((ticket) => {
            return {
            ...ticket,
            originName: this.getCityNameByCode(ticket.origin),
            destinationName: this.getCityNameByCode(ticket.destination),
            logoAirplane: this.getAirlineLogoByCode(ticket.airline),
            nameofAirlane: this.getAirlineNameByCode(ticket.airline),
            departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
			return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
            data_id: Math.random(),
            };
        });
    }

}

const location = new Location(api, { formatDate });

export default location;
