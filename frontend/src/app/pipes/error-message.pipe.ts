import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: false
})
export class ErrorMessagePipe implements PipeTransform {
  transform(control?: AbstractControl | null): string {
    if (control) {

      if (control.hasError('required')) {
        return 'Required field!'

      } else if (control.hasError('email')) {
        return 'The field must be email!'

      } else if (control.hasError('minlength')) {
        const minLength = control.errors?.['minlength']?.requiredLength
        return `The field must be at least ${minLength} characters long!`

      } else if (control.hasError('maxlength')) {
        const maxLength = control.errors?.['maxlength']?.requiredLength
        return `The field must be at most ${maxLength} characters long!`

      } else if (control.hasError('min')) {
        const min = control.errors?.['min']?.min
        return `The field's value must be at least ${min}!`

      } else if (control.hasError('max')) {
        const max = control.errors?.['max']?.max
        return `The field's value must be at most ${max}!`

      } else if (control.hasError('pattern')) {
        return 'The field value is invalid!'

      } else {
        return 'The field value is invalid!'
      }

    } else {
      return ''
    }
  }


}
