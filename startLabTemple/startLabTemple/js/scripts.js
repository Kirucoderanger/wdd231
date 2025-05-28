import { temples } from "../data/temples.js";
//console.log(temples);

import { url } from "../data/temples.js";
//console.log(url);

const showHere = document.querySelector("#showHere")
const mydialog = document.querySelector("#mydialog")
const mytitle = document.querySelector("#mydialog h2")
const myinfo = document.querySelector("#mydialog p")
const myclose = document.querySelector("#mydialog button")

myclose.addEventListener("click", () => mydialog.close())

function displayItems (data) {
    console.log(data)
    data.forEach(element => {
        console.log(element)
        const photo = document.createElement("img")
        photo.src = `${url}${element.path}`
        photo.alt = element.name

        photo.addEventListener("click", () => showStuff(element));

        showHere.appendChild(photo)
    });

}

displayItems(temples)

function showStuff(element){
    mytitle.innerHTML = element.name
    mydialog.showModal()
    //myinfo.innerHTML = element.dedicated,element.person
    myinfo.innerHTML = `Dedicated: ${element.dedicated} By: ${element.person} No.${element.number}`
}