import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReferenceApiService } from '../core/services/reference-api.service';
import { BlobResponse } from '../core/interfaces/blob-response.interface';
import { keyframes } from '@angular/animations';
import { SaveBanner, editedData } from '../core/interfaces/banner-save.interface';
import { BannersApiService } from '../core/services/banners-api.service';
import { SharedService } from '../shared/shared.service';
import { Banner } from '../core/interfaces/get-banners.interceptor';

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
  //counter: number = 1;
  file: string | undefined;
  currentBanner!: Banner;
  isEditMode: boolean | undefined;
  formReset: boolean = false;
  @Output() resetFormEvent = new EventEmitter<void>();

  constructor(private _httpClient: HttpClient,
    private fb: FormBuilder,
    private refApiService: ReferenceApiService, private bannersService: BannersApiService,
    private sharedService: SharedService) { }

  ngOnInit() {



    this.form = this.fb.group({
      name: ['', [Validators.required]],
      channelId: ['', [Validators.required]],
      language: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
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

    //subscribe to form reset observable

    this.sharedService.resetForm.subscribe(res => {

      if (res) {
        this.form.reset();
      }

    })



    //subscribe to selected user and isEditMode

    combineLatest([this.bannersService.getBannerObservable(), this.sharedService.isEditMode]).subscribe(([currentBanner, isEditMode]) => {
      this.currentBanner = currentBanner;
      this.isEditMode = isEditMode;
      console.log(currentBanner, isEditMode)
      if (isEditMode && currentBanner) {
        this.form.controls['name'].setValue(currentBanner.name);
        this.form.controls['channelId'].setValue(currentBanner.channelId);
        this.form.controls['language'].setValue(currentBanner.language);
        this.form.controls['zoneId'].setValue(currentBanner.zoneId);
        this.form.controls['priority'].setValue(currentBanner.priority);
        this.form.controls['url'].setValue(currentBanner.url);
        this.form.controls['startDate'].setValue(currentBanner.startDate);
        this.form.controls['endDate'].setValue(currentBanner.endDate);
        this.form.controls['active'].setValue(currentBanner.active ? 'true' : 'false');
        this.form.controls['labels'].setValue(currentBanner.labels);

        this.file = currentBanner.fileId;

      }
    });




  }

  onResetForm() {
    this.form.reset();
  }

  onFileSelected(e: any) {
    const img: File = e.target.files[0];

    if (img) {
      this.fileName = img.name;

      const formData = new FormData();
      formData.set('blob', img);

      return this._httpClient.post<BlobResponse>('https://development.api.optio.ai/api/v2/blob/upload', formData).subscribe(res => {
        console.log(res)
        this.file = res.data.id;
      });
    } else {

      return;

    }
  }

  onSubmit() {

    let data: SaveBanner;

    if (this.isEditMode && this.file) {

      //add id and file id to the edited form value

      data = { ...{ id: this.currentBanner.id, fileId: this.file, ...this.form.value, } }

      //POST

      this._httpClient.post('https://development.api.optio.ai/api/v2/banners/save', data).subscribe(res => console.log(res))

    } else if (this.file) {

      //transform user input for POST request 

      const editedData: editedData = {

        fileId: this.file,
        startDate: this.form.controls['startDate'].value.toISOString(),

      }

      //apply changes

      data = { ...this.form.value, ...editedData };

      if (data.endDate) {
        editedData.endDate = this.form.controls['endDate'].value.toISOString();
      } else {
        delete data.endDate;
      }

      if (!data.labels) {
        delete data.labels;
      }

      //POST
      console.log(data)
      this._httpClient.post('https://development.api.optio.ai/api/v2/banners/save', data).subscribe(res => console.log(res))

      //refresh

      this.bannersService.getBanners();

    } else {
      alert('please upload a file')
    }



  }

}
