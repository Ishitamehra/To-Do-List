class Task {
  constructor(description, deadline, priority, label) {
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.label = label;
    this.completed = false;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }
  
  addTask(description, deadline, priority, label) {
    const task = new Task(description, deadline, priority, label);
    this.tasks.push(task);
  }
  
  deleteTask(index) {
    this.tasks.splice(index, 1);
  }
  
  markTaskComplete(index) {
    this.tasks[index].completed = true;
  }
}

const taskManager = new TaskManager();

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  
  taskManager.tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    
    const taskDetails = document.createElement("span");
    taskDetails.innerHTML = `${task.description} | Deadline: ${task.deadline} | Priority: ${task.priority} | Label: ${task.label}`;
    taskItem.appendChild(taskDetails);
    
    const taskActions = document.createElement("div");
    
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "Complete";
    completeButton.addEventListener("click", () => {
      taskManager.markTaskComplete(index);
      renderTasks();
    });
    taskActions.appendChild(completeButton);
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
      taskManager.deleteTask(index);
      renderTasks();
    });
    taskActions.appendChild(deleteButton);
    
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(taskActions);
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const deadlineInput = document.getElementById("deadline-input");
  const prioritySelect = document.getElementById("priority-select");
  const labelInput = document.getElementById("label-input");

  const description = taskInput.value;
  const deadline = deadlineInput.value;
  const priority = prioritySelect.value;
  const label = labelInput.value;

  taskManager.addTask(description, deadline, priority, label);
  taskInput.value = "";
  deadlineInput.value = "";
  labelInput.value = "";

  renderTasks();
}
