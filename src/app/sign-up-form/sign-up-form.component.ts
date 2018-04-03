import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { FormUtils } from './../shared/form.utils';
import { User } from './../shared/user.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent {
  public form: FormGroup;
  public formUtils: FormUtils;
  public submitted: boolean;
  public formErrors: Array<string>;

  public constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.signUpParams();
    this.formUtils  = new FormUtils(this.form);
    this.submitted  = false;
    this.formErrors = null;
  }

  public signUpUser() {
    this.submitted = true
    this.authService.signUp(this.form.value as User)
      .subscribe(
        () => {
          alert('Conta criada com sucesso');
          this.router.navigate(['/dashboard']);
          this.formErrors = null
        }, 
        error => {
          this.submitted = false;

          if(error.status === 422)
            this.formErrors = JSON.parse(error._body).errors.full_messages
          else 
            this.formErrors = ['Não foi possível se comunicar com o servidor.']
        }
      )
  }

  public passwordConfirmationValidator(form: FormGroup) {
    if (form.get('password').dirty && form.get('password').value === form.get('passwordConfirmation').value) {
      form.get('passwordConfirmation').setErrors(null);
    } else {
      form.get('passwordConfirmation').setErrors({'mismatch': true});
    }

  }

  private signUpParams() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      passwordConfirmation: [null, [Validators.required, Validators.minLength(9)]]
    }, { validator: this.passwordConfirmationValidator });
  }
}
