import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {

  //takes minutes as number and returns the ms as a number
  // buddy: formula is minutes * 60000
  // like there is no way to be this dumb 


  // Delete this pipe in its entirety -  its just not worth using for a simple function like this
  transform(timeInMinutes: number): number {
    return timeInMinutes*60*1000;
  }
}