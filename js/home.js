let addressBookList;

window.addEventListener('DOMContentLoaded', (event) => {
    if (Site_Properties.use_local_storage.match("true")) {
        getDataFromLocalStorage();
    } else
        getAddressDataFromServer();
});

// Section: 3 UC => 2 
function processAddressDataResponse() {
    document.querySelector('.person-count').textContent = addressBookList.length;
    createInnerHTML();
}

const getDataFromLocalStorage = () => {
    addressBookList = localStorage.getItem('AddressBookList') ?
        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processAddressDataResponse(); // Section: 3 UC => 2 
}

// Section: 3 UC => 2 Retrieving address book data from JSON server 
const getAddressDataFromServer = () => {
    makeServiceCall("GET", Site_Properties.server_url, true) //When we performing GET operation this needs to be true
        .then(response => {
            addressBookList = JSON.parse(response);
            console.log("Data Is getting: " + addressBookList);
            processAddressDataResponse();
        })
        .catch(error => {
            console.log("Get Error Status : " + JSON.stringify(error));
            addressBookList = [];
            processAddressDataResponse();
        })
}

// Section: 3 UC => 2 
const createInnerHTML = () => {

        const headerHtml = `<tr>
    <th>Fullname</th>
    <th>Phone Number</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zipcode</th>
    <th>Actions</th>
</tr>`;
        if (addressBookList.length == 0) return;
        let innerHtml = `${headerHtml}`;
        for (const addressBookData of addressBookList) {
            innerHtml = `${innerHtml}

<tr>
    <td>${addressBookData._name}</td>
    <td>${addressBookData._phone}</td>
    <td>${addressBookData._address}</td>
    <td>${addressBookData._city}</td>
    <td>${addressBookData._state}</td>
    <td>${addressBookData._zipcode}</td>
    <td>
    <img id="${addressBookData.id}" alt="edit" src="../assets/icons/create-black-18dp.svg" onClick=update(this)>
    <img id="${addressBookData.id}" alt="delete" src="../assets/icons/delete-black-18dp.svg" onClick=remove(this)>
    </td>
</tr> 
    `;
        }
        document.querySelector('#display').innerHTML = innerHtml;
    }
    /*
    //Section: 2 UC => 5 Ability to Remove a Contact from the address book entries.
    const remove = (data) => {
        let bookData = addressBookList.find(personData => personData.id == data.id);
        if (!bookData)
            return;
        const index = addressBookList.map(personData => personData.id).indexOf(bookData.id);
        addressBookList.splice(index, 1);
        localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
        document.querySelector('.person-count').textContent = addressBookList.length;
        createInnerHTML();
        alert("Person address has been deleted successfully")
    }

    //Section: 3 UC => 4 Updating address book data on JSON server.
const update = (data) => {
    let addBookData = addressBookList.find(personData => personData.id == data.id);
    if (!addBookData)
        return;
    localStorage.setItem('edit-person', JSON.stringify(addBookData));
    window.location.replace(Site_Properties.addPerson);
}
*/