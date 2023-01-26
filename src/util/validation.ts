namespace App {
  // Validation - thesed are the properties that we want to support
  export interface Validatable {
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

  export function validate(validatableInput: Validatable) {
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
}
