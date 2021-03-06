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
        ${Leaderboard()}
        </section>
        </div>

        <section class="new__rules data">
        ${Rules()}
        </section>
        </div>
    `
}


mainContainer.addEventListener("click",
    clickEvent => {
        if (clickEvent.target.id === "start__button") {
            const newPlayer = document.querySelector(".new__player")
            const newTeam = document.querySelector(".new__team")
            const gamePlay = document.querySelector(".game__play")
            newPlayer.innerHTML = `<h2>New Player</h2>
            ${newPlayerForm()}`
            newTeam.innerHTML = `<h2>New Team</h2>
            ${newTeamForm()}`
            gamePlay.innerHTML = `${selectGameplayTeams()}`
        }
    })


export const Rules = () => {
    let html = `
    <div class="rules__field">
        <h2>Rules</h2>
        <ol>
         <li>Three teams. Three players per team. Three rounds per game.</li>
         <li>Each round, one team (role: Knights) throws a ball at one of six flagons. If the ball enters, this team wins {2 pts}; else, if it lands on the table {1pt}; else, {0pts}.</li>
         <li>Another team (role: Goblins) guards the flagons with small wooden truncheons. If the ball fails to hit a flagon or the table, this team wins {1pt}; else, {0pts}.
         </li>
         <li>The third team (role: Fairies) seeks to distract the other two teams. If the ball is dropped or thrown out of play, this team wins {1pt}; else, {0pts}.
         </li>
         <li>Each team switches to a new role each round.
         </li>
         <li>The team with the greatest number of points at the end of Round Three wins.</li>
        </ol>
    </div>
    `
    return html
}