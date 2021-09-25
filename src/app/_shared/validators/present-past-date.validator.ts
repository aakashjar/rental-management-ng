import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as dayjs from 'dayjs'

export function PresentPastDateValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {

		return dayjs(control.value, 'YYYY-MM-DD').diff(dayjs(), 'days') > 0 ? { 'futureDate': { value: control.value } } : null;
	};
}