namespace App {
  // Autobind decorator
  export function Autobind(
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
}
