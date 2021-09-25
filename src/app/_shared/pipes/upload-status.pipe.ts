import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uploadStatus'
})
export class UploadStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {

    let message: string = '';

    if (value == 'wait') {
      message = 'Synchronizing datas, Please wait...';
    } else if (value == 'error') {
      message = 'Synchronization error!!!, Please try again later';
    } else if (value == 'complete') {
      message = 'Synchronization complete!';
    }
    return message;
  }

}
