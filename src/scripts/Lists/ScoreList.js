import { getScores } from "../databaseAccess"


export const Leaderboard = () => {
    const scores = getScores()

    return `
        <h2>Leaderboard</h2>
        ${
            scores.map(
                (scoreObject) => {
                    return `
                        <div>
                            <ul>
                                <li>${scoreObject.name}</li>
                            </ul>
                        </div>
                    `
                }
            ).join("")
        }
    `
}
