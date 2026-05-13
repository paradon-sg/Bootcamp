---
marp: true
title: Angular 21 Bootcamp
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

# Angular 21 Bootcamp

สร้างเว็บแอปพลิเคชันที่ทันสมัย รวดเร็ว และขยายขนาดได้ด้วย Angular 21

- **ระยะเวลา:** 2 วัน (หรือ 1 วันแบบเข้มข้น)
- **กลุ่มเป้าหมาย:** นักพัฒนา Frontend ระดับเริ่มต้นถึงกลาง
- **รูปแบบ:** 40% ทฤษฎี, 60% ปฏิบัติ

---

## Learning Outcomes

**ผลลัพธ์การเรียนรู้:**

เมื่อจบคอร์สนี้ ผู้เรียนจะสามารถ:

- อธิบายโครงสร้างและสถาปัตยกรรมของ Angular
- สร้างแอปพลิเคชันแบบ Standalone Component
- ใช้ Signals และรูปแบบการจัดการ Reactivity สมัยใหม่
- สร้างฟอร์ม, Routing, และการจัดการข้อมูล HTTP
- ทดสอบ, ปรับปรุงประสิทธิภาพ, และ Deploy แอป Angular

---

## Prerequisites

**ความรู้พื้นฐานที่จำเป็น:**

- พื้นฐาน JavaScript และ TypeScript
- ความรู้ HTML/CSS
- ติดตั้ง Node.js LTS
- ติดตั้ง VS Code พร้อม Angular Language Service Extension

---

## Why Angular 21?

**ทำไมต้อง Angular 21?**

Angular 21 เป็นเฟรมเวิร์กที่ครบเครื่องสำหรับการพัฒนาเว็บแอปพลิเคชันขนาดใหญ่และซับซ้อน โดยมีจุดเด่นดังนี้:

- **Mature framework with batteries included:** มีฟีเจอร์พื้นฐานครบ เช่น Routing, Forms, HTTP, State Management, Testing, และ CLI
- **Strong TypeScript-first developer experience:** ใช้ TypeScript เป็นหลัก ทำให้โค้ดปลอดภัยและอ่านง่าย
- **Modern reactivity with signals:** ระบบ signals ใหม่ช่วยให้การจัดการ state มีประสิทธิภาพและเข้าใจง่ายขึ้น
- **Great tooling for large teams:** มี CLI, Language Service, และ DevTools ที่ช่วยให้ทีมทำงานร่วมกันได้ดี
- **Built-in patterns for scalability and maintainability:** มีแนวทางการออกแบบที่เหมาะกับโปรเจกต์ขนาดใหญ่และดูแลรักษาง่าย

> **Tip:** Angular 21 รองรับการพัฒนาแบบ Standalone Component ทำให้โครงสร้างโปรเจกต์สะอาดและลดความซับซ้อน

---

## Environment Setup

**การตั้งค่าสภาพแวดล้อม:**

```bash
node -v
npm -v
npm install -g @angular/cli
ng version
```

สร้างโปรเจกต์ใหม่:

```bash
ng new angular21-bootcamp --standalone --routing --style=scss
cd angular21-bootcamp
ng serve -o
```

---

## Project Structure & Architecture

**โครงสร้างโปรเจ็ค Angular 21:**

```
my-angular-app/
├── node_modules/         # npm dependencies installed for the project.
├── src/                  # The source code for your application.
│   ├── app/              # Contains your application's components, services, etc.
│   │   ├── app.ts                # The logic for the root component.
│   │   ├── app.html              # The HTML template for the root component.
│   │   ├── app.scss              # The styles specific to the root component.
│   │   └── app.config.ts         # App-level configuration (Routing, Providers).
│   ├── assets/           # Static assets like images, fonts, or icons.
│   ├── index.html        # The main HTML page served to the browser.
│   ├── main.ts           # The main entry point; compiles the application and boots it up.
│   └── styles.scss       # Global SCSS styles applied to the whole application.
├── angular.json          # CLI configuration (defines build setups, project defaults, etc.).
├── package.json          # npm configuration (lists dependencies and custom scripts).
└── tsconfig.json         # TypeScript compiler configuration.
```

### bc-app Project Structure

**โครงสร้างของ bc-app Project:**

