import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { FormUtils } from './../shared/form.utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sign-in-form',
  templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent {
  public form: FormGroup;
  public formUtils: FormUtils;
  public submitted: boolean;
  public formErrors: Array<string>;

  public constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.signInParams();
    this.formUtils  = new FormUtils(this.form);
    this.submitted  = false;
    this.formErrors = null;
  }

  public signInUser() {
    this.submitted = true;
    let email    = this.form.get('email').value;
    let password = this.form.get('password').value;
    
    this.authService.signIn(email, password)
      .subscribe(
        response => {
          this.router.navigate(['/dashboard']);
          this.formErrors = null;
        },
        error => {
          this.submitted = false;

          if(error.status=== 401)
            this.formErrors = JSON.parse(error._body).errors;
          else
            this.formErrors = ['Não foi possível processar a solicitação']
        }
      )
  }

  private signInParams() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
}
