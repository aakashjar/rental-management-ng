import { AbstractControl } from '@angular/forms';
import * as dayjs from 'dayjs';

export function PresentFutureDateValidator(control: AbstractControl) {

	return dayjs().diff(dayjs(control.value, 'YYYY-MM-DD'), 'days') > 0 ? { 'pastDate': { value: control.value } } : null;
}