import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule,MatSelectModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['User', Validators.required],
    });
  }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     this.authService.register(this.registerForm.value).subscribe(() => {
  //       this.router.navigate(['/login']);
  //     });
  //   }
  // }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log('Registering user...', this.registerForm.value);
  //     this.authService.register(this.registerForm.value).subscribe(() => {
  //       console.log('Registration successful, redirecting...');
  //       this.router.navigate(['/login']);
  //     });
  //   }
  // }
  goToLogin() {
    this.router.navigate(['/login']); 
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registering user...', this.registerForm.value);
  
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log(' Registration successful, redirecting...');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(' Registration failed:', error);
        }
      });
    } else {
      console.error(' Form is invalid:', this.registerForm.errors);
    }
  }
  

}