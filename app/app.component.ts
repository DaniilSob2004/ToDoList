import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { UserAccountNavComponent } from './components/user-account-nav/user-account-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    UserAccountNavComponent
  ],
  providers: [
    
  ],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../register_form.css'
  ]
})
export class AppComponent {

}
