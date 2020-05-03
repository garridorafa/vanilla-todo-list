var tasks = [];


function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

while (localStorage.getItem(i)){
    var a = localStorage.getItem(i);
    a = JSON.parse(a);
    tasks.push(a);
    i++;
}

function saveData() {
    localStorage.clear();
    tasks.forEach((task)=>localStorage.setItem(task.id,JSON.stringify(task)));
}

function filterPriority() {
    var priorityValue = document.getElementById("priorityFilter").value;
    var tasksFiltered = [];
    if (priorityValue === "nothing"){
        tasksFiltered = tasks;
    }else{
        for (var i = 0; i < tasks.length; i++) {
            if(tasks[i].priority === priorityValue){
                tasksFiltered.push(tasks[i]);
            };
        };
    };
    printTaskList(tasksFiltered);
}

function findTask() {
    var input = document.getElementById('input');
    var tasksFiltered = tasks.filter(function (task){return task.title.toLowerCase().indexOf(input.value.toLowerCase()) !== -1;});
    printTaskList(tasksFiltered);
}

function getLi(id) {
    var li = document.createElement("li");
    li.className = "tasks";
    li.id = id;
    return li;
}

function checkTask (id) {
    li = document.getElementById(id);
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].checked = !tasks[i].checked;
            li.className = tasks[i].checked ? "checked":"";
            saveData();
            break;
        };
    }
    
}

function getCheckBox(id, taskChecked) {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    taskChecked ? checkBox.checked = "checked": "";
    checkBox.onchange = function () {checkTask (id);}
    return checkBox;
}

function priorityChange(event, id) {
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].priority = event.target.value;
            saveData();
            break;
        };
    }
}

function getPriority(id, taskPriority) {
    var priority = document.createElement("select");
    priority.className = 'priority';
    priority.id = id;
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
    priority.onchange = function () { priorityChange(event, id); };
    return priority;
}

function deleteTask(id) {
    var taskslist = document.getElementsByClassName('tasks');
    for (var i = 0; i < taskslist.length; i++) {
        if (taskslist[i].id === id) {
            taskslist[i].remove();
            break;
        }
    };
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        };
    }
    saveData();
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
    tasksToPrint.checked ? li.className = "checked" : "";
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
        var id = create_UUID();
        taskToAdd = { id: id, title: input.value, checked: false, priority: 'medium' }
        tasks.push(taskToAdd);
        var newLiElement = getComponent(taskToAdd);
        taskslist.appendChild(newLiElement);
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