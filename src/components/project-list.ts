import { Component } from "./base-component";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project";
import { ProjectItem } from "./project-item";
import { DragTarget } from "../models/drag-and-drop";
import { Autobind } from "../decorators/autobind";

export class ProjectList
  extends Component<HTMLDivElement, HTMLDivElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];
  ul: HTMLUListElement;

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.ul = this.element.querySelector("ul")!;
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.ul.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(event: DragEvent): void {
    const id = event.dataTransfer?.getData("text/plain");
    projectState.moveProject(
      id,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @Autobind
  dragLeaveHandler(_: DragEvent): void {
    this.ul.classList.remove("droppable");
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      const activeProjects = projects.filter((project) =>
        this.type === "active"
          ? project.status === ProjectStatus.Active
          : project.status === ProjectStatus.Finished
      );
      this.assignedProjects = activeProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECT";
  }
}
