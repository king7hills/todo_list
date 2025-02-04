import { storage, tFunc } from "./index.js";
import { populateTaskList } from "./index.js";

// Diaglog main
function setupDialog() {
    const dialog = document.querySelector('dialog');
    const closeDialog = document.querySelector('button.dialog_close');
    const newTaskButton = document.querySelector('button.newTask');

    newTaskButton.addEventListener("click", () => {
        dialog.showModal();
    });

    closeDialog.addEventListener('click', () => {
        dialog.close();
    });

    const form = document.querySelector('form');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formStuff = new FormData(form);
        let newTask = formStuff.get('Task');
        let newDueDate = formStuff.get('Due Date');
        let newPriority = formStuff.get('Priority');
        let newProject = formStuff.get('Project');
            
        const freshTask = tFunc.createTask(newTask, newDueDate, newPriority, newProject);

        if (!storage.selectProject(newProject)) {
            storage.createProject(newProject);
            console.log("new project created");
        };
        tFunc.addTask(storage.selectProject(newProject), freshTask);
        storage.saveData();
        populateTaskList();
        dialog.close();
        form.reset();
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

        document.querySelector("select").add(newProject);
    };

    const newProjectButton = document.querySelector("#form_new_project");
    newProjectButton.onclick = addProjectOption;
}

export { setupDialog };