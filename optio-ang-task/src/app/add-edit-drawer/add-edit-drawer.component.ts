import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-drawer',
  templateUrl: './add-edit-drawer.component.html',
  styleUrls: ['./add-edit-drawer.component.scss']
})
export class AddEditDrawerComponent implements OnInit {

  form!: FormGroup;
  fileName: string | undefined = undefined;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _httpClient: HttpClient, private fb: FormBuilder,) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      chanelId: ['', [Validators.required]],
      language: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
      startDate: ['', Validators.required],
      endDate: '',
      active: ['true', [Validators.required]],
      labels: ['', [Validators.required]],
    });

  }

  onFileSelected(e: any) {
    const img: File = e.target.files[0];

    if (img) {
      this.fileName = img.name;

      const formData = new FormData();
      formData.set('blob', img);

      return this._httpClient.post('https://development.api.optio.ai/api/v2/blob/upload', formData).subscribe(res => console.log(res));
    } else {

      return;

    }
  }

}
