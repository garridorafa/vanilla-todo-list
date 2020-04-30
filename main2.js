var tasks = [];

var i = 0;
while (localStorage.getItem(i)){
    var a = localStorage.getItem(i);
    a = JSON.parse(a);
    tasks.push(a);
    i++;
}

var id = tasks[i-1] ? tasks[i-1].id + 1: 0; //Set next number than the bigger id

function saveData() {
    localStorage.clear();
    for (i = 0 ; i < tasks.length; i++) {
        localStorage.setItem(i, JSON.stringify(tasks[i]));
    }
}

function findTask() {
    var input = document.getElementById('input');
    var tasksFiltered = tasks.filter(function (task){return task.title.toLowerCase().indexOf(input.value.toLowerCase()) !== -1;});
    printTaskList(tasksFiltered);
}

function getLi(taskId) {
    var li = document.createElement("li");
    li.className = "tasks";
    li.id = taskId;
    return li;
}

function checkTask (taskId) {
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === Number(taskId)) {
            tasks[i].checked = !tasks[i].checked;
            saveData();
            break;
        };
    }
}

function getCheckBox(taskId, taskChecked) {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    taskChecked ? checkBox.checked = "checked": "";
    checkBox.onchange = function () {checkTask (taskId);}
    return checkBox;
}

function priorityChange(event, id) {
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === Number(id)) {
            tasks[i].priority = event.target.value;
            saveData();
            break;
        };
    }
}

function getPriority(taskId, taskPriority) {
    var priority = document.createElement("select");
    priority.className = 'priority';
    priority.id = taskId;
    var high = document.createElement("option");
    taskPriority === "high" ? high.setAttribute("selected", "selected"):"";
    high.appendChild(document.createTextNode("high"));
    var medium = document.createElement("option");
    taskPriority === "medium" ? medium.setAttribute("selected", "selected"):"";
    medium.appendChild(document.createTextNode("medium"));
    var low = document.createElement("option");
    taskPriority === "low" ? low.setAttribute("selected", "selected"):"";
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
            saveData();
            break;
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

function getComponent(tasksToPrint) {
    var li = getLi(tasksToPrint.id);
    var checkBox = getCheckBox(tasksToPrint.id, tasksToPrint.checked);
    var priority = getPriority(tasksToPrint.id, tasksToPrint.priority);
    var deleteButton = getDeleteButton(tasksToPrint.id);
    li.append(checkBox);
    li.append(tasksToPrint.title);
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
        tasks.push({ id: id, title: input.value, checked: false, priority: 'medium' });
        var newTask = getComponent({ id: id, title: input.value, checked: false, priority: 'medium' });
        id++;
        taskslist.appendChild(newTask);
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
            li = getComponent(tasksToPrint[i]);
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