import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTermPipe',
  standalone: true
})
export class TextTermPipePipe implements PipeTransform {

  transform(Text:string , limit:number): string {
   return Text.split(" ",limit ).join(" ");
  }

}
