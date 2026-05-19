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

## Introduction

TypeScript คือ strongly typed superset ของ JavaScript ที่ compile เป็น plain JavaScript ช่วยให้ตรวจจับ error ได้ตั้งแต่ตอน compile ก่อนรันโปรแกรม

TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing, classes, and interfaces to help build robust applications.

### Why TypeScript?

- **Static Typing**: จับ error ได้ตั้งแต่ compile time
- **IDE Support**: Autocomplete และ refactoring ที่ดีขึ้น
- **Modern JavaScript**: ใช้ฟีเจอร์ล่าสุดได้ทันที
- **Scalability**: เหมาะกับโปรเจกต์ขนาดใหญ่และทีม

## Environment Setup

ติดตั้ง TypeScript แบบ global และสร้างไฟล์ config ด้วย `tsc --init`

```bash
npm install -g typescript
npx tsc --init
```

**`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

```bash
npx tsc          # Compile once
npx tsc --watch  # Watch mode
```

---

## Core Concepts

### Basic Types

ประเภทข้อมูลพื้นฐานใน TypeScript ได้แก่ `boolean`, `number`, `string`, `array`, `tuple`, `enum` และ `unknown`

```typescript
// Primitives
let isActive: boolean = true;
let count: number = 42;
let username: string = "developer";

// Arrays & Tuples
let numbers: number[] = [1, 2, 3];
let point: [number, number] = [10, 20];

// Enum
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

// unknown requires type checking; any skips it
let safe: unknown = 4;
if (typeof safe === "number") {
  console.log(safe.toFixed());
}
```

### Type Inference & Assertions

TypeScript สามารถ **infer type** ได้อัตโนมัติจากค่าที่กำหนด ส่วน **Type Assertion** ใช้บอก TypeScript ว่า value นั้นเป็น type ใด

```typescript
let inferred = "hello"; // inferred as string
let count = 100; // inferred as number

// Type assertion
let someValue: unknown = "hello";
let strLength: number = (someValue as string).length;
```

### Interfaces

กำหนดรูปแบบ (shape) ของ object รองรับ optional property (`?`), readonly property และสามารถ `extend` ได้

```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional
  readonly createdAt: Date; // Readonly
}

// Extending
interface Admin extends User {
  permissions: string[];
}
```

### Type Aliases

ตั้งชื่อให้กับ type เพื่อนำกลับมาใช้ซ้ำ ใช้ `&` สำหรับ intersection type

```typescript
type Point = { x: number; y: number };
type ID = string | number;

