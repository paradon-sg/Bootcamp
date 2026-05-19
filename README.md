## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Why Angular 21?](#2-why-angular-21)
3. [Environment Setup](#3-environment-setup)
4. [Project Structure & Architecture](#4-project-structure--architecture)
5. [CSR vs SSR](#5-csr-vs-ssr)
6. [SPA vs MPA](#6-spa-vs-mpa)
7. [In-depth Guides](#7-in-depth-guides)
8. [Components](#8-components)
9. [Template syntax](#9-template-syntax)
10. [Built-in directives](#10-built-in-directives)
11. [Angular Routing](#11-angular-routing)
12. [Forms in Angular](#12-forms-in-angular)
13. [HTTP Client and Data Layer](#13-http-client-and-data-layer)
14. [Angular Interfaces](#14-angular-interfaces)
15. [Environments](#15-environments)
16. [HTTP Interceptors](#16-http-interceptors)
17. [Recommended Tooling](#17-recommended-tooling)
18. [Resources](#18-resources)

## 1. Prerequisites

**ความรู้พื้นฐานที่จำเป็น:**

- พื้นฐาน JavaScript และ TypeScript
- ความรู้ HTML/CSS
- ติดตั้ง Node.js LTS
- ติดตั้ง VS Code พร้อม Angular Language Service Extension

## 2. Why Angular 21?

**ทำไมต้อง Angular 21?**

Angular 21 เป็นเฟรมเวิร์กที่ครบเครื่องสำหรับการพัฒนาเว็บแอปพลิเคชันขนาดใหญ่และซับซ้อน โดยมีจุดเด่นดังนี้:

- **Mature framework with batteries included:** มีฟีเจอร์พื้นฐานครบ เช่น Routing, Forms, HTTP, State Management, Testing, และ CLI
- **Strong TypeScript-first developer experience:** ใช้ TypeScript เป็นหลัก ทำให้โค้ดปลอดภัยและอ่านง่าย
- **Modern reactivity with signals:** ระบบ signals ใหม่ช่วยให้การจัดการ state มีประสิทธิภาพและเข้าใจง่ายขึ้น
- **Great tooling for large teams:** มี CLI, Language Service, และ DevTools ที่ช่วยให้ทีมทำงานร่วมกันได้ดี
- **Built-in patterns for scalability and maintainability:** มีแนวทางการออกแบบที่เหมาะกับโปรเจกต์ขนาดใหญ่และดูแลรักษาง่าย

> **Tip:** Angular 21 รองรับการพัฒนาแบบ Standalone Component ทำให้โครงสร้างโปรเจกต์สะอาดและลดความซับซ้อน

## 3. Environment Setup

**การตั้งค่าสภาพแวดล้อม:**

```bash
node -v
npm -v
npm install -g @angular/cli
ng version
```

สร้างโปรเจกต์ใหม่:

```bash
ng new angular-bootcamp --routing --style=scss
cd angular-bootcamp
npm start
```

## 4. Project Structure & Architecture

**โครงสร้างโปรเจ็ค Angular 21:**

```
my-app/
├── node_modules/               # npm dependencies installed for the project.
├── src/                        # The source code for your application.
│   ├── app/                    # Contains your application's components, services, etc.
│   │   ├── app.component.ts    # The logic for the root component.
│   │   ├── app.component.html  # The HTML template for the root component.
│   │   ├── app.component.scss  # The styles specific to the root component.
│   │   └── app.config.ts       # App-level configuration (Routing, Providers).
│   ├── assets/                 # Static assets like images, fonts, or icons.
│   ├── index.html              # The main HTML page served to the browser.
│   ├── main.ts                 # The main entry point; compiles the application and boots it up.
│   └── styles.scss             # Global SCSS styles applied to the whole application.
├── angular.json                # CLI configuration (defines build setups, project defaults, etc.).
├── package.json                # npm configuration (lists dependencies and custom scripts).
└── tsconfig.json               # TypeScript compiler configuration.
```

**Core Files Explanation**

- **`src/main.ts`**: จุดเริ่มต้นของการบูตแอป
  - เป็นไฟล์แรกที่ทำงานเมื่อแอปเริ่มต้น
  - รับผิดชอบในการโหลด Root Component และการตั้งค่าให้กับแอป

- **`src/app/app.component.ts`**: Root Component (Standalone)
  - เป็นคอมโพเนนต์หลักของแอป
  - ใช้รูปแบบ Standalone ไม่ต้องพึ่ง NgModule

- **`src/app/app.component.html`**: HTML Template for Root Component
  - เป็น Template HTML สำหรับ Root Component
  - ใช้สำหรับเลย์เอาต์หลักและการแสดงผลข้อมูล

- **`src/app/app.component.scss`**: Styles for Root Component
  - CSS/SCSS styles สำหรับ Root Component
  - ใช้สำหรับการออกแบบ UI ของคอมโพเนนต์หลัก

- **`src/app/app.config.ts`**: App-level Configuration
  - ระบุ Providers ทั้งหมดของแอป
  - ตั้งค่า Global Configuration เช่น HTTP, Router, Services

- **`src/app/app.routes.ts`**: Application Routing
  - กำหนด Routes ทั้งหมดของแอป
  - สนับสนุน Lazy Loading สำหรับ Feature Modules

## 5. CSR vs SSR

- **CSR (Client Side Rendering):** กระบวนการทำงานทั้งหมดจะเกิดขึ้นที่ฝั่งผู้ใช้ (Client) ตั้งแต่การโหลดหน้าเว็บและ Execute JavaScript โดยอาศัยทรัพยากรเครื่องผู้ใช้ทั้งหมด ซึ่งจะรับไฟล์ HTML มาก่อนแล้วจึงจะมีการโหลดเนื้อหาอื่น ๆ ตามมาในภายหลัง

- **SSR (Server Side Rendering):** กระบวนการทำงานทั้งหมดจะย้ายไปที่ฝั่ง Server โดยจะทำการ Render หน้าเว็บบน Server ก่อนที่จะส่งมาให้ผู้ใช้งาน (Client) หมายความว่าหน้าเว็บที่ส่งมาให้กับผู้ใช้นั้นพร้อมใช้งานแล้ว เว็บเบราว์เซอร์สามารถนำไปแสดงผลได้ทันที ทำให้การใช้งานเว็บไซต์นั้นมีความรวดเร็วมากยิ่งขึ้น

![CSR-SSR](./images/csr_ssr.png)

## 6. SPA vs MPA

- **Single-page web applications (SPAs):** คือ application ที่สามารถใช้งานบน web browser ได้โดยไม่ต้อง reload page
- **Multi-Page Application (MPA):** คือ application ที่สามารถใช้งานบน web browser โดยเมื่อคลิกไปที่ลิงค์ต่างๆ หน้า page จะมีการ reload ใหม่

![SPA-MPA](./images/spa_mpa.png)

## 7. In-depth Guides

### Angular Signals

คือระบบ reactive state แบบใหม่ใน Angular ที่ทำให้ UI อัปเดตเฉพาะส่วนที่จำเป็นเมื่อข้อมูลเปลี่ยน โดยไม่ต้องพึ่ง Zone.js หรือ Change Detection แบบสแกนทั้งแอป

Signals เปลี่ยนแนวคิดจาก "ตรวจทุกอย่างตลอดเวลา" มาเป็น "อัปเดตเฉพาะจุดที่เกี่ยวข้องจริง ๆ"

**ทำไม Signals ดีกว่าแบบเดิม (Change Detection) ?**

ในรูปแบบเดิม Angular จะสแกน component tree ทุกครั้งที่มี event trigger เช่น click หรือ HTTP response ทำให้หลายคอมโพเนนต์ถูก re-evaluate แม้ไม่เกี่ยวกับงานในตอนนั้น แต่ Signals จะติดตาม dependency โดยตรงและอัปเดตเฉพาะส่วนที่ใช้งานข้อมูลนั้นจริง จึงลดงานที่ไม่จำเป็นและทำให้แอปรู้สึกเร็วขึ้น

```ts
import { Component, signal, computed } from "@angular/core";

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubleCount() }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class CounterComponent {
  count = signal<number>(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((v) => v + 1);
  }
}
```

> **Best Practice:** ใช้ signals สำหรับ state ภายในคอมโพเนนต์ และใช้ RxJS สำหรับ async data หรือ global state

## 8. Components

เป็นส่วนประกอบเป็นองค์ประกอบพื้นฐานในการสร้าง Application ใน Angular หน้าที่ของผู้พัฒนาก็คือการสร้าง Component ของตัวเองขึ้นมาแล้วเอามาประกอบกันในหน้าเว็บ ซึ่งที่ Angular แนะนำให้แบ่งโครงสร้างและจัดระเบียบเป็น component ย่อยๆ เพื่อที่จะให้ในแต่ละส่วนทำวงานอย่างเต็มประสิทธิภาพและบำรุงรักษาได้ง่าย

### Component selector

คือ “ชื่อ tag” ที่ใช้เรียก component ใน HTML ของ Angular

```ts
@Component({
  selector: "app-book-list",
  template: `<h1>Books</h1>`,
})
export class BookListComponent {}
```

```html
<app-book-list></app-book-list>
```

### Styling components

คือการ “กำหนด style ให้ component” ใน Angular โดยจะมีการเขียน 2 แบบ

```ts
@Component({
  selector: "profile-photo",
  template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
  styles: `
    img {
      border-radius: 50%;
    }
  `,
})
export class ProfilePhoto {}
```

```ts
@Component({
  selector: "profile-photo",
  templateUrl: "profile-photo.html",
  styleUrl: "profile-photo.css",
})
export class ProfilePhoto {}
```

### Accepting data with input properties

คือการรับข้อมูลจาก parent component เข้ามาใน child component

```ts
import { Component, input } from "@angular/core";

@Component({
  selector: "app-user-card",
  template: `<h1>{{ name() }}</h1>`,
})
export class UserCardComponent {
  public name = input<string | null>(null);
}
```

```html
<app-user-card [name]="'John'"></app-user-card>
```

### Custom events with outputs

คือการส่ง event จาก child component กลับไปหา parent component

```ts
import { Component, output } from "@angular/core";

@Component({
  selector: "app-child",
  template: ` <button (click)="submit()">Submit</button> `,
})
export class ChildComponent {
  countChanged = output<number>();

  submit() {
    this.countChanged.emit(100);
  }
}
```

```html
<app-child (countChanged)="onChanged($event)"></app-child>
```

```ts
import { Component } from "@angular/core";
import { ChildComponent } from "./child.component";

@Component({
  selector: "app-parent",
  imports: [ChildComponent],
  template: `
    <h2>Parent Component</h2>
    <app-child (countChanged)="onChanged($event)"></app-child>
  `,
})
export class ParentComponent {
  onChanged(count: number) {
    console.log("Received from child:", count);
  }
}
```

Summary

```bash
Parent → ส่ง data → Child (input)

Child → ส่ง event → Parent (output)
```

### Component Lifecycle

| Phase            | Method                  | Summary                                                                                                                                                                                            |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Creation         | `constructor`           | Standard JavaScript class constructor. Runs when Angular instantiates the component. <br> <span style="color:#0f172a">(คอนสตรัคเตอร์ของคลาส เรียกเมื่อ Angular สร้างอินสแตนซ์ของคอมโพเนนต์)</span> |
| Change Detection | `ngOnInit`              | Runs once after Angular has initialized all the component's inputs. <br> <span style="color:#0f172a">(ทำงานครั้งเดียวหลังจากอินพุตของคอมโพเนนต์ถูกกำหนดค่าเสร็จ)</span>                            |
| Change Detection | `ngOnChanges`           | Runs every time the component's inputs have changed. <br> <span style="color:#0f172a">(ทำงานทุกครั้งที่อินพุตของคอมโพเนนต์มีการเปลี่ยนแปลง)</span>                                                 |
| Change Detection | `ngDoCheck`             | Runs every time this component is checked for changes. <br> <span style="color:#0f172a">(ทำงานทุกครั้งที่ Angular ตรวจสอบการเปลี่ยนแปลงของคอมโพเนนต์นี้)</span>                                    |
| Change Detection | `ngAfterContentInit`    | Runs once after the component's content has been initialized. <br> <span style="color:#0f172a">(ทำงานครั้งเดียวหลังจากเนื้อหา content projection ถูกกำหนดค่าเสร็จ)</span>                          |
| Change Detection | `ngAfterContentChecked` | Runs every time this component content has been checked for changes. <br> <span style="color:#0f172a">(ทำงานทุกครั้งที่เนื้อหา content projection ถูกตรวจสอบการเปลี่ยนแปลง)</span>                 |
| Change Detection | `ngAfterViewInit`       | Runs once after the component's view has been initialized. <br> <span style="color:#0f172a">(ทำงานครั้งเดียวหลังจาก view ของคอมโพเนนต์ถูกสร้างเสร็จ)</span>                                        |
| Change Detection | `ngAfterViewChecked`    | Runs every time the component's view has been checked for changes. <br> <span style="color:#0f172a">(ทำงานทุกครั้งที่ view ของคอมโพเนนต์ถูกตรวจสอบการเปลี่ยนแปลง)</span>                           |
| Rendering        | `afterNextRender`       | Runs once the next time that all components have been rendered to the DOM. <br> <span style="color:#0f172a">(ทำงานหนึ่งครั้งหลังจากทุกคอมโพเนนต์ถูกเรนเดอร์ลง DOM รอบถัดไป)</span>                 |
| Rendering        | `afterEveryRender`      | Runs every time all components have been rendered to the DOM. <br> <span style="color:#0f172a">(ทำงานทุกครั้งหลังจากทุกคอมโพเนนต์ถูกเรนเดอร์ลง DOM)</span>                                         |
| Destruction      | `ngOnDestroy`           | Runs once before the component is destroyed. <br> <span style="color:#0f172a">(ทำงานครั้งเดียวก่อนที่คอมโพเนนต์จะถูกทำลาย)</span>                                                                  |

## 9. Template syntax

### Render dynamic text with text interpolation

คือการแสดงข้อมูล dynamic ใน template

```ts
@Component({
  template: `
    <p>Your color preference is {{ theme() }}.</p>
  `,
  ...
})
export class App {
  theme = signal<string>('dark');
}
```

### Adding event listeners

คือการเพิ่มตัวดักจับ event

```ts
@Component({
  template: `
    <input type="text" (keyup)="updateField()" />
  `,
  ...
})
export class App{
  public updateField(): void {
    console.log('Field is updated!');
  }
}
```

### Two-way binding

คือการ “ผูกข้อมูลสองทาง” ระหว่าง component <=> UI

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
@Component({
  imports: [FormsModule],
  template: `
    <main>
      <h2>Hello {{ firstName }}!</h2>
      <input type="text" [(ngModel)]="firstName" />
    </main>
  `,
})
export class App {
  firstName = "Ada";
}
```

### Control flow

คือการควบคุมการทำงานหรือการแสดงผลตามเงื่อนไข

```html
@if (a > b) {
  <p>{{ a }} is greater than {{ b }}</p>
}

@if (a > b) {
  {{ a }} is greater than {{ b }}
} @else {
  {{ a }} is equal to {{ b }}
}

@for (item of items; track item.id) {
  {{ item.name }}
}

@switch (userPermissions) {
  @case ('admin') {
    <app-admin-dashboard />
  }
  @case ('reviewer') {
    <app-editor-dashboard />
  }
  @case ('editor') {
    <app-editor-dashboard />
  }
  @default {
    <app-viewer-dashboard />
  }
}
```

### Pipes

คือ feature ใน Angular ที่ใช้ “แปลงหรือ format ข้อมูลก่อนแสดงผลใน template”

```html
<main>
  <!-- Transform the company name to title-case and transform the purchasedOn date to a locale-formatted string -->
  <h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>
  <!-- Transform the amount to a currency-formatted string -->
  <p>Total: {{ amount | currency }}</p>
</main>

<main>
  <h1>Purchases from Acme Corporation on Jul 8, 2024</h1>
  <p>Total: $123.45</p>
</main>
```

```ts
import { Component } from "@angular/core";
import { CurrencyPipe, DatePipe, TitleCasePipe } from "@angular/common";
@Component({
  selector: "app-root",
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: "app.component.html",
})
export class ShoppingCart {
  amount = 123.45;
  company = "acme corporation";
  purchasedOn = "2024-07-08";
}
```

## 10. Built-in directives

คือ “คำสั่งพิเศษที่ Angular ใช้ควบคุม HTML หรือ DOM”

### NgClass

คือ directive ใน Angular ที่ใช้ “เพิ่ม/ลบ CSS class แบบ dynamic”

```html
<some-element [class]="'first second'">...</some-element>
<some-element [class.expanded]="isExpanded">...</some-element>
<some-element [class]="['first', 'second']">...</some-element>
<some-element [class]="{'first': true, 'second': true, 'third': false}"
  >...</some-element
>
```

### NgStyle

คือ directive ใน Angular ที่ใช้ “กำหนด CSS style แบบ dynamic”

```html
<some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
```

### NgModel

คือ directive ใน Angular ที่ใช้ทำ: [Two-way binding](#two-way-binding)

## 11. Angular Routing

คือการกำหนดเส้นทาง (URL Path) ของแอป ว่าเมื่อผู้ใช้เข้า URL ไหน ให้แสดงหน้าไหนหรือ component อะไร

```ts
import { Routes } from "@angular/router";
import { HomePage } from "./home-page";
import { AdminPage } from "./admin-page";
export const routes: Routes = [
  {
    path: "",
    component: HomePage,
  },
  {
    path: "admin",
    component: AdminPage,
  },
];
```

### Show routes with outlets

คือการแสดงผล component ตาม route ผ่าน `<router-outlet>`
ใน Angular router-outlet เป็นตำแหน่งที่ Angular จะเอา component ของ route ปัจจุบันมา render

```html
<app-header />
<router-outlet />
<app-footer />
```

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {}
```

```ts
import { Routes } from "@angular/router";
import { Home } from "./home";
import { Products } from "./products";
const routes: Routes = [
  {
    path: "",
    component: Home,
    title: "Home Page",
  },
  {
    path: "products",
    component: Products,
    title: "Our Products",
  },
];
```

### Navigate to routes

คือการเปลี่ยนหน้า (route) ไปยัง URL อื่นใน Angular

```html
<nav>
  <a routerLink="/user-profile">User profile</a>
  <a routerLink="/settings">Settings</a>

  <!-- Navigates user to /dashboard -->
  <a routerLink="dashboard">Dashboard</a>
  <a [routerLink]="['dashboard']">Dashboard</a>

  <a [routerLink]="['user', currentUserId]">Current User</a>
</nav>
```

```ts
import { RouterLink } from "@angular/router";
@Component({
  templateUrl: "./app.component.html",
  imports: [RouterLink],
})
export class App {}
```

```ts
import { Router } from "@angular/router";
@Component({
  selector: "app-dashboard",
  template: ` <button (click)="navigateToProfile()">View Profile</button> `,
})
export class AppDashboard {
  private router = inject(Router);
  navigateToProfile() {
    // Standard navigation
    this.router.navigate(["/profile"]);
    // With route parameters
    this.router.navigate(["/users", userId]);
    // With query parameters
    this.router.navigate(["/search"], {
      queryParams: { category: "books", sort: "price" },
    });
    // With matrix parameters
    this.router.navigate(["/products", { featured: true, onSale: true }]);
  }
}
```

### Read route state

คือการอ่านข้อมูลของ route ปัจจุบันใน Angular

```ts
import { Component, signal, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product",
})
export class Product {
  private activatedRoute = inject(ActivatedRoute);
  productId = signal<string>('');

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.productId.set(params["id"]);
    });
  }
}
```

### Redirecting Routes

คือการเปลี่ยนเส้นทางจาก route หนึ่งไปอีก route หนึ่งอัตโนมัติใน Angular

```ts
import { Routes } from "@angular/router";

const routes: Routes = [
  // Simple redirect
  { path: "marketing", redirectTo: "newsletter" },
  // Redirect with path parameters
  { path: "legacy-user/:id", redirectTo: "users/:id" },
  // Redirect any other URLs that don’t match
  // (also known as a "wildcard" redirect)
  { path: "**", redirectTo: "/login" },
];
```

### Route Guards

Route Guards ใช้ควบคุมสิทธิ์การเข้าถึง route ประเภทที่ใช้บ่อยได้แก่:

| Guard              | หน้าที่                                          |
| ------------------ | ------------------------------------------------ |
| `CanActivate`      | ป้องกันการเข้าถึง route                          |
| `CanDeactivate`    | ป้องกันการออกจาก route (เช่น มี unsaved changes) |
| `CanActivateChild` | ป้องกันการเข้าถึง child routes                   |
| `Resolve`          | โหลดข้อมูลก่อนเข้า route                         |

### CanActivate Guard

```ts
import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(["/login"]);
};
```

### CanDeactivate Guard

```ts
import { CanDeactivateFn } from "@angular/router";

export interface CanDeactivateComponent {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component,
) => {
  if (component.hasUnsavedChanges()) {
    return confirm("You have unsaved changes. Leave anyway?");
  }
  return true;
};
```

ลงทะเบียน Guards ใน `app.routes.ts`:

```ts
import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { unsavedChangesGuard } from "./guards/unsaved-changes.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: "edit-profile",
    component: EditProfileComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
  },
];
```

## 12. Forms in Angular

### Reactive Forms

คือระบบจัดการฟอร์ม เช่น รับ input จากผู้ใช้ validation submit data bind data กับ component

```html
<form [formGroup]="profileForm" (ngSubmit)="submit()">
  <label> Name: <input formControlName="name" /> </label>
  <label> Email: <input formControlName="email" type="email" /> </label>

  <button type="submit" [disabled]="profileForm.invalid">Submit</button>
</form>
```

```ts
import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-profile-form",
  imports: [ReactiveFormsModule],
  templateUrl: "app.component.html",
})
export class ProfileFormComponent {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  public submit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}
```

## 13. HTTP Client and Data Layer

ใน Angular 21 การใช้งาน HttpClient สำหรับติดต่อ API ในโปรเจกต์แบบ Standalone จำเป็นต้องเปิดใช้งานผ่าน provideHttpClient โดยเพิ่มไว้ใน providers ของระดับแอปภายในไฟล์ app.config.ts

```ts
import { ApplicationConfig } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
```

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users");
  }
}
```

**การใช้งานใน component:**

```html
<ul>
  @for (user of users(); track user.id) {
  <li>{{ user.name }}</li>
  }
</ul>
```

```ts
import { Component, OnInit, signal } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./models/user.model";

@Component({
  selector: "app-user-list",
  templateUrl: "app.component.html",
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
    });
  }
}
```

## 14. Angular Interfaces

ใน Angular ใช้ TypeScript Interface เพื่อกำหนดรูปแบบของข้อมูล (data shape) ให้ชัดเจน ช่วยให้โค้ดปลอดภัยจาก type error และอ่านง่ายขึ้น

```ts
// src/app/models/user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}
```

```ts
// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}
```

การใช้งาน Interface ใน Service:

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users");
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
}
```

> **Best Practice:** สร้างโฟลเดอร์ `src/app/models/` แยกไว้สำหรับ Interface ทุกตัว เพื่อให้นำกลับมาใช้ซ้ำได้ง่าย

---

## 15. Environments

ใน Angular ใช้ environment files เพื่อแยกค่า config สำหรับแต่ละสภาพแวดล้อม เช่น development, staging, production

```
src/
└── environments/
    ├── environment.ts          # Development
    └── environment.prod.ts     # Production
```

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
};
```

```ts
export const environment = {
  production: true,
  apiUrl: "https://myapp.com/api",
};
```

การใช้งานใน Service:

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
```

การ build สำหรับ production:

```bash
ng build --configuration=production
```

> Angular CLI จะ swap `environment.ts` เป็น `environment.prod.ts` โดยอัตโนมัติตาม `angular.json`

---

## 16. HTTP Interceptors

Interceptors คือ middleware สำหรับ HTTP requests/responses ใน Angular ใช้สำหรับ:

- เพิ่ม Authorization Header อัตโนมัติ
- Handle errors แบบ global
- Log requests
- แสดง loading spinner

```ts
// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
    return next(authReq);
  }

  return next(req);
};
```

```ts
// src/app/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.error("Unauthorized - redirecting to login");
      }
      return throwError(() => error);
    }),
  );
};
```

ลงทะเบียน Interceptors ใน `app.config.ts`:

```ts
import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { authInterceptor } from "./interceptors/auth.interceptor";
import { errorInterceptor } from "./interceptors/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
  ],
};
```

> **Note:** Angular 21 ใช้ functional interceptors (`HttpInterceptorFn`) แทน class-based interceptors

## 17. Recommended Tooling

- Angular Language Service
- ESLint + Prettier
- Husky + lint-staged
- Vitest or Jasmine/Karma (team standard)
- Playwright or Cypress for E2E

## 18. Resources

- Angular Docs: https://angular.dev
- Angular CLI Reference: https://angular.dev/tools/cli
- RxJS Docs: https://rxjs.dev
- TypeScript Docs: https://www.typescriptlang.org/docs/
