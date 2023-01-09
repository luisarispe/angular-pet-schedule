import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  hidePassword: boolean = true;
  signInForm: FormGroup;
  error: string[] = [];
  load: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.signInForm = this._fb.group({
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['Abc12345', Validators.required],
    });
  }
  signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    this.load = true;
    this._authService.signIn(this.signInForm.value).subscribe({
      next: (res) => {
        this.load = false;
        this._router.navigateByUrl('home');
      },
      error: (error) => {
        this.load = false;
        this.error = Array.isArray(error.error.message)
          ? error.error.message
          : [error.error.message];
      },
    });
  }
}
