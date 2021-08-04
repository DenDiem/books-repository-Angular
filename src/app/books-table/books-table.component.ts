import { 
  Component,
  OnInit,
  ViewChild,
  } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../shared/book';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {

  public dataSource: MatTableDataSource<Book> = new MatTableDataSource([]);
  public bookNameFilter = new FormControl();

  @ViewChild(MatPaginator)
  private paginator: MatPaginator;
  @ViewChild(MatSort)
  private sort: MatSort;
  
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe((books: Book[]) => {
      this.dataSource.data = books;
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
