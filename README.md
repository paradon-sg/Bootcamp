# BCBook API

REST API สำหรับจัดการข้อมูลหนังสือ ผู้แต่ง สำนักพิมพ์ และหมวดหมู่

## Base URL

```
http://localhost:3000
```

ทุก endpoint อยู่ภายใต้ prefix `/api/v1`

---

## Publishers (สำนักพิมพ์)

### GET /api/v1/publishers
ดึงข้อมูลสำนักพิมพ์ทั้งหมด

**Response 200**
```json
[
  {
    "id": 1,
    "name": "Penguin Random House",
    "email": "contact@penguinrandomhouse.com",
    "phone": "2123662000",
    "address": "1745 Broadway, New York, NY 10019",
    "created_at": "2026-05-14T06:00:00.000Z",
    "updated_at": "2026-05-14T06:00:00.000Z"
  }
]
```

---

### GET /api/v1/publishers/:id
ดึงข้อมูลสำนักพิมพ์ตาม ID

**Response 200**
```json
{
  "id": 1,
  "name": "Penguin Random House",
  "email": "contact@penguinrandomhouse.com",
  "phone": "2123662000",
  "address": "1745 Broadway, New York, NY 10019",
  "created_at": "2026-05-14T06:00:00.000Z",
  "updated_at": "2026-05-14T06:00:00.000Z"
}
```

---

### POST /api/v1/publishers
สร้างสำนักพิมพ์ใหม่

**Request Body**
```json
{
  "publisher": {
    "name": "Penguin Random House",
    "email": "contact@penguinrandomhouse.com",
    "phone": "2123662000",
    "address": "1745 Broadway, New York, NY 10019"
  }
}
```

**Response 201**
```json
{
  "id": 1,
  "name": "Penguin Random House",
  "email": "contact@penguinrandomhouse.com",
  "phone": "2123662000",
  "address": "1745 Broadway, New York, NY 10019",
  "created_at": "2026-05-14T06:00:00.000Z",
  "updated_at": "2026-05-14T06:00:00.000Z"
}
```

---

### PATCH /api/v1/publishers/:id
อัปเดตข้อมูลสำนักพิมพ์ (ส่งเฉพาะ field ที่ต้องการเปลี่ยน)

**Request Body**
```json
{
  "publisher": {
    "phone": "0999990000"
  }
}
```

**Response 200** — คืน object ที่อัปเดตแล้ว

---

### DELETE /api/v1/publishers/:id
ลบสำนักพิมพ์ตาม ID (จะลบหนังสือที่สังกัดสำนักพิมพ์นั้นด้วย)

**Response 200**
```json
{ "message": "Publisher deleted successfully" }
```

---

## Authors (ผู้แต่ง)

### GET /api/v1/authors
ดึงข้อมูลผู้แต่งทั้งหมด

**Response 200**
```json
[
  {
    "id": 1,
    "name": "George Orwell",
    "email": "gorwell@example.com",
    "phone": "0555010101",
    "created_at": "2026-05-14T06:00:00.000Z",
    "updated_at": "2026-05-14T06:00:00.000Z"
  }
]
```

---

### GET /api/v1/authors/:id
ดึงข้อมูลผู้แต่งตาม ID

**Response 200** — คืน object ของผู้แต่ง

---

### POST /api/v1/authors
สร้างผู้แต่งใหม่

**Request Body**
```json
{
  "author": {
    "name": "George Orwell",
    "email": "gorwell@example.com",
    "phone": "0555010101"
  }
}
```

**Response 201** — คืน object ของผู้แต่งที่สร้าง

---

### PATCH /api/v1/authors/:id
อัปเดตข้อมูลผู้แต่ง

**Request Body**
```json
{
  "author": {
    "email": "newemail@example.com"
  }
}
```

**Response 200** — คืน object ที่อัปเดตแล้ว

---

### DELETE /api/v1/authors/:id
ลบผู้แต่งตาม ID

**Response 200**
```json
{ "message": "Author deleted successfully" }
```

---

## Categories (หมวดหมู่)

### GET /api/v1/categories
ดึงข้อมูลหมวดหมู่ทั้งหมด

