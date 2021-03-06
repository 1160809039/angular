import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {  Router } from '@angular/router';
import {FrameComponent} from '../frame/frame.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

   _submitForm() {
     for (const i in this.validateForm.controls) {
       this.validateForm.controls[ i ].markAsDirty();
     }

     this.router.navigate(['index']);
   }

  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
     userName: [ null, [ Validators.required ] ],
     password: [ null, [ Validators.required ] ],
     remember: [ true ],
   });
  }

}
