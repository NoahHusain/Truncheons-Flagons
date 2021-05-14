export const MessageBox = (messageText) => {
    const modal = document.querySelector("#myModal");
    const span = document.querySelector(".close-modal");
    const message = document.querySelector("#modal-message")
    message.innerHTML = messageText
    modal.style.display = "block";
    span.onclick = () => {
        modal.style.display = "none";
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}