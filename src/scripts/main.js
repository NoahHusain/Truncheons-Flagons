import { TruncheonsFlagons } from "TruncheonsFlagons.js";

const mainContainer = document.querySelector("#container")

const renderHTML = () => {
    mainContainer.innerHTML = TruncheonsFlagons()
}

renderHTML()