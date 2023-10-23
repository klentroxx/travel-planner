import { FormControl } from "@angular/forms";

export interface SignUpForm {
  name: FormControl<string>
  username: FormControl<string>
  password: FormControl<string>
}
