
console.log("JS file loaded");
const dialog = document.querySelector("dialog");
const button = document.getElementById("open-dialog");

button.addEventListener("click", () => {
    console.log("hey")
  dialog.showModal();
});
