let addressBookObject = {};
let isUpdate = false;
window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    validatePhone();
    validateAddress();
    checkForUpdate();
})

function validateName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
            textError.textContent = "";
        } catch (e) {
            console.error(e);
            textError.textContent = e;
        }
    });
}

function validatePhone() {
    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function() {
        if (phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            checkPhone(phone.value);
            phoneError.textContent = "";
        } catch (e) {
            console.error(e);
            phoneError.textContent = e;
        }
    });
}

function validateAddress() {
    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            checkAddress(address.value);
            addressError.textContent = "";
        } catch (e) {
            console.error(e);
            addressError.textContent = e;
        }
    });
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        if (Site_Properties.use_local_storage.match("true")) {
            createAndUpdateStorage();
            //alert("Data Stored With Name: " + addressBookObject._name);
            redirect();
        } else {
            alert("Data Stored With Name: " + addressBookObject._name);
            redirect();
            createOrUpdateAddressInJsonServer();
        }
    } catch (error) {
        console.log(e)
        return;
    }
}

function redirect() {
    console.log("redirect");
    //reset();
    window.location.replace(Site_Properties.home);
}

const setAddressBookObject = () => {

    //Here we are directly store values in addressBookObject
    // if (!isUpdate && Site_Properties.use_local_storage.match("true")) {
    //     addressBookObject.id = createNewBookId();
    // }
    addressBookObject._name = getInputValueId('#name');
    addressBookObject._phone = getInputValueId('#phone');
    addressBookObject._address = getInputValueId('#address');
    addressBookObject._city = getInputValueId('#city');
    addressBookObject._state = getInputValueId('#state');
    addressBookObject._zipcode = getInputValueId('#zipcode');

}

const createNewBookId = () => {
    let bookId = localStorage.getItem('BookId');
    bookId = !bookId ? 1 : (parseInt(bookId) + 1).toString();
    localStorage.setItem('BookId', bookId);
    return bookId;
}

// Section: 3 UC => 1 Here _id need to remove.
const createAndUpdateStorage = () => {
    let personList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (personList) {
        let existingPersonData = personList.find(personData => personData._id == addressBookObject.id);
        if (!existingPersonData) {
            personList.push(addressBookObject);
        } else {
            const index = personList.map(person => person._id).indexOf(addressBookObject.id);
            personList.splice(index, 1, addressBookObject);
        }
    } else {
        personList = [addressBookObject];
    }
    localStorage.setItem('AddressBookList', JSON.stringify(personList));
}

//Section: 3 UC => 3: Add data (POST)
function createOrUpdateAddressInJsonServer() {
    let url = Site_Properties.server_url;
    let methodCall = "POST";
    let message = "Data Stored with name: "; //replaced updated word with store

    makeServiceCall(methodCall, url, true, addressBookObject)
        .then(response => {
            alert(message + addressBookObject._name);
            redirect();
        }).catch(error => {
            console.log("Inside error")
            throw error
        });
}

const getInputValueId = (id) => {
    return document.querySelector(id).value;
}

const setTextValue = (id, value) => {
    let textError = document.querySelector(id);
    textError.textContent = value;
}

const setValue = (id, value) => {
    let element = document.querySelector(id);
    element.value = value;
}

//For redirecting to home page
const cancel = () => {
        window.location.replace(Site_Properties.home);
    }
    /*
    //Section : 3 UC => 4 Updating address book data on JSON server 
    const checkForUpdate = () => {
        let jsonData = localStorage.getItem('edit-person');
        isUpdate = jsonData ? true : false;
        if (!isUpdate)
            return;
        addressBookObject = JSON.parse(jsonData);
        setForm();
    }

    const setForm = () => {
        setValue('#name', addressBookObject._name);
        setValue('#phone', addressBookObject._phone);
        setValue('#address', addressBookObject._address);
        setValue('#city', addressBookObject._city);
        setValue('#state', addressBookObject._state);
        setValue('#zipcode', addressBookObject._zipcode);
    }

    const setValue = (id, value) => {
        let element = document.querySelector(id);
        element.value = value;
    }
    */