//task.js

import { storage } from "./index.js";

export class Task {
    constructor (theTask, dueDate, priority, project) {
        this.theTask = theTask;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.project = project;
        this.creationDate = new Date();
        this.complete = false;
        this.id = project+"_"+theTask;
    }

    markComplete () {
        return this.complete = !this.complete;
    }

    editTheTask (input) {
        return this.theTask = input;
    }

    editDueDate (input) {
        return this.dueDate = format(new Date(input), "Pp");
    }

    editPriority (input) {
        return this.priority = input;
    }

    editTaskProject (input) {
        return this.project = input;
    }
}

export const tFunc = {
    addTask: (project, task) => {
        project.data.push(task);
    },
    
    createTask: (task, dueDate, priority, project) => {
        return new Task(task, dueDate, priority, project);
    },
    
    deleteTask: (event) => {
        event.preventDefault();
        const taskID = event.target.getAttribute('data-task-id');
        const parr = taskID.split("_");
        
        //Find project and remove task from project
        const projectArray = storage.selectProject(parr[0]);
        projectArray = projectArray.filter(task => task.theTask != task.theTask && task.dueDate != task.dueDate);
        
        //Remove task element from DOM
        const taskElement = document.querySelector(`[data-task-id="${taskID}"`);
        if (taskElement) {
            taskElement.remove();
        }
    },
};