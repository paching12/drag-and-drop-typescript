import "reflect-metadata";
import "es6-shim";
import { plainToClass } from "class-transformer";

import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
import { Product } from "./product.model";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

const products = [
  {
    title: "A carpet",
    price: 12.99,
  },
  {
    title: "A book",
    price: 10.99,
  },
];

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInfo());
}
