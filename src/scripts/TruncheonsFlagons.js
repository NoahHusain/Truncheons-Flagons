import { newPlayerForm } from "./Providers./PlayerProvider.js";
import { newTeamForm } from "./Providers./TeamProvider.js";
// import {  } from "module";


// Import all functions that render HMTL. 
// Then send TruncheonsFlagons function to main to be invoked to get them on the DOM
export const TruncheonsFlagons = () => {
    return `
    <h1>Truncheons and Flagons</h1>

    <article class="choices">
        <section class="new__player">
            <h2>New Player</h2>
            ${newPlayerForm()}
        </section>
        <section class="new__team">
            <h2>New Team</h2>
            ${newTeamForm()}
        </section>

        <section class="new__leaderboard">
            <h2>Leaderboard</h2>
        </section>

        <section class="start__game">
        <button class="button" id="start__button">Start Game</button>
        </section>
    `
}