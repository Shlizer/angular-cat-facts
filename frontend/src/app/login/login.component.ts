import { Component, OnInit } from '@angular/core'
import { AuthService } from '../core/auth.service'
import { Credentials } from '../models/credentials.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  data: Credentials = {
    username: '',
    password: '',
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit() {
    this.authService.attempAuth(this.data)
  }
}
