import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../../environments/environment";
import { LoginForm } from "./login.interface";
import { JwtResponse } from "../../interface/response/jwt-response.interface";
import { JwtStorageService } from "../../local-storage/jwt-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form = new FormGroup<LoginForm>({
    username: new FormControl('', { validators: [ Validators.required, Validators.pattern(/^[a-z0-9]*$/) ], nonNullable: true }),
    password: new FormControl('',  { validators: [ Validators.required, Validators.minLength(8) ], nonNullable: true })
  })

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private jwtStorageService: JwtStorageService,
  ) {}

  public submitSignUp(event: SubmitEvent) {
    event.preventDefault()

    if (this.form.valid) {
      const form = this.form.getRawValue()

      this.http.post<JwtResponse>([ environment.apiUrl, 'auth', 'issueToken' ].join('/'), form).subscribe({
        next: (jwt) => {
          console.log(jwt)
          this.jwtStorageService.setItem(jwt)
          this.snackbar.open('Successful login!', undefined, { duration: 3000 })
        },
        error: (error) => {
          console.error(error)
          this.snackbar.open('Login failed!', undefined, { duration: 3000 })
        }
      })
    }
  }
}
