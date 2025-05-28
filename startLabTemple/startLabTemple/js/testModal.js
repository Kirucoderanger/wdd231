const openButton = document.querySelector("#openButton")
const dialogBox = document.querySelector("#dialogBox")
const closeButton = document.querySelector("#colse")

openButton.addEventListener("click", () =>{
    dialogBox.showModal();
});

closeButton.addEventListener("click", () => {
    dialogBox.close()
})

dialogBox.addEventListener("click", () =>{
    dialogBox.close()
})