```
bc-app/
├── src/
│   ├── app/
│   │   ├── app.ts              # Root Component (Standalone)
│   │   ├── app.html            # HTML Template for Root Component
│   │   ├── app.scss            # Styles for Root Component
│   │   ├── app.config.ts       # App-level configuration (Providers, Services)
│   │   └── app.routes.ts       # Application Routing Configuration
│   ├── main.ts                 # Main entry point; boots the application
│   ├── index.html              # Main HTML page
│   └── styles.scss             # Global styles for the application
├── public/                     # Public static files (favicon, robots.txt, etc.)
├── angular.json                # Angular CLI configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

### Core Files Explanation

- **\`src/main.ts\`**: จุดเริ่มต้นของการบูตแอป
  - เป็นไฟล์แรกที่ทำงานเมื่อแอปเริ่มต้น
  - รับผิดชอบในการโหลด Root Component และการตั้งค่าให้กับแอป

- **\`src/app/app.ts\`**: Root Component (Standalone)
  - เป็นคอมโพเนนต์หลักของแอป
  - ใช้รูปแบบ Standalone ไม่ต้องพึ่ง NgModule

- **\`src/app/app.html\`**: HTML Template for Root Component
  - เป็น Template HTML สำหรับ Root Component
  - ใช้สำหรับเลย์เอาต์หลักและการแสดงผลข้อมูล

- **\`src/app/app.scss\`**: Styles for Root Component
  - CSS/SCSS styles สำหรับ Root Component
  - ใช้สำหรับการออกแบบ UI ของคอมโพเนนต์หลัก

- **\`src/app/app.config.ts\`**: App-level Configuration
  - ระบุ Providers ทั้งหมดของแอป
  - ตั้งค่า Global Configuration เช่น HTTP, Router, Services

- **\`src/app/app.routes.ts\`**: Application Routing
  - กำหนด Routes ทั้งหมดของแอป
  - สนับสนุน Lazy Loading สำหรับ Feature Modules

---

## Angular Fundamentals

### Standalone Components First

**Standalone Component คืออะไร?**

เป็นการสร้างคอมโพเนนต์โดยไม่ต้องพึ่ง NgModule อีกต่อไป ทำให้โค้ดกระชับและแยกส่วนได้ดี

**ข้อดี:**
- ลด boilerplate code
- ง่ายต่อการแยก feature และ lazy load
- เหมาะกับการเขียน unit test

**ตัวอย่าง:**
```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: \`<h2>{{ title() }}</h2>\`
})
export class WelcomeComponent {
  title = signal('Angular 21 Bootcamp');
}
```
> **Best Practice:** ใช้ Standalone Component สำหรับทุก feature ใหม่ และแยกโค้ดแต่ละหน้าหรือแต่ละฟีเจอร์ออกเป็นไฟล์ของตัวเอง

---

### Templates and Binding

**รูปแบบการ Binding หลักใน Angular:**

- **Interpolation:** \`{{ value }}\`
- **Property binding:** \`[disabled]="isBusy()"\`
- **Event binding:** \`(click)="save()"\`
- **Two-way binding:** \`[(ngModel)]="model.name"\`

> **Tip:** ควรรักษา logic ใน template ให้เรียบง่าย และย้ายความซับซ้อนไปไว้ใน component code

---

### Signals in Practice

**Signals คืออะไร?**

Signals คือ state primitive แบบใหม่ใน Angular 21 ที่ช่วยให้การจัดการ state ง่ายและมีประสิทธิภาพ

**ตัวอย่าง:**
```ts
import { signal, computed } from '@angular/core';

count = signal(0);
doubleCount = computed(() => count() * 2);

function increment() {
  count.update(v => v + 1);
}
```

**ข้อดี:**
- อัปเดตเฉพาะส่วนที่เปลี่ยนจริง (fine-grained)
- อ่าน/เขียน state ได้ predictable
- ใช้งานง่ายสำหรับ local UI state

> **Best Practice:** ใช้ signals สำหรับ state ภายในคอมโพเนนต์ และใช้ RxJS สำหรับ async data หรือ global state

---

### RxJS and Signals Together

**การใช้งาน RxJS และ Signals ร่วมกัน:**

- **Signals:** ใช้สำหรับ local component state
- **RxJS:** ใช้สำหรับ async streams, HTTP, และ event orchestration

**ตัวอย่างการใช้งานร่วมกัน:**
```ts
users = toSignal(this.userService.getUsers(), { initialValue: [] });
```

---

### Dependency Injection

**Dependency Injection (DI) ใน Angular:**

DI ช่วยให้โค้ดมีความ modular และ testable

**ตัวอย่าง:**
```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}
```

---

### Routing Fundamentals

**Routing คืออะไร?**

Routing คือการกำหนดเส้นทาง (URL) ให้กับแต่ละหน้าในแอป

**ตัวอย่างการกำหนด routes:**
```ts
import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home.page';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'users',
    loadComponent: () => import('./users/users.page').then(m => m.UsersPage),
  },
  { path: '**', redirectTo: '' },
];
```

**การใช้งาน RouterLink ใน template:**
```html
<a routerLink="/users">Users</a>
```

> **Best Practice:** ใช้ lazy loading กับ feature ขนาดใหญ่เพื่อลดขนาด bundle และเพิ่ม performance

---

### Route Guards and Access Control

**Route Guards:**

ใช้สำหรับควบคุมการเข้าถึงเส้นทางในแอป

**ตัวอย่าง:**
```ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() || inject(Router).createUrlTree(['/login']);
};
```

---

### Reactive Forms

**Reactive Forms ใน Angular 21:**

ช่วยให้การจัดการฟอร์มมีความยืดหยุ่นและควบคุมได้ง่าย

**ตัวอย่างการสร้างฟอร์ม:**
```ts
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  template: \`
    <form [formGroup]="profileForm" (ngSubmit)="submit()">
      <label>
        Name:
        <input formControlName="name" />
      </label>
      <label>
        Email:
        <input formControlName="email" type="email" />
      </label>
      <button type="submit" [disabled]="profileForm.invalid">Submit</button>
    </form>
  \`,
})
export class ProfileFormComponent {
  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}
```

