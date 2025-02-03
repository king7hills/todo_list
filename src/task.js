export class Task {
    constructor (theTask, dueDate, priority, project) {
        this.theTask = theTask;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.project = project;
        this.creationDate = new Date();
        this.complete = false;
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
    
    deleteTask: (projectArray, task) => {
        const taskIndex = projectArray.findIndex(obj => obj.theTask === task.theTask);
        projectArray.splice(taskIndex, 1);
        },
};