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

function addTask (projectArray, task) {
    projectArray.push(task);
}

function createTask (task, dueDate, project) {
    return new Task(task, dueDate, project);
}

function deleteTask (projectArray, task) {
    const taskIndex = projectArray.findIndex(obj => obj.theTask === task.theTask);
    projectArray.splice(taskIndex, 1);
}