**Best Practices:**
- ใช้ \`FormBuilder\` เพื่อสร้างฟอร์มที่อ่านง่าย
- แยก validation logic ออกเป็นไฟล์หรือฟังก์ชันสำหรับการใช้งานซ้ำ

---

### HTTP Client and Data Layer

**Angular 21 ใช้ HttpClient สำหรับการทำงานกับ API อย่างมีประสิทธิภาพ**

**ตัวอย่างการเรียก API:**
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

**การใช้งานในคอมโพเนนต์:**
```ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: \`
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  \`,
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => (this.users = data));
  }
}
```

**Best Practices:**
- ใช้ RxJS operators เช่น \`catchError\` และ \`map\` สำหรับการจัดการ error และ transform data
- แยก data layer ออกจาก UI layer เพื่อความยืดหยุ่น

---

### Error Handling Strategy

**การจัดการข้อผิดพลาดใน Angular 21 ควรมีทั้งระดับ local และ global**

**ตัวอย่าง Global Error Interceptor:**
```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(() => error);
      })
    );
  }
}
```

**Best Practices:**
- ใช้ Interceptor สำหรับข้อผิดพลาดที่เกิดซ้ำ เช่น Authentication หรือ Network Error
- แสดงข้อความ error ที่เหมาะสมกับผู้ใช้ใน UI
- บันทึกข้อผิดพลาดสำคัญลงระบบ logging เพื่อการ debug

---

## Full-Stack Architecture: Frontend (Angular) + Backend (Ruby on Rails)

**สถาปัตยกรรมของแอปพลิเคชัน Full-Stack:**

```
bc-app (Angular 21 Frontend)
│
├── HTTP Requests (RESTful API)
│
└─→ Rails API Backend
    ├── Models
    ├── Controllers
    ├── Services
    └── Database
```

### Frontend (Angular) - bc-app

**หน้าที่:**
- รับผิดชอบการแสดงผล UI/UX ให้กับผู้ใช้
- จัดการ State และการนำทางในแอป
- เรียก API จาก Backend เพื่อดึงและส่งข้อมูล
- จัดการ Form Input และ Validation

**Technology Stack:**
- Angular 21 (Standalone Components)
- TypeScript
- RxJS (Reactive Programming)
- SCSS (Styling)
- Angular Router (Routing)
- HttpClient (API Communication)

**โครงสร้าง:**
```
bc-app/src/app/
├── services/          # Services for API calls and business logic
├── components/        # Reusable UI components
├── pages/            # Page components for routing
├── models/           # TypeScript interfaces and types
├── app.ts            # Root component
├── app.routes.ts     # Route definitions
└── app.config.ts     # App configuration
```

### Backend (Ruby on Rails) - API Server

**หน้าที่:**
- จัดการ Database และ Business Logic
- ให้ REST API endpoints สำหรับ Frontend
- ตรวจสอบความถูกต้องของข้อมูล (Validation)
- จัดการ Authentication และ Authorization

**Technology Stack:**
- Ruby on Rails (Framework)
- PostgreSQL หรือ MySQL (Database)
- RESTful API Design
- Active Record (ORM)

**โครงสร้าง:**
```
rails-api/
├── app/
│   ├── models/        # Database models
│   ├── controllers/   # API endpoints
│   ├── serializers/   # Response formatting
│   └── policies/      # Authorization logic
├── config/
│   └── routes.rb      # API route definitions
├── db/
│   ├── migrate/       # Database migrations
│   └── schema.rb      # Database schema
├── Gemfile            # Ruby dependencies
└── config.ru          # Rails application config
```

### API Communication Pattern

**ตัวอย่าง HTTP Request from Angular to Rails:**

```ts
// Angular Service (bc-app)
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.patch<User>(\`\${this.apiUrl}/\${id}\`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
  }
}
```

```ruby
# Rails API Controller (Backend)
class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /api/users
  def index
    @users = User.all
    render json: @users
  end

  # POST /api/users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH /api/users/:id
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/users/:id
  def destroy
    @user.destroy
    render json: { message: 'User deleted' }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
```

### CORS Configuration for Frontend-Backend Communication

**Rails Configuration (config/initializers/cors.rb):**
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:4200' # Angular development server
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete]
  end
