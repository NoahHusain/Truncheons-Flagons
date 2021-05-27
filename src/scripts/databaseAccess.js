let applicationState = {
    teams: [],
    players: [],
    scores: [],
    team1CurrentScore: {},
    team2CurrentScore: {},
    team3CurrentScore: {},
    CurrentRound: 1 
}

const mainContainer = document.querySelector("#container")


// API fetch functions
export const fetchTeams = () => {
    return fetch("https://truncheons-api-p83tv.ondigitalocean.app/teams")
        .then(response => response.json())
        .then(data => {
            applicationState.teams = data
        })
}


export const fetchPlayers = () => {
    return fetch("https://truncheons-api-p83tv.ondigitalocean.app/players")
        .then(response => response.json())
        .then(data => {
            applicationState.players = data
        })
}


export const fetchScores = () => {
    return fetch("https://truncheons-api-p83tv.ondigitalocean.app/scores")
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

export const getTeam1CurrentScore = () => {
    return {...applicationState.team1CurrentScore}
}
export const getTeam2CurrentScore = () => {
    return {...applicationState.team2CurrentScore}
}
export const getTeam3CurrentScore = () => {
    return {...applicationState.team3CurrentScore}
}

export const getCurrentRound = () => {
    return applicationState.CurrentRound
}
export const setCurrentRound = (round) => {
    applicationState.CurrentRound = round
}

export const setTeam1id = (id) => {
    applicationState.team1CurrentScore.teamId = id
    applicationState.team1CurrentScore.score = 0
}
export const setTeam2id = (id) => {
    applicationState.team2CurrentScore.teamId = id
    applicationState.team2CurrentScore.score = 0
}
export const setTeam3id = (id) => {
    applicationState.team3CurrentScore.teamId = id
    applicationState.team3CurrentScore.score = 0
}

export const setTeam1score = (score) => {
    applicationState.team1CurrentScore.score += score
}
export const setTeam2score = (score) => {
    applicationState.team2CurrentScore.score += score
}
export const setTeam3score = (score) => {
    applicationState.team3CurrentScore.score += score
}

export const sendCurrentScores = (currentScore1) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(currentScore1)
    }


    return fetch("https://truncheons-api-p83tv.ondigitalocean.app/scores", fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationState.team2CurrentScore.timestamp = Date.now()
            sendCurrentScore2(applicationState.team2CurrentScore)
        })
}

 const sendCurrentScore2 = (currentScore2) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(currentScore2)
    }


    return fetch("https://truncheons-api-p83tv.ondigitalocean.app/scores", fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationState.team3CurrentScore.timestamp = Date.now()
            sendCurrentScore3(applicationState.team3CurrentScore)
        })
}

const sendCurrentScore3 = (currentScore3) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(currentScore3)
    }


    return fetch("https://truncheons-api-p83tv.ondigitalocean.app/scores", fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationState.team1CurrentScore = {}
            applicationState.team2CurrentScore = {}
            applicationState.team3CurrentScore = {}
            applicationState.CurrentRound = 1
            mainContainer.dispatchEvent(new CustomEvent('stateChanged'))
        })
}