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
function Autobind(_: any, _1: string | Symbol, descriptor: PropertyDescriptor) {
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

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = /*<HTMLTemplateElement>*/ document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
    this.attach();
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
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const inputForm = new ProjectInput();
