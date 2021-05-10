const applicationState =  {
    teams: [],
    players: [],
    scores: []
}


// API fetch functions
export const fetchTeams = () => {
    return fetch ("http://localhost:8088/teams")
    .then(response => response.json())
    .then(data => {
        applicationState.teams = data
    })
}


export const fetchPlayers = () => {
    return fetch ("http://localhost:8088/players")
    .then(response => response.json())
    .then(data => {
        applicationState.players = data
    })
}


export const fetchScores = () => {
    return fetch ("http://localhost:8088/scores")
    .then(response => response.json())
    .then(data => {
        applicationState.scores = data
    })
}



// Exported Get Functions 
export const getTeams = () => {
    return [...applicationState.teams]
}
export const getPlayers = () => {
    return [...applicationState.players]
}
export const getScores = () => {
    return [...applicationState.scores]
}