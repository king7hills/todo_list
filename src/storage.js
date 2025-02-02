
const allTasks = [];

class Project {
    constructor (name) {
        this.name = name;
        this.data = [];
        this.id = '';
    }
};

function createProject (name) {
    const project = new Project (name); //New instance of project
    project.id = allTasks.length(); //Sets id based on allTasks length
    allTasks.push(project); //Adds project to allTasks
};

function saveData () {
    const allTasksStorage = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksStorage);
};