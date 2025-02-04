// import { Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
// import { AddTaskComponent } from './components/add-task/add-task.component';
// import { EditTaskComponent } from './components/edit-task/edit-task.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   //{ path: '**', redirectTo: '/login' },
//   { path: '**', redirectTo: localStorage.getItem('authToken') ? '/admin-dashboard' : '/login' },

//   { path: 'register', component: RegisterComponent },
//   { path: 'admin-dashboard', component: AdminDashboardComponent },
//   { path: 'user-dashboard', component: UserDashboardComponent },
//   { path: 'add-task', component: AddTaskComponent },
//   { path: 'edit-task/:id', component: EditTaskComponent },
// ];


import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
  {path:'user-dashboard', component: UserDashboardComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '**', redirectTo: localStorage.getItem('authToken') ? '/admin-dashboard' : '/login' }
];




