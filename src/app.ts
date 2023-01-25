/// <reference path="drag-and-drop-interfaces.ts"/>
/// <reference path="project-model.ts"/>
/// <reference path="project-state.ts"/>

namespace App {
  // Component Base class
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart?: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      if (newElementId) this.element.id = newElementId;

      this.attach(insertAtStart);
    }

    protected attach(insertAtStart?: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }

  // Validation - thesed are the properties that we want to support
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  function isNotNull(value: string | number | undefined): boolean {
    return value !== null;
  }

  function validate(validatableInput: Validatable) {
    let isValid: boolean = true;
    const value = validatableInput.value;
    if (validatableInput.required) {
      isValid = isValid && value.toString().trim().length !== 0;
    }

    if (
      (isNotNull(validatableInput.minLength) ||
        isNotNull(validatableInput.maxLength)) &&
      typeof value === "string"
    ) {
      if (validatableInput.minLength)
        isValid = isValid && value.length >= validatableInput.minLength;
      if (validatableInput.maxLength)
        isValid = isValid && value.length <= validatableInput.maxLength;
    }

    if (
      (isNotNull(validatableInput.min) || isNotNull(validatableInput.max)) &&
      typeof value === "number"
    ) {
      if (validatableInput.min)
        isValid = isValid && value >= validatableInput.min;
      if (validatableInput.max)
        isValid = isValid && value <= validatableInput.max;
    }
    return isValid;
  }

  // Autobind decorator
  function Autobind(
    _: any,
    _1: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };

    return adjDescriptor;
  }

  // User input interface
  type IUserInputs = [string, string, number];

  // ProjectItem class
  class ProjectItem
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
      this.element.querySelector(
        "h3"
      )!.textContent = `${this.persons} assigned `;
      this.element.querySelector("p")!.textContent = this.project.desc;
    }

    get() {
      return this.element;
    }
  }

  class ProjectList
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

  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement!: HTMLInputElement;
    descriptionInputElement!: HTMLTextAreaElement;
    peopleInputElement!: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLTextAreaElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    private gatherUserInput(): IUserInputs | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
        maxLength: 20,
        minLength: 5,
      };

      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
      };

      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 20,
      };

      const inputsBeforeValidation: Validatable[] = [
        titleValidatable,
        descriptionValidatable,
        peopleValidatable,
      ];

      const invalid = inputsBeforeValidation.some((item) => !validate(item));

      if (invalid) {
        const errorMessage = "Invalid input, please try again!";
        alert(errorMessage);
        return;
      }
      return [enteredTitle, enteredDescription, +enteredPeople];
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        console.log("title", title, "dec", desc, "people", people);
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}
  }

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
