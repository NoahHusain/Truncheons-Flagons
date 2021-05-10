// render function for new team form
export const newTeamForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="teamName">Team Name</label>
        <input type="text" name="teamName" class="input"/>
    </div>
 
    <button class="button" id="submitTeam">Create Team</button> 
    `
    return html
}