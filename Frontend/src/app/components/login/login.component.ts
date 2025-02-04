
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value).subscribe(() => {
  //       if (this.router.url !== '/admin-dashboard') {
  //         this.router.navigate(['/admin-dashboard']);
  //       }
  //     });
  //   }
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response?.token && response?.role) { 
            console.log(" Storing token & role:", response.token, response.role);
            
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userRole', response.role);
  
          
            let targetRoute = '/user-dashboard'; // Default to User Dashboard
            if (response.role === 'Admin') {
              targetRoute = '/admin-dashboard';
            }
  
            console.log("🔀 Redirecting to:", targetRoute);
            this.router.navigate([targetRoute]);
          } else {
            console.error("Login response is missing token or role:", response);
          }
        },
        error: (error) => {
          console.error(" Login failed:", error);
        }
      });
    }
  }
  
  
  



  goToRegister() {
    console.log("Navigating to Register Page...");
    this.router.navigate(['/register']);
  }
}
