const btn = document.getElementById("btn");
const container = document.getElementById("toasts-container");
let arr = [];

btn.addEventListener("click", manageToasts);

function manageToasts() {
  const uniqueId = new Date().getTime();
  arr.push(uniqueId);

  if (arr.length < 4) {
    //adding first three toast from downwards.
    createToast(uniqueId);
  }
  else {

    //adding new toast and removing last toast when already have three toast.
    function addExtraToast() {
      //removing last toast
      const lastToast = document.getElementById(`toast__${arr[0]}`);
      lastToast.style.animation = "moveLeft 250ms forwards";
      setTimeout(() => {
        lastToast.remove();
      }, 250);

      //moving toast down smoothly
      setTimeout(() => {
        const moveDownToast = document.getElementById(`toast__${arr[1]}`);
        moveDownToast.style.animation = "moveDown 150ms forwards";
      }, 250);

      setTimeout(() => {
        createToast(arr[3]); 
      }, 400);

      setTimeout(() => {
        arr.shift();
      }, 649.9);

      setTimeout(() => {
        if (arr.length >= 4) {
          addExtraToast();
        }
      }, 650);
    }

    if (arr.length == 4) {
      addExtraToast();
    }
  }
}

function createToast(uniqueId) {

  const newToast = document.createElement("div");
  const button = document.createElement("button");
  const textNode1 = document.createTextNode("i love snacks");
  const textNode2 = document.createTextNode("X");
  button.appendChild(textNode2);
  button.id = "delete";
  newToast.appendChild(textNode1);
  newToast.appendChild(button);
  newToast.className = "toast";
  newToast.id = `toast__${uniqueId}`;
  button.addEventListener("click", deleteToast);

  addToast(newToast,uniqueId);
}

function addToast(newToast,uniqueId){

  container.insertBefore(newToast, container.firstElementChild);
  newToast.style.animation = "moveRight 250ms forwards";
  setTimeout(() => {
    if (newToast != null) {
      newToast.style.animation = "moveLeft 250ms forwards";
      setTimeout(() => {
        newToast.remove();
        var index = arr.indexOf(uniqueId);
        if (index > -1) {
          arr.splice(index, 1);
        }
      }, 250);
    }
  }, 3000);
}


function deleteToast(event) {

  const button = event.target;
  const toastId = button.parentElement.id;
  const uniqueId = Number(toastId.replace("toast__", ""));

  button.parentElement.style.animation = "moveLeft 250ms forwards";
  setTimeout(() => {
  button.parentElement.remove();
  }, 250);

  var index = arr.indexOf(uniqueId);
  if (index > -1) {
    arr.splice(index, 1);
  }
}