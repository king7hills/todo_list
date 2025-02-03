
class Project {
    constructor (name) {
        this.name = name;
        this.data = [];
        this.id = '';
    }
};

export const storage = {
    allTasks: [],

    createProject: (name) => {
        const project = new Project (name); //New instance of project
        project.id = storage.allTasks.length; //Sets id based on allTasks length
        storage.allTasks.push(project); //Adds project to allTasks
    },

    selectProject: (name) => {
        storage.allTasks.find((project) => project.name == name);
    },

    saveData: () => {
        const allTasksStorage = JSON.stringify(storage.allTasks);
        localStorage.setItem("allTasks", allTasksStorage);
    },

    getData: () => {
        const allTasksStorage = localStorage.getItem("allTasks");
        if (allTasksStorage) {
            storage.allTasks = JSON.parse(allTasksStorage);
        } else {
            console.log("No existing data - using empty array");
        }
    }
};