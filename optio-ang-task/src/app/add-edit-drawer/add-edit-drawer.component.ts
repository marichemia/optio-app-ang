import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReferenceApiService } from '../core/services/reference-api.service';

@Component({
  selector: 'app-add-edit-drawer',
  templateUrl: './add-edit-drawer.component.html',
  styleUrls: ['./add-edit-drawer.component.scss']
})
export class AddEditDrawerComponent implements OnInit {

  form!: FormGroup;
  fileName: string | undefined = undefined;
  labelsArr: any;
  zonesArr: any;
  channelsArr: any;
  languagesArr: any;

  constructor(private _httpClient: HttpClient,
    private fb: FormBuilder,
    private refApiService: ReferenceApiService) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      channel: ['', [Validators.required]],
      language: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      priority: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
      startDate: ['', Validators.required],
      endDate: '',
      active: ['true', [Validators.required]],
      labels: [''],
    });

    //get reference data

    this.refApiService.getData('1900').subscribe(res => {
      this.labelsArr = res.data.entities;
    });

    this.refApiService.getData('1700').subscribe(res => {
      this.zonesArr = res.data.entities;
    });

    this.refApiService.getData('1600').subscribe(res => {
      this.channelsArr = res.data.entities;
    });

    this.refApiService.getData('2900').subscribe(res => {
      this.languagesArr = res.data.entities;
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

  onSubmit() {
    console.log(this.form.value);
  }

}
