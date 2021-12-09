import { getAutocompleteInstance, getDatePickerInstance } from '../plugins/materialize';

class FormUI {
	constructor(autoCompleteInstance, datepickerInstance) {
		this._form = document.forms['ticket-form'];

		this.origin = document.getElementById('autocomplete-origin');
		this.destination = document.getElementById('autocomplete-destination');
		this.depart = document.getElementById('datepicker-depart');
		this.return = document.getElementById('datepicker-return');

		this.originAutocomplete = autoCompleteInstance(this.origin);
		this.destinationAutocomplete = autoCompleteInstance(this.destination);
		this.departDatePicker = datepickerInstance(this.depart);
		this.returnDatePicker = datepickerInstance(this.return);
	}

	get form() {
		return this._form;
	}

    get originValue() {
        return this.origin.value; 
    }

    get destinationValue() {
        return this.destination.value; 
    }

    get departDate() {
        return this.departDatePicker.toString(); 
    }

    get returnDate() {
        return this.returnDatePicker.toString(); 
    }


	setAutocompleteData(data) {
		this.originAutocomplete.updateData(data);
		this.destinationAutocomplete.updateData(data);
	}
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;