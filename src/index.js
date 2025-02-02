import "./styles.css";
import { init_home } from "./home";

export { DynamicPage } from "./dynamicPage";
export { Task } from "./task";

init_home();

function loadContent (initFunction) {
    const page = document.querySelector('div#content');
    page.innerHTML = '';
    initFunction();
};

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", () =>
    {loadContent(init_home)},
);