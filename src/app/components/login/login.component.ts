import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService, Toast } from '@ngneat/hot-toast';
import { lastValueFrom, takeLast } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private toast: HotToastService) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const {email, password} = this.loginForm.value;

    lastValueFrom(this.authenticationService.loginWithEmail(email, password).pipe(this.toast.observe({
      success: "Logged in successfully",
      loading: "Logging in...",
      error: "There was an error"
    }))).then(res => {
      this.router.navigate(['/home']);
    })
  }


  loginWithGoogle() {
    lastValueFrom(this.authenticationService.loginWithGoogle().pipe(this.toast.observe({
      success: "Logged in successfully",
      loading: "Logging in...",
      error: "There was an error"
    }))).then(res => {
      this.router.navigate(['/home']);
    })
  }


}