// Intersection
type Manager = { name: string; id: number } & { team: string[] };
```

### Functions

กำหนด type ของ parameter และ return value รองรับ optional parameter, default value, rest parameter และ overloads

```typescript { return a + b; }
// Optional & default parameters
function greet(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Overloads
function process(input: string): string;
function process(input: number): number;
function process(input: any): any {
  return typeof input === "string" ? input.toUpperCase() : input * 2;
}
```

---

## Advanced Types

### Union & Intersection Types

**Union** (`|`) ใช้บอกว่า value เป็นได้หลาย type / **Intersection** (`&`) รวม type หลายตัวเข้าด้วยกัน

```typescript
type Status = "loading" | "success" | "error";
type StringOrNumber = string | number;

// Intersection
type UIWidget = { drag: () => void } & { resize: () => void };
```

### Literal Types

จำกัดค่าให้เป็นได้เฉพาะค่าที่กำหนดไว้เท่านั้น (ทั้ง string และ number)

```typescript
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
```

### Nullable Types

จัดการค่าที่อาจเป็น `null` หรือ `undefined` แนะนำใช้ optional chaining (`?.`) แต่น non-null assertion (`!`)

```typescript
let maybeString: string | null = null;

// Non-null assertion (use with caution)
function getLength(str: string | null): number {
  return str?.length ?? 0; // Prefer optional chaining
}
```

### Type Guards

ตรวจสอบ type ณ runtime ทำให้ TypeScript รู้จัก type ที่แท้จริงภายใน block นั้น

```typescript
interface Bird {
  fly: () => void;
  layEggs: () => void;
}
interface Fish {
  swim: () => void;
  layEggs: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const pet: Fish | Bird = { swim: () => {}, layEggs: () => {} };
isFish(pet) ? pet.swim() : pet.fly();
```

### Discriminated Unions

ใช้ property พิเศษ (discriminant) เช่น `kind` เพื่อแยกแยะ type ใน union ทำให้ TypeScript สามารถ narrow type ผ่าน `switch` statement

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

สร้าง type ใหม่โดย map จาก properties ของ type เดิม เป็นพื้นฐานของ utility types อย่าง `Readonly<T>`, `Partial<T>`

```typescript
// Custom implementations (mirrors how built-in utility types work internally)
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Usage
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;
type ReadonlyTodo = MyReadonly<Todo>;
type PartialTodo = MyPartial<Todo>;
```

### Conditional Types

กำหนด type แบบมีเงื่อนไข (`T extends X ? A : B`) คล้าย ternary operator

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Extract and Exclude
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Exclude<"a" | "b" | "c", "a" | "f">; // "b" | "c"
```

### Utility Types

TypeScript มี built-in utility types พร้อมใช้สำหรับแปลง type ที่มีอยู่ ไม่ต้องเขียนเอง

```typescript
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

กำหนด property, method, getter/setter, static member และ access modifiers (`public`, `private`, `protected`)

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
    readonly id: number,
  ) {}
}
```

### Inheritance

สืบทอด class ด้วย `extends` และเรียก constructor ของ parent class ด้วย `super()` สามาถ override method ได้

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

Class ที่ไม่สามารถ instantiate ได้โดยตรง ต้อง extend ก่อน กำหนดเพียงโครงสร้าง ลูกคลาสต้องเติม implementation

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

ใช้ `implements` บังคับให้ class มี property/method ตามที่ interface กำหนด

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
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

ใช้ `export` เพื่อเปิดเผย interface, class, หรือตัวแปรให้ module อื่น import ไปใช้ได้

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

นำเข้า module ด้วย `import` สามารถ import แบบ named, default หรือ import ทั้งหมดด้วย `* as`

```typescript
// main.ts
import Calculator, { Circle, PI, Shape } from "./math";
import * as math from "./math";

const calc = new Calculator();
const circle: Shape = new Circle(5);
console.log(circle.area());
```

### Re-exporting

ส่งต่อ exports จากหลายไฟล์ผ่าน barrel file (`index.ts`) สะดวกในการ import

```typescript
// index.ts
export * from "./math";
export { default as Calculator } from "./calculator";
```

### Namespaces

รวมกลุ่ม code ให้อยู่ใน namespace เดียวกัน เหมาะสำหรับโปรเจกต์ที่ไม่ใช้ ES module system

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

### Generic Functions & Interfaces

เขียน function หรือ interface ที่รองรับหลาย type โดยไม่ต้องเขียนซ้ำ ใช้ได้ทั้ง `string`, `number` หรือ type ใดก็ได้

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// With constraints
function loggingIdentity<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Generic interface
interface GenericIdentityFn<T> {
  (arg: T): T;
}
let myIdentity: GenericIdentityFn<number> = identity;
```

### Generic Classes

สร้าง class ที่ทำงานได้กับ type ใดก็ได้

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

จำกัด generic type `K` ให้เป็นได้เฉพาะ key ที่มีใน object `T` เท่านั้น

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

Decorators คือเครื่องมือเพิ่ม metadata หรือปรับแต่ง behavior ของ class, method หรือ property โดยไม่ต้องแก้ source code โดยตรง

### Enabling Decorators

ต้องเปิดใช้งานใน `tsconfig.json` ก่อน

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Class Decorators

ใช้กับ class โดยตรง เช่น `@sealed` ป้องกันไม่ให้เพิ่ม property ใหม่ใน class

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

ใช้กับ method เช่น `@enumerable(false)` ซ่อน method จาก `for...in` loop

```typescript
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
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

ใช้กับ property เช่น `@format("Hello, %s")` แปลงค่าค่าอัตโนมัติเมื่อ set

```typescript
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string;
    Object.defineProperty(target, propertyKey, {
      get: () => value,
      set: (newVal: string) => {
        value = formatString.replace("%s", newVal);
      },
      enumerable: true,
      configurable: true,
    });
  };
}

class User {
  @format("Hello, %s") name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("John");
console.log(user.name); // "Hello, John"
```

---

## Configuration

ตัวอย่าง `tsconfig.json` สำหรับโปรเจกต์ทั่วไป รองรับ path alias และ strict mode

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] },
    "esModuleInterop": true,
    "declaration": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

```typescript
// Path aliases
import { Button } from "@components/Button";
import { utils } from "@/utils";
```

---

## Best Practices

แนวทางปฏิบัติที่ดีสำหรับการเขียน TypeScript ให้อ่านง่ายและปลอดภัย

### 1. Enable Strict Mode

Always use `"strict": true` in `tsconfig.json` for maximum type safety.

### 2. Avoid `any` — Use `unknown` Instead

```typescript
// Bad
function handle(data: any) {
  return data.toString();
}

// Good
function handle(data: unknown) {
  if (typeof data === "string") return data.toUpperCase();
  throw new Error("Expected string");
}

// Better for generics
function process<T>(data: T): T {
  return data;
}
```

### 3. Use Type Inference

```typescript
const name: string = "John"; // unnecessary annotation
const name = "John"; // better
```

### 4. Prefer Interfaces for Object Shapes

```typescript
interface User {
  name: string;
} // use for objects
type Status = "active" | "inactive"; // use for unions/tuples
```

### 5. Leverage Utility Types

```typescript
type UpdateUser = Partial<User>; // instead of manual optional fields
```

### 6. Explicit Return Types for Public APIs

```typescript
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### 7. Use `readonly` When Possible

```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}
```

---

## Resources

- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions for JavaScript libraries
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
