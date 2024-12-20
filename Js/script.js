let formInput = document.querySelector(".form input");
let btn = document.querySelector(".form button");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  let data = localStorage.getItem("tasks");
  arrayOfTasks = JSON.parse(data);
}

getTasksFromLocalStroge();

btn.addEventListener("click", function (e) {
  formInput.placeholder = `What do you want to do today?`;
  formInput.classList.remove("please-add");
  e.preventDefault();
  if (formInput.value !== "") {
    createTasks(formInput.value);
    formInput.value = "";
  } else {
    pleaseAddTask();
  }
});

function pleaseAddTask() {
  formInput.placeholder = `Please Add Your Task!`;
  formInput.classList.add("please-add");
}

tasksDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    removeTasksFromLocalStroge(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    doneTask(e.target.getAttribute("data-id"));
  } else if (e.target.classList.contains("task-p")) {
    e.target.parentElement.classList.toggle("done");
    doneTask(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("delete-all")) {
    deleteAllTasks();
  }
});

function createTasks(inputValue) {
  let task = {
    id: Date.now(),
    title: inputValue,
    state: false,
  };

  arrayOfTasks.push(task);

  addTasksToPage(arrayOfTasks);

  addTasksToLocalStroge(arrayOfTasks);
}

function addTasksToPage(arrayOfTasks) {
  tasksDiv.innerHTML = `<div class="delete-all">Delete All Tasks</div>`;
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.title = task.title;
    div.setAttribute("data-id", task.id);

    let span = document.createElement("span");
    let img = document.createElement("img");
    img.src = ".//Image/Circle.png";
    span.appendChild(img);
    div.appendChild(span);

    let p = document.createElement("p");
    p.className = "task-p";
    p.textContent = task.title;
    div.appendChild(p);
    let del = document.createElement("span");
    del.classList = "fa-solid fa-xmark delete";
    div.appendChild(del);

    tasksDiv.appendChild(div);
    if (task.state) {
      div.classList = "task done";
    }
  });
}

function addTasksToLocalStroge(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTasksFromLocalStroge() {
  let data = localStorage.getItem("tasks");

  if (data) {
    let allTasks = JSON.parse(data);
    addTasksToPage(allTasks);
  }
}

function removeTasksFromLocalStroge(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStroge(arrayOfTasks);
}

function doneTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].state == false
        ? (arrayOfTasks[i].state = true)
        : (arrayOfTasks[i].state = false);
      addTasksToLocalStroge(arrayOfTasks);
    }
  }
}

function deleteAllTasks() {
  tasksDiv.innerHTML = `<div class="delete-all">Delete All Tasks</div>`;
  arrayOfTasks = [];
  addTasksToLocalStroge(arrayOfTasks);
}