**Response 200**
```json
[
  {
    "id": 1,
    "name": "Fiction",
    "description": "Fictional literature",
    "created_at": "2026-05-14T06:00:00.000Z",
    "updated_at": "2026-05-14T06:00:00.000Z"
  }
]
```

---

### GET /api/v1/categories/:id
ดึงข้อมูลหมวดหมู่ตาม ID

**Response 200** — คืน object ของหมวดหมู่

---

### POST /api/v1/categories
สร้างหมวดหมู่ใหม่

**Request Body**
```json
{
  "category": {
    "name": "Fiction",
    "description": "Fictional literature"
  }
}
```

**Response 201** — คืน object ของหมวดหมู่ที่สร้าง

---

### PATCH /api/v1/categories/:id
อัปเดตข้อมูลหมวดหมู่

**Request Body**
```json
{
  "category": {
    "description": "Updated description"
  }
}
```

**Response 200** — คืน object ที่อัปเดตแล้ว

---

### DELETE /api/v1/categories/:id
ลบหมวดหมู่ตาม ID

**Response 200**
```json
{ "message": "Category deleted successfully" }
```

---

## Books (หนังสือ)

### GET /api/v1/books
ดึงข้อมูลหนังสือทั้งหมด (พร้อม authors, publisher, category)

**Response 200**
```json
[
  {
    "id": 1,
    "title": "1984",
    "price": "12.99",
    "publisher_id": 1,
    "category_id": 1,
    "created_at": "2026-05-14T06:00:00.000Z",
    "updated_at": "2026-05-14T06:00:00.000Z",
    "authors": [...],
    "publisher": {...},
    "category": {...}
  }
]
```

---

### GET /api/v1/books/:id
ดึงข้อมูลหนังสือตาม ID (พร้อม authors, publisher, category)

**Response 200** — คืน object ของหนังสือ

---

### POST /api/v1/books

**Request Body**
```json
{
  "book": {
    "title": "1984",
    "price": 12.99,
    "publisher_id": 1,
    "category_id": 1,
    "author_ids": [1, 2]
  }
}
```

**Response 201** — คืน object ของหนังสือที่สร้าง

---

### PATCH /api/v1/books/:id
อัปเดตข้อมูลหนังสือ

**Request Body**
```json
{
  "book": {
    "price": 15.99,
    "author_ids": [1, 2, 3]
  }
}
```

**Response 200** — คืน object ที่อัปเดตแล้ว

---

### DELETE /api/v1/books/:id
ลบหนังสือตาม ID

**Response 200**
```json
{ "message": "Book deleted successfully" }
```

---

## Error Responses

| Status | ความหมาย |
|--------|----------|
| 404 | ไม่พบ resource ที่ระบุ |
| 422 | ข้อมูลที่ส่งมาไม่ถูกต้อง (Unprocessable Content) |

**ตัวอย่าง 422**
```json
{
  "message": ["Title can't be blank", "Price can't be blank"]
}
```

---

## Health Check

### GET /up
ตรวจสอบสถานะของ server

**Response 200** — server ทำงานปกติ


### POST /api/v1/books
สร้างหนังสือใหม่

**Request Body**
```json
{
  "book": {
    "title": "1984",
    "price": 12.99,
    "stock": 45,
    "publisher_id": 1
  }
}
```

**Response 201** — คืน object ของหนังสือที่สร้าง

---

### PATCH /api/v1/books/:id
อัปเดตข้อมูลหนังสือ

**Request Body**
```json
{
  "book": {
    "price": 15.99,
    "stock": 100
  }
}
```

**Response 200** — คืน object ที่อัปเดตแล้ว

---

### DELETE /api/v1/books/:id
ลบหนังสือตาม ID

**Response 204 No Content**

---

## Error Responses

| Status | ความหมาย |
|--------|----------|
| 404 | ไม่พบ resource ที่ระบุ |
| 422 | ข้อมูลที่ส่งมาไม่ถูกต้อง (Unprocessable Content) |

**ตัวอย่าง 422**
```json
{
  "title": ["can't be blank"],
  "publisher_id": ["can't be blank"]
}
```

---

## Health Check

### GET /up
ตรวจสอบสถานะของ server

**Response 200** — server ทำงานปกติ

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
