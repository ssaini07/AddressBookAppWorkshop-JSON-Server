// Section: 3 UC => 1 created utility function for validation purpose and linked it with Addinfo.html
const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if (!nameRegex.test(name))
        throw "First letter must be in uppercase and min 3 character long";
}

const checkPhone = (phone) => {
    let phoneRegex = RegExp('^[+][1-9]{2}[-][0-9]{10}$');
    if (!phoneRegex.test(phone))
        throw "Phone number should be (Ex:+91-1234567890)";
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^([A-Za-z0-9/.,-]{3,}.)+$');
    if (!addressRegex.test(address))
        throw "Sorry entered address is incorrect";
}