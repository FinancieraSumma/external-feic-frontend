import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private router: Router) {}

  onLogout() {
    // Implement logout logic, such as clearing tokens or session data
    console.log('Logging out...');
    
    // Redirect to login page after logout
    this.router.navigate(['/login']);
  }
}