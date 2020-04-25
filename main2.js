var tasks = [];
var id = 0;

function getLi() {
    var li = document.createElement("li");
    li.className = "tasks";
    return li;
}

function getCheckBox() {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    return checkBox;
}

function getPriority() {
    priority = document.createElement("select");
    priority.className = 'priority';
    return priority;
}

function deleteTask() {
    var taskslist = document.getElementsByClassName('tasks');
    for (var i = 0; i < taskslist.length; i++) {
        if (taskslist[i].id === id) {
            taskslist[i].remove();
            break;
        }
    };
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i,1);
        };
    }
}

function getDeleteButton(id){
    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    deleteButton.className = "delete";
    deleteButton.id = id;
    deleteButton.onclick = deleteTask();
    return deleteButton;
}

function getComponent(taskName) {
    var li = getLi();
    var checkBox = getCheckBox();
    var priority = getPriority();
    var deleteButton = getDeleteButton(id);
    li.append(checkBox);
    li.append(taskName);
    li.append(priority);
    li.append(deleteButton);
    return li;
}

function handleEnter(event) {
    if (event.code === 'Enter') {
        newTask();
    }
}

function newTask() {
    var input = document.getElementById('input');
    if (input.value.trim().length > 0) {
        var taskslist = document.getElementById('task-list');
        var newTask = getComponent(input.value);
        taskslist.appendChild(newTask);
        tasks.push({ id:id++, title: input.value, checked: false, priority: 'medium' });
    };
    input.value = '';
}

function printTaskList(tasks){
    if (tasks.length === 0) {
        var ul = document.getElementById("task-list");
        var msg = document.getElementsByClassName("alertText");
        if (msg.length === 0) {
            msg = document.createElement("p");
            msg.className = "alertText";
            msg.innerText = "Nothing to do? Start to add!!";
            ul.appendChild(msg);            
        }
    }
}