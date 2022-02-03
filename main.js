class Contact {

    constructor(fname, lname, email, phone, nationality, gender) {

        this.firstName = fname
        this.lastName = lname
        this.email = email
        this.phone = phone
        this.nationality = nationality
        this.gender = gender
    }
}
class ContactList {
    constructor() {
        this.list = []
    }

    add(contact) {
        this.list.push(contact)
        tBody.innerHTML = ""
        this.list.forEach((item, index) => {
            let TR = document.createElement("tr");
            TR.innerHTML = `
                            <th class="counter" scope="row">${index+1}</th>
                            <td>${item.firstName+" "+item.lastName}</td>
                            <td>${item.email}</td>
                            <td>${item.phone}</td>
                            <td>${item.gender}</td>
                            <td>${item.nationality}</td>
                            <td><button class="delete bg-danger border-none">Delete</button></td>
                        `
            tBody.appendChild(TR);
            TR.addEventListener('click', Remove)
        });

    }
    numberOfContacts() {
        return this.list.length
    }

    delete(name) {

        this.list.forEach((row, index) => {
            if (name == row.firstName + " " + row.lastName)
                this.list.splice(index, 1);
        });

    }
    refresh() {
        fName.value = ""
        lName.value = ""
        email.value = ""
        phone.value = ""
        nationality.value = "selected"
    }
}
const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const email = document.getElementById("Email");
const phone = document.getElementById("tell");
const nationality = document.getElementById("nationality");
const btn = document.getElementById("submitBtn");
const tBody = document.getElementById("tableBody");
const gender = document.querySelectorAll('input[name=gender]');
let contactList = new ContactList()
let count = 0;
btn.addEventListener('click', submit);


function submit(e) {
    e.preventDefault();
    document.querySelectorAll('.invalid-feedback').forEach((e) => {
        e.remove();
    })
    document.querySelectorAll('.is-invalid').forEach((e) => {
        e.classList.remove('is-invalid');
    })
    try {
        validate(fName, 'fname')
    } catch (error) {
        Catch(fName, error)
    }

    try {
        validate(lName, 'lname')
    } catch (error) {
        Catch(lName, error)
    }

    try {
        validate(phone, 'phone')
    } catch (error) {
        Catch(phone, error)
    }

    try {
        validate(email, 'email')
    } catch (error) {
        Catch(email, error)
    }

    let newContact = new Contact(fName.value, lName.value, email.value, phone.value, nationality.value, displayRadioValue())
        //localStorage.setItem((fName.value + " " + lName.value), JSON.stringify(newContact))
    contactList.add(newContact)
    contactList.refresh()
        //console.log(contactList)






}

function displayRadioValue() {
    for (i = 0; i < gender.length; i++) {
        if (gender[i].checked)
            return gender[i].value;
    }
}

function Remove(e) {
    // console.log(e.target.parentNode.parentNode.children[1].innerText)
    contactList.delete(e.target.parentNode.parentNode.children[1].innerText)
    console.log(contactList)

    if (e.target.classList.contains('delete')) {
        e.target.parentNode.parentNode.remove();
    }

    document.querySelectorAll("tr").forEach((tr, index) => {
        if (tr.querySelector("th").parentElement.parentElement.id == 'tableBody') {
            tr.querySelector("th").innerHTML = index;
            count = index;
        }
    })
}

function validate(input, type) {

    if (!input.value) {
        console.log(input);
        throw `${input.value}isn't valid!`
    }
    if (type == "fname") {
        if (input.value.length > 30) {

            throw "max size exceeded"
        }
    } else if (type == "phone") {
        if (phone.value.length > 11) {
            throw "phone is not valid"
        } else if (isNaN(input.value)) {
            throw "phone must be a number"

        }
    } else if (type == "email") {
        if (!validateEmail(input.value)) {
            throw "email is not valid"
        }
    }


    return true
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function Catch(element, error) {
    console.log(element);
    element.classList.add("is-invalid")
    const textErr = document.createElement("div");
    textErr.classList.add("invalid-feedback");
    textErr.innerText = error
    element.parentElement.append(textErr);
}