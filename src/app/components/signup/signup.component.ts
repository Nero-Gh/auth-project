import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import validateForm from '../../shared/validateForm';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  showEye: string = 'fa fa-eye-slash';
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    if (this.isText) {
      this.type = 'text';
      this.showEye = 'fa fa-eye';
    } else {
      this.type = 'password';
      this.showEye = 'fa fa-eye-slash';
    }
  }

  onSignUp() {
    if (this.signupForm.valid) {
      console.log(11111111);

      this.authService.signUp(this.signupForm.value).subscribe({
        next: (data) => {
          this.signupForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'User Registered Successfully',
            duration: 5000,
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary: error?.message,
            duration: 5000,
          });
        },
      });
    } else {
      //throw an error
      validateForm.validateAllFormFields(this.signupForm);

      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Please fill all the required fields',
        duration: 5000,
      });
    }
  }
}
