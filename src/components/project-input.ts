/// <reference path="./base-component.ts"/>
/// <reference path="./../decorators/autobind.ts"/>
/// <reference path="./../util/validation.ts"/>
/// <reference path="./../state/project.ts"/>

namespace App {
  // User input interface
  type IUserInputs = [string, string, number];

  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
