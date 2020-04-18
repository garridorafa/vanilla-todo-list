var tasks = [];

function handleEnter(event) {
    if (event.code === 'Enter') {
        newTask();
    }
}

function newTask() {
    var input = document.getElementById('input');
    if (input.value.trim().length > 0) {
        tasks.push({ title: input.value, checked: false, priority: 'medium' });
        printTaskList(tasks);
    }
    input.value = '';
}

function findTask() {
    var input = document.getElementById('input');
    var tasksFiltered = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].title.toLowerCase().indexOf(input.value.toLowerCase()) !== -1) {
            tasksFiltered.push(tasks[i]);
        };
    };
    printTaskList(tasksFiltered);
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

function printTaskList(taskListToPrint) {
    var taskList = document.getElementById('task-list');
    var html = "";

    if (tasks.length === 0) {
        html = '<p class="alertText">Nothing to do? Start to add!!<p/>';
    } else if (taskListToPrint.length === 0) {
        html = '<p class="alertText">No match ...<p/>';
    } else {
        for (var i = 0; i < taskListToPrint.length; i++) {
            var liClass = taskListToPrint[i].checked === true ? 'task checked' : 'task';
            html = html + '<li class="' + liClass + '" id="task-' + i + '">';
            html += printCheckbox(i);
            html += taskListToPrint[i].title;
            html += printPriority(i);
            html += printDeleteBotton(i);
            html += '</li>';
        }
    }

    taskList.innerHTML = html;
}

//CheckBox

function printCheckbox(i) {
    var checked = tasks[i].checked == true ? 'checked' : ''
    return '<input type="checkbox" onchange="checkTask(' + i + ')" ' + checked + ' >'
}

function checkTask(i) {
    tasks[i].checked = tasks[i].checked === true ? false : true
    //tasks[i].checked = !tasks[i].checked
    printTaskList();
}

//Priority Botton

function printPriority(i) {
    var html = '<select class="priority" onchange="setPriority(event, ' + i + ')">'
    html += '<option value="low" ' + (tasks[i].priority === 'low' ? 'selected' : '') + '>Low</option>'
    html += '<option value="medium" ' + (tasks[i].priority === 'medium' ? 'selected' : '') + '>Medium</option>'
    html += '<option value="high" ' + (tasks[i].priority === 'high' ? 'selected' : '') + '>High</option>'
    return html + '</select>'
}

function setPriority(event, i) {
    tasks[i].priority = event.target.value
}

//Delete botton

function printDeleteBotton(i) {
    return '<input type="button" onclick="deleteTask(' + i + ')" class="delete" value="Delete"/>'
}

function deleteTask(i) {
    tasks.splice(i, 1);
    document.getElementById('task-' + i).remove();
    //printTaskList(tasks);
}