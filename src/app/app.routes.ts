import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { CategoriesComponents } from './components/categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },

      { path: 'books', component: BooksComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'publishers', component: PublishersComponent },
      { path: 'categories', component: CategoriesComponents },

      { path: '**', redirectTo: 'books' },
    ],
  },
];
