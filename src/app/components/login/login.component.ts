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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  showEye: string = 'fa fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
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

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          this.loginForm.reset();

          this.authService.storeToken(data.accessToken);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Login Successfully',
            duration: 5000,
          });

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Please fill in the correct details',
            duration: 5000,
          });
        },
      });
    } else {
      //throw an error
      validateForm.validateAllFormFields(this.loginForm);
      alert('Please fill all the required fields');
    }
  }
}
