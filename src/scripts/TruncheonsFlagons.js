import { newPlayerForm  } from "PlayerList.js";
import { newTeamForm  } from "TeamList.js";
import {  } from "module";



export const TruncheonsFlagons = () => {
    return `
    <h1>Truncheons and Flagons</h1>

    <article class="choices">
        <section class="new__player ">
            <h2>New Player</h2>
            ${newPlayerForm()}
        </section>
        <section class="new__team ">
            <h2>New Team</h2>
            ${newTeamForm()}
        </section>

        <section class="new__team ">
            <h2>Leaderboard</h2>
            ${Leaderboard()}
        </section>
    `
}