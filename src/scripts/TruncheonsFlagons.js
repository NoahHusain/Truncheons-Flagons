import { Leaderboard } from "./Lists/ScoreList.js";
import { newPlayerForm } from "./Providers/PlayerProvider.js";
import { newTeamForm } from "./Providers/TeamProvider.js";
import { selectGameplayTeams } from "./Lists/TeamList.js";
// import {  } from "module";

const mainContainer = document.querySelector("#container")

// Import all functions that render HMTL. 
// Then send TruncheonsFlagons function to main to be invoked to get them on the DOM
export const TruncheonsFlagons = () => {
    return `
    <h1>Truncheons and Flagons</h1>
    <div class="truncheons__container">
    <article class="choices">
        <section class="new__player data">
            <h2>New Player</h2>
            ${newPlayerForm()}
        </section>
        <section class="new__team data">
            <h2>New Team</h2>
            ${newTeamForm()}
        </section>
        </article>
        
        <section class="game__play">
        <button class="button" id="start__button">Start Game</button>
        </section>

        <section class="new__leaderboard data">
        <h2>Leaderboard</h2>
        ${Leaderboard()}
        </section>
        </div>
    `
}


mainContainer.addEventListener("click",
    clickEvent => {
        if (clickEvent.target.id === "start__button") {
            const gamePlay = document.querySelector(".game__play")
            gamePlay.innerHTML = `${selectGameplayTeams()}`
        }
    })
