import { fetchPlayers, fetchScores, fetchTeams } from "./databaseAccess.js";
import { TruncheonsFlagons } from "./TruncheonsFlagons.js";

// Target where to place the HMTL
const mainContainer = document.querySelector("#container")

// Invoke TruncheonsFlagons and put all the html elements in the DOM
const renderHTML = () => {
    fetchPlayers().then(fetchScores).then(fetchTeams).then(
        () => {

            mainContainer.innerHTML = TruncheonsFlagons()
        }
    )
}

mainContainer.addEventListener(
    "stateChanged",
    CustomEvent => {
        renderHTML()
    }
)

// Invoke render function
renderHTML()