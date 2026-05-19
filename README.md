# BC Book API

REST API สำหรับจัดการข้อมูลหนังสือ ผู้แต่ง สำนักพิมพ์ และหมวดหมู่

## Base URL

```
http://localhost:3000
```

ทุก endpoint อยู่ภายใต้ prefix `/api/v1`

---

## Models

### GET Parameters (ตัวอย่างการส่ง parameter)

รองรับทุก model สำหรับ endpoint แบบ index:

- `page` ค่าเริ่มต้นคือ `1`
- `per_page` ค่าเริ่มต้นคือ `10`

ตัวอย่าง:

```http
GET /api/v1/publishers?page=1&per_page=5
GET /api/v1/authors?page=2&per_page=10
GET /api/v1/categories?page=1&per_page=20
GET /api/v1/books?page=3&per_page=5
```

รองรับทุก model สำหรับ endpoint แบบ show:

- `:id` เป็น path parameter

ตัวอย่าง:

```http
GET /api/v1/publishers/1
GET /api/v1/authors/1
GET /api/v1/categories/1
GET /api/v1/books/1
```

### Publisher

| Method | Endpoint               | Description                                  |
| ------ | ---------------------- | -------------------------------------------- |
| GET    | /api/v1/publishers     | ดึงข้อมูลสำนักพิมพ์ทั้งหมด                   |
| GET    | /api/v1/publishers/:id | ดึงข้อมูลสำนักพิมพ์ตาม ID                    |
| POST   | /api/v1/publishers     | สร้างสำนักพิมพ์ใหม่                          |
| PUT    | /api/v1/publishers/:id | อัปเดตข้อมูลสำนักพิมพ์                       |
| DELETE | /api/v1/publishers/:id | ลบสำนักพิมพ์ (รวมหนังสือที่สังกัดสำนักพิมพ์) |

Example response (GET /api/v1/publishers)

```json
[
	{
		"id": 1,
		"name": "Penguin Random House",
		"email": "contact@penguinrandomhouse.com",
		"phone": "2123662000",
		"address": "1745 Broadway, New York, NY 10019"
	}
]
```

Example params (Publisher)

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

### Author

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | /api/v1/authors     | ดึงข้อมูลผู้แต่งทั้งหมด |
| GET    | /api/v1/authors/:id | ดึงข้อมูลผู้แต่งตาม ID  |
| POST   | /api/v1/authors     | สร้างผู้แต่งใหม่        |
| PUT    | /api/v1/authors/:id | อัปเดตข้อมูลผู้แต่ง     |
| DELETE | /api/v1/authors/:id | ลบผู้แต่งตาม ID         |

Example response (GET /api/v1/authors)

```json
[
	{
		"id": 1,
		"name": "George Orwell",
		"email": "gorwell@example.com",
		"phone": "0555010101"
	}
]
```

Example params (Author)

```json
{
	"author": {
		"name": "George Orwell",
		"email": "gorwell@example.com",
		"phone": "0555010101"
	}
}
```

### Category

| Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| GET    | /api/v1/categories     | ดึงข้อมูลหมวดหมู่ทั้งหมด |
| GET    | /api/v1/categories/:id | ดึงข้อมูลหมวดหมู่ตาม ID  |
| POST   | /api/v1/categories     | สร้างหมวดหมู่ใหม่        |
| PUT    | /api/v1/categories/:id | อัปเดตข้อมูลหมวดหมู่     |
| DELETE | /api/v1/categories/:id | ลบหมวดหมู่ตาม ID         |

Example response (GET /api/v1/categories)

```json
[
	{
		"id": 1,
		"name": "Fiction",
		"description": "Fictional literature"
	}
]
```

Example params (Category)

```json
{
	"category": {
		"name": "Fiction",
		"description": "Fictional literature"
	}
}
```

### Book

| Method | Endpoint          | Description                                                  |
| ------ | ----------------- | ------------------------------------------------------------ |
| GET    | /api/v1/books     | ดึงข้อมูลหนังสือทั้งหมด (พร้อม authors, publisher, category) |
| GET    | /api/v1/books/:id | ดึงข้อมูลหนังสือตาม ID (พร้อม authors, publisher, category)  |
| POST   | /api/v1/books     | สร้างหนังสือใหม่                                             |
| PUT    | /api/v1/books/:id | อัปเดตข้อมูลหนังสือ                                          |
| DELETE | /api/v1/books/:id | ลบหนังสือตาม ID                                              |

Example response (GET /api/v1/books)

```json
[
	{
		"id": 1,
		"title": "1984",
		"price": "12.99",
		"publisher_id": 1,
		"category_id": 1,
		"authors": [
			{
				"id": 1,
				"name": "George Orwell"
			}
		],
		"publisher": {
			"id": 1,
			"name": "Penguin Random House"
		},
		"category": {
			"id": 1,
			"name": "Fiction"
		}
	}
]
```

Example params (Book)

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

---

## Error Responses

| Status | ความหมาย                                         |
| ------ | ------------------------------------------------ |
| 404    | ไม่พบ resource ที่ระบุ                           |
| 422    | ข้อมูลที่ส่งมาไม่ถูกต้อง (Unprocessable Content) |

---

## Health Check

ตรวจสอบสถานะของ server `GET /up`

**Response 200** — server ทำงานปกติ
