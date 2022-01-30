import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const conf = control.get('confPassword')?.value;

    console.log(password, conf)

    return (password && conf && conf !== password) ? { passwordNotMatch: true } : null;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confPassword: new FormControl('', Validators.required)
  }, { validators: passwordsMatchValidator() })

  constructor(private authService: AuthenticationService,
    private toast: HotToastService, 
    private router: Router) { }

  onSubmit() {

    if (this.signupForm.valid) {

      const {name, email, password } = this.signupForm.value;
      
      lastValueFrom(this.authService.signup(name, email, password).pipe(this.toast.observe({
        loading: 'Signing up...',
        success: 'Account created',
        error: ({message}) => `${message}`
      }))).then(res => {
        this.router.navigate(['/home']);
      })
    }

  }


}
