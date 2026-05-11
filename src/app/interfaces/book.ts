import { Author } from "./author";
import { Category } from "./category";
import { Publisher } from "./publisher";

export interface Book {
  id: number;
  price: string;
  title: string;
  category_id: number;
  publisher_id: number;
  created_at: Date;
  updated_at: Date;
  authors: Author[];
  category: Category;
  publisher: Publisher;
}
