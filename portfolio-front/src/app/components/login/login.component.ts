import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/interfaces/Credentials';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {}

  login() {
    const creds: Credentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    this.loginService.login(creds)
      .subscribe((data)  => {
        this.loginService.setToken(data.token);
        this.loginService.isLoggedIn();
        this.toastr.info("Iniciaste sesión!");
        this.router.navigate(['/']);
        setTimeout(() => {
          this.loginService.logout();
          this.loginService.isLoggedIn();
          this.toastr.error("Su sesión ha expirado");
        }, 1200 * 1000); 
      })
  }

}
