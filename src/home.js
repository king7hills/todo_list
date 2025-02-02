//home Page
//Global imports
import { DynamicPage } from './index.js'; //Note: Use the dynamicPage.js file and link through index.js aggregator.
//Don't forget to import any images. Default setting pulls from a directory named imgs found in the src directory.
//import _ from './imgs/_';
import { format } from 'date-fns';

//Create new page instance
const homePage = new DynamicPage('home');

//Some default page elements
//Create new elements: text elements need a (tag, class, and content) as arguments.
//The class argument may be empty: ''.
const today = format(new Date(), "eeee, LLL do, y");
const h1top = homePage.textElement('h1', 'headline', `Today is ${today}.`);
const h2sub = homePage.textElement('h2', 'subheading', "Here is what's on the agenda");


//Page initialization. Clears page's array, then loads it, then populates the html with specified content. Order matters.
export function init_home () {
    homePage.pageOrder = []
    homePage.pageOrder.push(h1top, h2sub);
    homePage.loadPage(homePage.pageOrder);
}