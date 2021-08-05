import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import {
  BookInputAddControlls,
} from '../books-table/books-table.component.type';

@Component({
  selector: 'app-book-adding-modal',
  templateUrl: './book-adding-modal.component.html',
  styleUrls: ['./book-adding-modal.component.css']
})
export class BookAddingModalComponent implements OnInit {

  public inputControl: FormGroup = this.buildForm();

  constructor(
    public dialogRef: MatDialogRef<BookAddingModalComponent>,
    private fb: FormBuilder,) { }

  private buildForm(): FormGroup {
    const controls: Record<keyof BookInputAddControlls, unknown> = {
      title: ['', Validators.required],
      description: ['', Validators.required],
      pageCount: [0, [Validators.required, Validators.min(1)]],
      publishDate: [new Date(), Validators.required],
    };
    return this.fb.group(controls);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
  }
}
