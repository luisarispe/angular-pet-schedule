import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  $user: Observable<User> = new Observable<User>();
  constructor(private _userService: UserService) {
    this.$user = this._userService.user$;
  }
}
