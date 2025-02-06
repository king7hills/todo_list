//home Page
//Global imports
import { DynamicPage, storage, tFunc, openEditTaskDialog } from './index.js'; //Note: Use the dynamicPage.js file and link through index.js aggregator.
//Don't forget to import any images. Default setting pulls from a directory named imgs found in the src directory.
//import _ from './imgs/_';
import { format } from 'date-fns';

//Create new page instance
const homePage = new DynamicPage('home');

//Some default page elements
//Create new elements: text elements need a (tag, class, and content) as arguments.
//The class argument may be empty: ''.
const today = format(new Date(), "eeee, LLL do, y");
const h1top = homePage.textElement('h1', 'headline', `Today is ${today}.`);
const h2sub = homePage.textElement('h2', 'subheading', "Here is what's on the agenda");
const taskList = homePage.textElement('ul', 'task_list', '');
const commsDiv = homePage.textElement('div', 'comms_div', '');
const newTask = homePage.textElement('button', 'newTask', '+ New Task');

function displayTask (task) {
    const taskLI = document.createElement('li');
    taskLI.className = `task_slot ${task.priority}`;
    taskLI.setAttribute('data-task-id', task.id);

    const taskDiv = document.createElement('div');
    taskDiv.className = `task_slot ${task.priority}`;
    taskDiv.setAttribute('data-task-id', task.id);
    
    const completeButton = document.createElement('input');
    completeButton.setAttribute('type', "checkbox");
    completeButton.setAttribute('data-task-id', task.id);
    completeButton.onchange = function () {
        task.complete = !task.complete;
        if (this.checked) {
            taskLI.style.textDecorationLine = "line-through";
        } else {
            taskLI.style.textDecorationLine = "none";
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Del';
    deleteButton.setAttribute('data-task-id', task.id);
    deleteButton.onclick = function (event) {
        tFunc.deleteTask(event);
    };

    taskDiv.innerHTML = task.theTask + "." + " Due: "+ format(new Date(task.dueDate), "Pp");
    taskDiv.onclick = function (event) {
        openEditTaskDialog(event);
    };

    taskLI.appendChild(taskDiv);
    taskLI.appendChild(deleteButton);
    const projectUl = document.querySelector(`ul.${task.project}`);
    projectUl.appendChild(taskLI);
    taskLI.insertBefore(completeButton, taskDiv); //Places the complete button before the respective task Div. All on same li  
};

export function populateTaskList () {
    const ul = document.querySelector(`.task_list`);
    ul.innerHTML = '';
    const comms = document.querySelector('.comms_div');

    storage.allTasks.forEach((project) => {
        //Create 'li' element for each project.
        const aProject = document.createElement('li');
        aProject.textContent = project.name;
        aProject.className = `taskByProject ${project.name}`;
        const newList = document.createElement('ul');
        newList.className = `${project.name}`;
        aProject.appendChild(newList);
        ul.appendChild(aProject);
    });

    //Add each task to the proper project location
    storage.allTasks.forEach((project) => {
        if (project.data.length == 0) {
            console.log("No projects or tasks.");
            comms.textContent = "Please add some tasks to get started!";
        } else {
        comms.textContent = '';
        const projArr = project.data;
        projArr.forEach((task) => {
            displayTask(task);
        })
        };
    });
};



//Page initialization. Clears page's array, then loads it, then populates the html with specified content. Order matters.
export function init_home () {
    homePage.pageOrder = []
    homePage.pageOrder.push(h1top, h2sub, taskList, commsDiv, newTask);
    homePage.loadPage(homePage.pageOrder);
    populateTaskList();
}