end
```

**Angular HTTP Interceptor (for adding headers):**
```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: \`Bearer \${token}\`,
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(req);
  }
}
```

### Development Workflow

**Starting the Development Environment:**

1. **Start Rails API:**
```bash
cd rails-api
bundle install
rails db:create db:migrate
rails s -p 3000
```

2. **Start Angular Frontend:**
```bash
cd bc-app
npm install
ng serve -o
# Opens at http://localhost:4200
```

3. **API is accessible at:**
- \`http://localhost:3000/api/users\` (Rails API)
- Angular frontend communicates via HttpClient

---

## Testing Pyramid

การทดสอบใน Angular แบ่งเป็น 3 ระดับ:

- **Unit tests:** ทดสอบฟังก์ชันหรือคอมโพเนนต์แยกส่วน (รวดเร็ว)
- **Integration tests:** ทดสอบการทำงานร่วมกันของหลายส่วน
- **E2E tests:** ทดสอบการใช้งานจริงแบบครบ flow (เช่น Cypress, Playwright)

**ตัวอย่างคำสั่ง:**
```bash
ng test         # Unit & integration
ng e2e          # End-to-end
```

> **Best Practice:** เขียน unit test ให้ครอบคลุม logic สำคัญ และเพิ่ม E2E test สำหรับ user journey หลัก

---

## Example Unit Test

```ts
describe('CounterComponent', () => {
  it('increments count', () => {
    const fixture = TestBed.createComponent(CounterComponent);
    const component = fixture.componentInstance;
    component.increment();
    expect(component.count()).toBe(1);
  });
});
```

---

## Performance Checklist

- Prefer lazy-loaded routes
- Use \`OnPush\`-friendly patterns
- Track list rendering (\`@for (...; track item.id)\`)
- Split heavy components
- Avoid unnecessary subscriptions

---

## Build and Deploy

```bash
ng build --configuration production
```

Deployment options:

- Firebase Hosting
- Netlify
- Vercel
- Azure Static Web Apps
- Nginx static hosting

---

## Hands-on Labs

Lab 1: Create a product list feature

- Build \`ProductCardComponent\`
- Fetch data from mock API
- Add loading and error states

Lab 2: Add product details route

- Lazy-load page
- Resolve data by id

Lab 3: Form + validation

- Build product create form
- Client-side validation messages

---

## Capstone Challenge

Build a mini app in teams:

- Authentication shell (mock)
- Dashboard with chart cards
- CRUD for one resource
- Route protection and form validation
- Unit tests for one service + one component

---

## Suggested Timeline (1 Day)

- 09:00-10:00: Setup + Angular fundamentals
- 10:00-11:30: Components, templates, signals
- 11:30-12:30: Routing and forms
- 13:30-15:00: Services, HTTP, error handling
- 15:00-16:00: Testing and performance
- 16:00-17:00: Capstone + demos

---

## Common Pitfalls

- Putting business logic directly in templates
- Overusing shared mutable state
- Missing error states in async UI
- Not testing critical workflows
- Premature optimization before measurement

---

## Recommended Tooling

- Angular Language Service
- ESLint + Prettier
- Husky + lint-staged
- Vitest or Jasmine/Karma (team standard)
- Playwright or Cypress for E2E

---

## Resources

- Angular Docs: https://angular.dev
- Angular CLI Reference: https://angular.dev/tools/cli
- RxJS Docs: https://rxjs.dev
- TypeScript Docs: https://www.typescriptlang.org/docs/

---

## Wrap-Up

You now have a roadmap to:

- Build production-ready Angular 21 apps
- Use signals and modern Angular patterns
- Deliver maintainable code with tests and performance in mind

Questions?
