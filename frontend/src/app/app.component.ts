import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'contact number app';

  baseURL = 'http://localhost:3000/';
  contactForm: FormGroup;
  isSubmitted = false;
  contactList;

  constructor(private _http: HttpClient, private _fb: FormBuilder) { }

  page = 1 ;
  key = 'id';
  reverse = false;

  ngOnInit(): void {
    this.contactForm = this._fb.group({
      id: [''],
      _id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['', Validators.required],
      is_active: [1]
    });

    this.getAll();
  }

  get _fc() { return this.contactForm.controls; }

  save(): void{
    this.isSubmitted = true;
    if (this.contactForm.invalid) {
        return;
    } else{
      const id = this.contactForm.controls._id.value;
      if (!id){
        this._http.post(this.baseURL + 'contacts/create', this.contactForm.value).subscribe(() => {
          alert('Created successfully');
          this.reset();
        });
      } else {
        this._http.put(this.baseURL + 'contacts/update/' + id, this.contactForm.value).subscribe(() => {
          alert('Updated successfully');
          this.reset();
        });
      }
    }
  }

  reset(): void{
    this.contactForm.reset();
    this.contactForm.controls.is_active.setValue(1);
    this.isSubmitted = false;

    this.getAll();
  }

  getAll(): void{
    this._http.get(this.baseURL + 'contacts').subscribe((result) => {
      this.contactList = result;
    });
  }

  edit(id: string): void{
    if (id){
      const contact = this.contactList.find(x => x._id === id);
      if (!contact) { return; }
      contact.isReading = true;

      this._http.get(this.baseURL + 'contacts/' + id).subscribe((result) => {
        Object.keys(this.contactForm.controls).forEach(key => {
          this.contactForm.controls[key].setValue(result[key]);
        });
        contact.isReading = false;
      });
    }
  }

  delete(id: string): void{
    const result = confirm('Want to delete?');
    if (id && result){
      const contact = this.contactList.find(x => x._id === id);
      if (!contact) { return; }
      contact.isDeleting = true;

      this._http.delete(this.baseURL + 'contacts/delete/' + id).subscribe(() => {
        contact.isReading = false;
        this.reset();
        alert('Removed successfully');
      });
    }
  }

  sort(key: string): void{
    this.key = key;
    this.reverse = !this.reverse;
  }


  onLogin(): void{

  }

}
