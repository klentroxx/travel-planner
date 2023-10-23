import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SignUpForm } from "./sign-up.interface";
import { HttpClient } from "@angular/common/http";
import { UserResponse } from "../../interface/response/user-response.interface";
import { environment } from "../../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public form = new FormGroup<SignUpForm>({
    name: new FormControl('', { validators: [ Validators.required ], nonNullable: true }),
    username: new FormControl('', { validators: [ Validators.required, Validators.pattern(/^[a-z0-9]*$/) ], nonNullable: true }),
    password: new FormControl('',  { validators: [ Validators.required, Validators.minLength(8) ], nonNullable: true })
  })

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
  ) {}

  public submitSignUp(event: SubmitEvent) {
    event.preventDefault()

    if (this.form.valid) {
      const form = this.form.getRawValue()

      this.http.post<UserResponse>([ environment.apiUrl, 'users' ].join('/'), form).subscribe({
        next: (user) => {
          console.log(user)
          this.snackbar.open('Successful registration!', undefined, { duration: 3000 })
        },
        error: (error) => {
          console.error(error)
          this.snackbar.open('Registration failed!', undefined, { duration: 3000 })
        }
      })
    }
  }
}
