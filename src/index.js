import "./styles.css";
import { DynamicPage } from "./dynamicPage.js";
import { Task, tFunc } from "./task.js";
import { storage } from "./storage.js";
import { init_home, populateTaskList } from "./home.js";
import { setupDialog, openEditTaskDialog } from './dialog.js';

export { DynamicPage } from "./dynamicPage.js";
export { Task, tFunc } from "./task.js";
export { storage } from "./storage.js";
export { populateTaskList } from "./home.js";
export { openEditTaskDialog } from "./dialog.js";

//Initial settings
storage.getData();
init_home();
setupDialog();



function loadContent (initFunction) {
    const page = document.querySelector('div#content');
    page.innerHTML = '';
    initFunction();
};

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", () =>
    {loadContent(init_home);
     setupDialog();
    },
);