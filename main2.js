function getLi() {
    var li = document.createElement("li");
    return li;
}

function getCheckBox() {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    return checkBox;
}

function getPriority() {
    priority = document.createElement("select");
    priority.className = 'priority'
    return priority;
}

function getDeleteButton(){
    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    deleteButton.className = "delete";
    return deleteButton;
}

function getComponent(taskName) {
    var li = getLi();
    var checkBox = getCheckBox();
    var priority = getPriority();
    var deleteButton = getDeleteButton();
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
        var tasks = document.getElementById('task-list');
        var newTask = getComponent(input.value);
        tasks.appendChild(newTask);        
    };
    input.value = '';
}