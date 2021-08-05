import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { Book } from '../shared/book';

@Component({
  selector: 'app-book-editing-modal',
  templateUrl: './book-editing-modal.component.html',
  styleUrls: ['./book-editing-modal.component.css']
})
export class BookEditingModalComponent implements OnInit {

  public inputControl: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BookEditingModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Book
    ) {
      
    }

  private buildForm(book: Book): FormGroup {
    const controls: Record<keyof Book, unknown> = {
      id: book.id,
      title: [book.title, Validators.required],
      description: [book.description, Validators.required],
      excerpt: book.excerpt,
      pageCount: [book.pageCount, [Validators.required, Validators.min(1)]],
      publishDate: [book.publishDate, Validators.required],
    };
    return this.fb.group(controls);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.inputControl = this.buildForm(this.data)
  }
}
