import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FormUtils } from './../shared/form.utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent {
  public form: FormGroup;
  public formUtils: FormUtils;

  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(100)] ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      passwordConfirmation: [null, [Validators.required, Validators.minLength(9)]]
    }, {validator: this.passwordConfirmationValidator});

    this.formUtils = new FormUtils(this.form);
  }

  public signUpUser() {
    console.log(this.form.value);
  }

  public passwordConfirmationValidator(form: FormGroup) {
    if (form.get('password').dirty && form.get('password').value === form.get('passwordConfirmation').value) {
      form.get('passwordConfirmation').setErrors(null);
    } else {
      form.get('passwordConfirmation').setErrors({'mismatch': true});
    }

  }
}
