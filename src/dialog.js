import { storage, tFunc } from "./index.js";
import { populateTaskList } from "./index.js";

const dialog = document.querySelector('dialog');
const closeDialog = document.querySelector('button.dialog_close');
const dialogTitle = document.querySelector('#dialogTitle');
const submitButton = document.querySelector('#task_submit');
const theTaskInput = document.querySelector('#task');
const ddInput = document.querySelector('#dueDate');
const selectInput = document.querySelector("select");

let editingTask = null;

// Opens dialog for new task.
function openNewTaskDialog() {
    editingTask = null;
    dialogTitle.textContent = "Add New Task";
    submitButton.textContent = "Add Task";
    dialog.showModal();
    theTaskInput.focus();
};

// Opens dialog for task editing.
function openEditTaskDialog(event) {
    event.preventDefault();
    
    //Using the data attribute id tag, return the project object and the task object.
    const taskID = event.target.getAttribute('data-task-id');
    const IDarr = taskID.split("_");
    const project = storage.selectProject(IDarr[0]); //Project object
    const theTask = IDarr[1];
    const taskObject = project.data.find((task) => task.theTask = theTask); //Task object

    editingTask = taskObject; // Sets the task to be edited into the placeholder which triggers edit submit behavior.
    dialogTitle.textContent = "Edit Task";
    submitButton.textContent = "Save Changes";

    const oldPriority = document.querySelector(`input[name="Priority"][value="${editingTask.priority}"]`);
    theTaskInput.value = editingTask.theTask;
    const dd = editingTask.dueDate;
    ddInput.value = dd.slice(0,16);
    oldPriority.checked = true;
    selectInput.value = editingTask.project;

    dialog.showModal();
    theTaskInput.focus();
};

// Diaglog main
function setupDialog() {
    const newTaskButton = document.querySelector('button.newTask');
    newTaskButton.addEventListener("click", () => {
        openNewTaskDialog();
    });

    closeDialog.addEventListener('click', () => {
        form.reset();
        dialog.close();
    });

    const form = document.querySelector('form');

    function formSubmitBehavior () {
        let formStuff = new FormData(form);
        let newTask = formStuff.get('Task');
        let newDueDate = formStuff.get('Due Date');
        let newPriority = formStuff.get('Priority');
        let newProject = formStuff.get('Project');
        
        if (editingTask == null) {
            const freshTask = tFunc.createTask(newTask, newDueDate, newPriority, newProject);
    
            if (!storage.selectProject(newProject)) {
                storage.createProject(newProject);
                console.log("new project created");
            };
    
            tFunc.addTask(storage.selectProject(newProject), freshTask);
            
        } else {
            if (!storage.selectProject(newProject)) {
                storage.createProject(newProject);
                console.log("new project created");
            };
           tFunc.updateTask(editingTask, newTask, newDueDate, newPriority, newProject);
        };
        
        storage.saveData();
        populateTaskList();
        dialog.close();
        form.reset();
    };

    // Calls submit behavior function when submitting the form.
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formSubmitBehavior();
    });

    function addProjectOption () {
        //Generates new project option for form
        const newProject = document.createElement("option");
        const projectName = prompt("Name: ");
        if (projectName === null) {
            return;
        } else {
            newProject.value = projectName;
            newProject.textContent = projectName;
        };
        
        //Changes selected project option to the newly created project
        const defaultProjectSelection = document.querySelector("[value=general]");
        defaultProjectSelection.removeAttribute("selected");
        newProject.setAttribute("selected", "selected");

        selectInput.add(newProject);
    };

    const newProjectButton = document.querySelector("#form_new_project");
    newProjectButton.onclick = addProjectOption;
};

export { setupDialog, openEditTaskDialog };