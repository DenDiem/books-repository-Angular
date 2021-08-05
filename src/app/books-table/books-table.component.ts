import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  Observable,
  Subject,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  BookAddingModalComponent,
} from '../book-adding-modal/book-adding-modal.component';
import {
  BookEditingModalComponent,
} from '../book-editing-modal/book-editing-modal.component';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book';
import {
  BookTableColumnName,
  bookTableDisplayedColumns,
} from './books-table.component.type';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {

  public readonly BookTableColumnName: typeof BookTableColumnName = BookTableColumnName;
  public dataSource: MatTableDataSource<Book> = new MatTableDataSource([]);
  public displayedColumns: string[] = bookTableDisplayedColumns;
  public bookTitleFilter = new FormControl();
  public selection = new SelectionModel<Book>(false, []);

  private destroySubject: Subject<void> = new Subject();
  private destroy$: Observable<void> = this.destroySubject.asObservable();
  
  @ViewChild(MatPaginator)
  private paginator: MatPaginator;
  @ViewChild(MatSort)
  private sort: MatSort;
  
  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.getCustomFilterPredicate();
    this.bookService.getBooks()
      .subscribe((books: Book[]) => {
        this.dataSource.data = books;
      });

    this.bookTitleFilter.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((filter: string) => {
      this.dataSource.filter = filter;
    });
  }
  
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public openEditDialog(): void {
    if(!this.selection.selected[0]) return;
    const selectedData: Book = {
      id: this.selection.selected[0].id,
      title: this.selection.selected[0]?.title,
      description: this.selection.selected[0]?.description,
      excerpt: this.selection.selected[0]?.description,
      pageCount: this.selection.selected[0].pageCount,
      publishDate: this.selection.selected[0].publishDate,
    }
    const dialogRef = this.dialog.open(BookEditingModalComponent, {
      width: '400px',
      data: selectedData 
    });

    dialogRef.afterClosed().subscribe((book: Book) => {
      if(book){
        this.bookService.updateBook(book)
        .subscribe(() => this.updateDataSource(book))
      }
    });
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(BookAddingModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((book: Book) => {
      if(book){
        book.id = this.dataSource.data.length + 1;
        this.bookService.addBook(book)
        .subscribe(() => this.dataSource.data.push(book))
      }
    });
  }

  private updateDataSource(newBook: Book): void {
    const editBook = this.dataSource.data.filter((oldBook: Book) => oldBook.id === newBook.id)[0];
    if(editBook){
      editBook.title = newBook.title;
      editBook.description = newBook.description;
      editBook.pageCount = newBook.pageCount;
      editBook.publishDate = newBook.publishDate; 
    }
  }

  private getCustomFilterPredicate(): (book: Book, filter: string) => boolean {
    const bookTitleFilterPredicate = (book: Book, filter: string) => {
      return book.title.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1;
    }
    return bookTitleFilterPredicate;
  }
}

