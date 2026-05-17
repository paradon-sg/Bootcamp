---
marp: true
title: TypeScript Bootcamp
author: Bootcamp Team
paginate: true
theme: default
style: |
  section {
    font-family: "Aptos", "Segoe UI", sans-serif;
  }
  h1, h2 {
    color: #0f172a;
  }
  code {
    font-size: 0.9em;
  }
---

# TypeScript Bootcamp

## Table of Contents
1. [Introduction](#introduction)
2. [Environment Setup](#environment-setup)
3. [Core Concepts](#core-concepts)
4. [Advanced Types](#advanced-types)
5. [Classes & OOP](#classes--oop)
6. [Modules & Namespaces](#modules--namespaces)
7. [Generics](#generics)
8. [Decorators](#decorators)
9. [Configuration](#configuration)
10. [Best Practices](#best-practices)

---

## Introduction

TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing, classes, and interfaces to help build robust applications.

### Why TypeScript?
- **Static Typing**: Catch errors at compile time
- **IDE Support**: Better autocomplete and refactoring
- **Modern JavaScript**: Use latest features with backward compatibility
- **Scalability**: Ideal for large codebases and teams

---

## Environment Setup

### Installation
```bash
# Global installation
npm install -g typescript

# Project initialization
mkdir ts-bootcamp
cd ts-bootcamp
npm init -y
npm install typescript --save-dev
npx tsc --init
```

### Basic Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### First Program
```typescript
// src/index.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Bootcamp"));
```

### Compilation
```bash
npx tsc
# Or watch mode
npx tsc --watch
```

---

## Core Concepts

### Basic Types
```typescript
// Primitives
let isActive: boolean = true;
let count: number = 42;
let username: string = "developer";

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuples
let point: [number, number] = [10, 20];

// Enums
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

// Any & Unknown
let flexible: any = 4;
flexible = "string";
flexible = true;

let safe: unknown = 4;
// Requires type checking before use
if (typeof safe === "number") {
  console.log(safe.toFixed());
}

// Void, Null, Undefined
function logMessage(): void {
  console.log("No return value");
}

let empty: null = null;
let notSet: undefined = undefined;
```

### Type Inference
```typescript
// TypeScript infers types automatically
let inferred = "hello"; // Type: string
let autoNumber = 100;     // Type: number

// Contextual typing
const numbers = [1, 2, 3];
numbers.forEach(n => {
  // n is inferred as number
  console.log(n.toFixed(2));
});
```

### Type Assertions
```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
// Alternative syntax
let strLength2: number = (<string>someValue).length;
```

### Interfaces
```typescript
interface User {
  id: number;
  name: string;
  email?: string;        // Optional property
  readonly createdAt: Date; // Readonly property
}

function createUser(user: User): User {
  return user;
}

// Extending interfaces
interface Admin extends User {
  permissions: string[];
}

// Interface for functions
interface Calculator {
  (x: number, y: number): number;
}

const add: Calculator = (a, b) => a + b;
```

### Type Aliases
```typescript
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// Intersection types
type Employee = {
  name: string;
  id: number;
};

type Manager = Employee & {
  team: string[];
};
```

### Functions
```typescript
// Parameter types and return type
function add(a: number, b: number): number {
  return a + b;
}

// Optional and default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Function overloads
function process(input: string): string;
function process(input: number): number;
function process(input: any): any {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}
```

---

## Advanced Types

### Union & Intersection Types
```typescript
// Union: value can be one of several types
type Status = "loading" | "success" | "error";
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// Intersection: combines multiple types
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;
```

### Literal Types
```typescript
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function move(direction: Direction) {
  // direction is strictly typed
}

// Numeric literals
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
```

### Nullable Types
```typescript
let maybeString: string | null = null;
maybeString = "hello";

// Non-null assertion (use with caution)
function getLength(str: string | null) {
  return str!.length;
}
```

### Type Guards
```typescript
interface Bird {
  fly: () => void;
  layEggs: () => void;
}

interface Fish {
  swim: () => void;
  layEggs: () => void;
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();

// Type guard using typeof
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim(); // TypeScript knows this is Fish
} else {
  pet.fly();  // TypeScript knows this is Bird
}
```

### Discriminated Unions
```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}
```

### Mapped Types
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Usage
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
type ReadonlyTodo = Readonly<Todo>;
type PartialTodo = Partial<Todo>;
```

### Conditional Types
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>; // false

// Extract and Exclude
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Exclude<"a" | "b" | "c", "a" | "f">; // "b" | "c"
```

### Utility Types
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial: all properties optional
type PartialUser = Partial<User>;

// Required: all properties required
type RequiredUser = Required<PartialUser>;

// Readonly: all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick: select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit: remove specific properties
type UserWithoutEmail = Omit<User, "email">;

// Record: object with specific key/value types
type UsersById = Record<number, User>;

// ReturnType: extract return type
function createUser() {
  return { id: 1, name: "John" };
}
type NewUser = ReturnType<typeof createUser>;
```

---

## Classes & OOP

### Class Basics
```typescript
class Animal {
  // Property types
  name: string;
  private age: number;
  protected species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // Method
  move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance}m`);
  }

  // Getter
  get animalAge(): number {
    return this.age;
  }

  // Setter
  set animalAge(value: number) {
    if (value > 0) {
      this.age = value;
    }
  }

  // Static member
  static isAnimal(obj: any): obj is Animal {
    return obj instanceof Animal;
  }
}

// Parameter properties shorthand
class Person {
  constructor(
    public name: string,
    private age: number,
    readonly id: number
  ) {}
}
```

### Inheritance
```typescript
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "Canine");
  }

  bark(): void {
    console.log("Woof! Woof!");
  }

  // Override
  move(distance: number = 5): void {
    console.log("Running...");
    super.move(distance);
  }
}

const dog = new Dog("Buddy", 3);
dog.bark();
dog.move();
```

### Abstract Classes
```typescript
abstract class Department {
  constructor(public name: string) {}

  abstract describe(): void;

  printName(): void {
    console.log("Department name: " + this.name);
  }
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting");
  }

  describe(): void {
    console.log("Accounting Department");
  }
}
```

### Interfaces with Classes
```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();

  constructor(h: number, m: number) {}

  setTime(d: Date): void {
    this.currentTime = d;
  }
}
```

---

## Modules & Namespaces

### Exporting
```typescript
// math.ts
export interface Shape {
  area(): number;
}

export class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

export const PI = 3.14159;

export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
```

### Importing
```typescript
// main.ts
import Calculator, { Circle, PI, Shape } from "./math";
import * as math from "./math";

const calc = new Calculator();
const circle: Shape = new Circle(5);
console.log(circle.area());
```

### Re-exporting
```typescript
// index.ts
export * from "./math";
export { default as Calculator } from "./calculator";
```

### Namespaces
```typescript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.includes("@");
    }
  }
}

// Usage
const validator = new Validation.EmailValidator();
```

---

## Generics

### Generic Functions
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let inferred = identity("myString"); // Type inferred

// Generic with constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

### Generic Interfaces
```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### Generic Classes
```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = addFn;
  }
}

let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
```

### Generic Constraints with keyof
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3 };
getProperty(x, "a"); // OK
// getProperty(x, "m"); // Error: "m" doesn't exist in x
```

---

## Decorators

### Enabling Decorators
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Class Decorators
```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### Method Decorators
```typescript
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### Property Decorators
```typescript
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      value = formatString.replace("%s", newVal);
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

class User {
  @format("Hello, %s")
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("John");
console.log(user.name); // "Hello, John"
```

---

## Configuration

### Compiler Options
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react",

    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    },

    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,

    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true
  }
}
```

### Path Mapping
```typescript
// With paths configured in tsconfig.json
import { Button } from "@components/Button";
import { utils } from "@/utils";
```

---

## Best Practices

### 1. Enable Strict Mode
Always use `"strict": true` in `tsconfig.json` for maximum type safety.

### 2. Avoid `any`
```typescript
// Bad
function process(data: any): any {
  return data;
}

// Good
function process<T>(data: T): T {
  return data;
}
```

### 3. Use Type Inference
```typescript
// Unnecessary type annotation
const name: string = "John";

// Better - let TypeScript infer
const name = "John";
```

### 4. Prefer Interfaces for Object Shapes
```typescript
// Use interface for object types
interface User {
  name: string;
}

// Use type for unions, tuples, etc.
type Status = "active" | "inactive";
```

### 5. Use `unknown` over `any`
```typescript
// Bad
function handle(data: any) {
  return data.toString(); // Might crash at runtime
}

// Good
function handle(data: unknown) {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  throw new Error("Expected string");
}
```

### 6. Leverage Utility Types
```typescript
// Instead of manually creating partial types
interface UpdateUser {
  name?: string;
  email?: string;
}

// Use built-in utility
type UpdateUser = Partial<User>;
```

### 7. Explicit Return Types
```typescript
// Good practice for public APIs
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### 8. Use `readonly` When Possible
```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

function setup(config: Config) {
  // config.apiUrl = "..."; // Error: readonly
}
```

---

## Resources

- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions for JavaScript libraries
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

**Happy Coding!**
