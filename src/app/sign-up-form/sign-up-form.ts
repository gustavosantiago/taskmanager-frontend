import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent {
  public userForm: FormGroup;

  public constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(100)] ],
      email: [null, Validators.required, Validators.email],
      password: [null, [Validators.required, Validators.minLength(9)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(9)]]
    });
  }

  public signUpUser() {
    console.log(this.userForm.value);
  }
}
