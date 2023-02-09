import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import _ from "lodash";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

declare var GLOBAL: any;

console.log(_.shuffle([1, 2, 3]));

// use global vars
console.log("GLOBAL", GLOBAL);
