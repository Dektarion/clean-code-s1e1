var taskInput = document.querySelector(".add-item__input"),
    addButton = document.querySelector(".add-item__btn"),
    incompleteTaskHolder = document.querySelector(".todo__container"),
    completedTasksHolder = document.querySelector(".compl__container");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li"),
      checkBox=document.createElement("input"),
      label=document.createElement("label"),
      editInput=document.createElement("input"),
      editButton=document.createElement("button"),
      deleteButton=document.createElement("button"),
      deleteButtonImg=document.createElement("img");

  listItem.className = "list__container";

  label.innerText = taskString;
  label.className = "list__label list__label_grow";

  checkBox.type = "checkbox";
  checkBox.className = "list__input_checkbox";

  editInput.className = "list__input list__input_hidden list__input_grow";
  editButton.innerText = "Edit";
  editButton.className = "list__btn btn list__btn_edit";

  deleteButton.className = "list__btn btn list__btn_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove-icon";
  deleteButtonImg.className = "list__img";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function() {
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".list__input");
  var label = listItem.querySelector(".list__label");
  var editBtn = listItem.querySelector(".list__btn_edit");
  var containsClass = listItem.classList.contains("change");

  if (containsClass) {
    label.innerText = editInput.value;
    editInput.classList.toggle("list__input_change");
    label.classList.toggle("list__label_change");
    editBtn.innerText = "Edit";
  } else {
    editInput.classList.toggle("list__input_change");
    label.classList.toggle("list__label_change");
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("change");
};

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

var taskCompleted = function() {
  var listItem = this.parentNode;
  listItem.children[1].classList.add("list_label_compl");

  completedTasksHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  var listItem = this.parentNode;
  listItem.children[1].classList.remove("list_label_compl");

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".list__input_checkbox");
  var editButton = taskListItem.querySelector(".list__btn_edit");
  var deleteButton = taskListItem.querySelector(".list__btn_delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}