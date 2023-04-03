import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeDialog } from 'src/app/interfaces/attribute-dialog';

@Component({
  selector: 'app-dialog-new-product-attribute',
  templateUrl: './dialog-new-product-attribute.component.html'
})
export class DialogNewProductAttributeComponent {
  attrType = new FormControl('text');

  constructor(
    public dialogRef: MatDialogRef<DialogNewProductAttributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AttributeDialog,
  ) { }
}
