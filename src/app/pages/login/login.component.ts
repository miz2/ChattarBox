import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // inject the service 
  private auth=inject(AuthService);
  async handleAuth(){
    const response=await this.auth.signInGoogle();
  }
  // now go to html to handle these 
}
