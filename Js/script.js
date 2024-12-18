let formInput = document.querySelector(".form input");
let addBtn = document.querySelector(".form button");
let tasksDiv = document.querySelector(".tasks");

let arrayOfInput = [];

if (localStorage.getItem("task")) {
  arrayOfInput = JSON.parse(localStorage.getItem("task"));
}

getFromLocalStrog();

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formInput.placeholder = "What do you want to do today?";
  formInput.classList.remove("please-add");
  if (formInput.value !== "") {
    addTask(formInput.value);
    formInput.value = "";
  } else {
    pleaseAddTask();
  }
});

function pleaseAddTask() {
  formInput.placeholder = "Please Add Your Task";
  formInput.classList.add("please-add");
}

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    removeFromLocal(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    addDoneTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTask(inputValue) {
  tasksDiv.innerHTML = `<div class="delete-all">Delete All Tasks</div>`;
  let tasks = {
    id: Date.now(),
    title: inputValue,
    state: false,
  };
  arrayOfInput.push(tasks);

  addTaskToPage(arrayOfInput);

  addToLocalStroge(arrayOfInput);
}

function addTaskToPage(arrayOfInput) {
  arrayOfInput.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.title = task.title;
    div.setAttribute("data-id", task.id);

    let spanOne = document.createElement("span");
    let img = document.createElement("img");
    img.src = "/./Image/Circle.png";
    spanOne.prepend(img);
    div.appendChild(spanOne);

    let p = document.createElement("p");
    p.appendChild(document.createTextNode(task.title));
    div.appendChild(p);
    tasksDiv.appendChild(div);

    let del = document.createElement("span");
    del.className = "fa-solid fa-x delete";
    div.appendChild(del);

    if (task.state) {
      div.className = "task done";
    }
  });
}

function addToLocalStroge(arrayOfInput) {
  localStorage.setItem("task", JSON.stringify(arrayOfInput));
}

function getFromLocalStrog() {
  let data = localStorage.getItem("task");

  if (data) {
    let allTasks = JSON.parse(data);
    addTaskToPage(allTasks);
  }
}

function removeFromLocal(task) {
  arrayOfInput = arrayOfInput.filter((tasks) => tasks.id != task);

  addToLocalStroge(arrayOfInput);
}

function addDoneTask(task) {
  for (let i = 0; i < arrayOfInput.length; i++) {
    if (arrayOfInput[i].id == task) {
      arrayOfInput[i].state == false
        ? (arrayOfInput[i].state = true)
        : (arrayOfInput[i].state = false);
      addToLocalStroge(arrayOfInput);
    }
  }
}

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-all")) {
    arrayOfInput = [];
    tasksDiv.innerHTML = `<div class="delete-all">Delete All Tasks</div>`;
    addToLocalStroge(arrayOfInput);
  }
});
