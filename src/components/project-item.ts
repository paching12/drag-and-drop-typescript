import { Component } from "./base-component.js";
import { Project } from "./../models/project.js";
import { Draggable } from "./../models/drag-and-drop.js";
import { Autobind } from "./../decorators/autobind.js";

// ProjectItem class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    return this.project.people === 1
      ? "1 person"
      : `${this.project.people} people`;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event!.dataTransfer!.setData("text/plain", this.project.id);
    event!.dataTransfer!.effectAllowed = "move";
  }

  @Autobind
  dragEndHandler(_: DragEvent): void {
    console.log("Drag end");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned `;
    this.element.querySelector("p")!.textContent = this.project.desc;
  }

  get() {
    return this.element;
  }
}
