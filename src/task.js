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
        return this.dueDate = new Date(input);
    }

    editPriority (input) {
        return this.priority = input;
    }

    editTaskProject (input) {
        return this.project = input;
    }
}

export const tFunc = {
    addTask: (projectArray, task) => {
        projectArray.push(task)
    },
    
    createTask: (task, dueDate, priority, project) => {
        return new Task(task, dueDate, priority, project);
    },
    
    deleteTask: (event) => {
        event.preventDefault();
        const taskID = event.target.getAttribute('data-task-id');

        
        const projectArray = storage.selectProject();
        projectArray = projectArray.filter(task => task.theTask != task.theTask && task.dueDate != task.dueDate);
        
        //Remove task element
        const taskElement = document.querySelector(`[data-task-id="${taskID}"`);
        if (taskElement) {
            taskElement.remove();
        }
    },
};