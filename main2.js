var tasks = [];

var i = 0;
while (localStorage.getItem(i)){
    var a = localStorage.getItem(i);
    a = JSON.parse(a);
    tasks.push(a);
    i++;
}

var id = tasks[i] ? tasks[i].id + 1: 0; //Set next number than the bigger id

function saveData() {
    localStorage.clear();
    for (i = 0 ; i < tasks.length; i++) {
        localStorage.setItem(i, JSON.stringify(tasks[i]));
    }
}

function findTask() {
    var input = document.getElementById('input');
    var tasksFiltered = tasks.filter(function (task){return task.title.toLowerCase() === input.value.toLowerCase();});
    printTaskList(tasksFiltered);
}

function getLi() {
    var li = document.createElement("li");
    li.className = "tasks";
    li.id = id;
    return li;
}

function getCheckBox() {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    return checkBox;
}

function priorityChange(event, id) {
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === Number(id)) {
            tasks[i].priority = event.target.value;
            break;
        };
    }
}

function getPriority() {
    var priority = document.createElement("select");
    priority.className = 'priority';
    priority.id = id;
    var high = document.createElement("option");
    high.appendChild(document.createTextNode("high"));
    var medium = document.createElement("option");
    medium.setAttribute("selected", "selected")
    medium.appendChild(document.createTextNode("medium"));
    var low = document.createElement("option");
    low.appendChild(document.createTextNode("low"));
    priority.appendChild(low);
    priority.appendChild(medium);
    priority.appendChild(high);
    priority.onchange = function () { priorityChange(event, priority.id); };
    return priority;
}

function deleteTask(id) {
    var taskslist = document.getElementsByClassName('tasks');
    for (var i = 0; i < taskslist.length; i++) {
        if (Number(taskslist[i].id) === id) {
            taskslist[i].remove();
            break;
        }
    };
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
        };
    }
    if (tasks.length === 0) {
        printTaskList(tasks);
    }
}

function getDeleteButton(id) {
    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    deleteButton.className = "delete";
    deleteButton.id = id;
    deleteButton.onclick = function () { deleteTask(id); };
    return deleteButton;
}

function getComponent(taskName) {
    var li = getLi(id);
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
        if (tasks.length === 0) {
            document.getElementsByClassName("alertText")[0].remove();
        }
        var taskslist = document.getElementById('task-list');
        var newTask = getComponent(input.value);
        taskslist.appendChild(newTask);
        tasks.push({ id: id++, title: input.value, checked: false, priority: 'medium' });
        saveData();
    };
    input.value = '';
}

function printTaskList(tasksToPrint) {
    if (tasks.length === 0) {

        printEmpty();

    } else {
        var taskslist = document.getElementById('task-list');
        taskslist.innerText = "";
        for (var i=0; i < tasksToPrint.length; i++) {
            li = getComponent(tasksToPrint[i].title);
            taskslist.appendChild(li);
        }
    }
}

function printEmpty() {
    var ul = document.getElementById("task-list");
    var msg = document.getElementsByClassName("alertText");
    if (msg.length === 0) {
        msg = document.createElement("p");
        msg.className = "alertText";
        msg.innerText = "Nothing to do? Start to add!!";
        ul.appendChild(msg);
    }
}