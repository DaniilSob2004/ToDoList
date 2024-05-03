import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeWork } from '../shared/datetimeWork';

@Pipe({
  name: 'dtStrByMs',
  standalone: true
})
export class DtStrByMsPipe implements PipeTransform {
  transform(ms: number): string {
    return DateTimeWork.getDtByMs(ms);
  }
}
