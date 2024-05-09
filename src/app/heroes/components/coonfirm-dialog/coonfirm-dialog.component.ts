import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-coonfirm-dialog',
  templateUrl: './coonfirm-dialog.component.html',
  styleUrls: ['./coonfirm-dialog.component.css']
})
export class CoonfirmDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<CoonfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true)
  }

}
