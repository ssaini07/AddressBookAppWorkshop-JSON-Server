//UC => 6
class AddressBookApp {
    id;

    // UC => 7
    get name() {
        return this._name;
    }
    set name(name) {
        const nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        } else {
            throw "First letter must be in uppercase and min 3 character long";
        }
    }

    // UC => 7
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        const phoneRegex = RegExp('^[+][1-9]{2}[-][0-9]{10}$');
        if (phoneRegex.test(phone)) {
            this._phone = phone;
        } else {
            throw "Phone number should be (Ex:+91-1234567890)";
        }
    }

    // UC => 7
    get address() {
        return this._address;
    }
    set address(address) {
        const addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
        if (addressRegex.test(address)) {
            this._address = address;
        } else {
            throw "Sorry entered address is incorrect";
        }
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }

    get zipcode() {
        return this._zipcode;
    }
    set zipcode(zipcode) {
        this._zipcode = zipcode;
    }

    //method to get values UC => 7
    toString() {

        return "id : " + this._id + ", name : " + this._name + ", phone : " + this._phone + ", address : " + this._address +
            ", city : " + this.city + ", state : " + this._state + ", zipcode : " + this._zipcode;

    }
}