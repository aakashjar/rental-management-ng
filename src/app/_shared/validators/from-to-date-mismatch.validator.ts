import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as dayjs from 'dayjs';

export function FromToDateMismatchValidator(fromControlName: string, toControlName: string): ValidatorFn {
	return (control: AbstractControl): { [key: string]: boolean } => {
		const fromControl = control.get(fromControlName)
		const toControl = control.get(toControlName)

		if (fromControl?.errors || toControl?.errors) {
			return {};
		}

		if (dayjs(toControl?.value, 'YYYY-MM-DD').diff(dayjs(fromControl?.value, 'YYYY-MM-DD'), 'days') < 0) {
			fromControl?.setErrors({ mustComply: true });
		} else {
			fromControl?.setErrors(null);
		}
		return {};
	}
}