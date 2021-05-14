export const MessageBox = (messageText) => {
    const modal = document.querySelector("#myModal");
    const span = document.querySelector(".close-modal");
    const message = document.querySelector("#modal-message")
    message.innerHTML = messageText
    modal.style.display = "block";
    
    //clicking on the "x" causes message box to disappear
    span.onclick = () => {
        modal.style.display = "none";
    }

    //clicking outside of the message box causes it to disappear
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}