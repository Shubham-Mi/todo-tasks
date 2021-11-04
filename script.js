let btnAdd = document.getElementById("btnAdd");
let btnClear = document.getElementById("btnClear");
let btnSort = document.getElementById("btnSort");
let btnCancel = document.getElementById("btnCancel");
let inpTask = document.getElementById("inpTask");
let listTasks = document.getElementById("tasks");
let tasks = [];

// save tasks to local storage
function saveTaskList() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// retrieve tasks from local storage
function retrieveTaskList() {
  let retrievedTasks = localStorage.getItem("tasks");
  if (retrievedTasks) {
    tasks = JSON.parse(retrievedTasks);
    renderTasks();
  }
}

// get task name from input
function getTaskName() {
  return inpTask.value;
}

// add task to list
function addTask(taskname = getTaskName()) {
  if (taskname) {
    newtask = {};
    newtask.name = taskname;
    newtask.status = "pending";
    tasks.push(newtask);
    renderTasks();
    saveTaskList();
    inpTask.value = "";
    inpTask.focus();
  } else {
    alert("Please enter a task name");
  }
}

// render tasks
function renderTasks() {
  listTasks.innerHTML = "";
  // running loop through tasks array
  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    let cb = document.createElement("input");

    // Creating up arrow button
    if (i !== 0) {
      let up = document.createElement("button");
      up.type = "button";
      up.className = "btn btn-outline-primary btn-sm";
      let img = document.createElement("i");
      img.className = "fas fa-arrow-up";
      up.appendChild(img);
      up.addEventListener("click", function () {
        let temp = tasks[i];
        tasks[i] = tasks[i - 1];
        tasks[i - 1] = temp;
        renderTasks();
      });
      li.appendChild(up);
    }

    // Creating down arrow button
    if (i !== tasks.length - 1) {
      let down = document.createElement("button");
      down.type = "button";
      down.className = "btn btn-outline-primary btn-sm";
      let img = document.createElement("i");
      img.className = "fas fa-arrow-down";
      down.appendChild(img);
      down.addEventListener("click", function () {
        let temp = tasks[i];
        tasks[i] = tasks[i + 1];
        tasks[i + 1] = temp;
        renderTasks();
      });
      li.appendChild(down);
    }

    // Creating the checkbox
    cb.type = "checkbox";
    cb.id = "cb" + i;
    cb.addEventListener("click", function () {
      if (cb.checked) {
        tasks[i].status = "completed";
      } else {
        tasks[i].status = "pending";
      }
      renderTasks();
      saveTaskList();
    });

    // Strike through completed tasks
    let span = document.createElement("span");
    if (tasks[i].status === "completed") {
      cb.checked = true;
      span.style.textDecoration = "line-through";
    }

    // Creating the final list item
    span.innerHTML = tasks[i].name;
    li.appendChild(cb);
    li.appendChild(span);
    listTasks.appendChild(li);
  }
}

// Delete completed tasks
function deleteCompleted() {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "completed") {
      tasks.splice(i, 1);
      i--;
    }
  }
  renderTasks();
  saveTaskList();
}

// Sort tasks based on completion
function sorttasks() {
  tasks.sort(function (a, b) {
    if (a.status === "completed" && b.status !== "completed") {
      return 1;
    } else {
      return -1;
    }
  });
  renderTasks();
  saveTaskList();
}

btnSort.addEventListener("click", function () {
  sorttasks();
});

//delete completed tasks
btnClear.addEventListener("click", function () {
  deleteCompleted();
});

// add task on btnAdd click
btnAdd.addEventListener("click", function () {
  addTask();
});

// add task on enter key
inpTask.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    addTask();
  }
});

// Clear the input field
btnCancel.addEventListener("click", function () {
  inpTask.value = "";
  inpTask.focus();
});

// When page loads
retrieveTaskList();
renderTasks();
inpTask.focus();
