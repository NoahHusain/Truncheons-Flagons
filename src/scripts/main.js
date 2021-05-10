import { TruncheonsFlagons } from "./TruncheonsFlagons.js";

// Target where to place the HMTL
const mainContainer = document.querySelector("#container")

// Invoke TruncheonsFlagons and put all the html elements in the DOM
const renderHTML = () => {
    mainContainer.innerHTML = TruncheonsFlagons()
}

// Invoke render function
renderHTML()