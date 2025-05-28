const openButton1 = document.querySelector("#openButton1");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

openButton1.addEventListener("click", () =>{
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Apple contains 95 calory`
});

openButton2.addEventListener("click", () =>{
    dialogBox.showModal();
    dialogBoxText.innerHTML = `Banana is yalow when matured`
});

openButton3.addEventListener("click", () =>{
    dialogBox.showModal();
    dialogBoxText.innerHTML = `Orange has high content of vitamin C`
});

closeButton.addEventListener("click", () =>{
    dialogBox.close();

});