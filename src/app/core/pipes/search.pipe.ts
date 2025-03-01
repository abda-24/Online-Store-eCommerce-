import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(ArrayOfObject: any[], SearchT: string): any[] {
    return ArrayOfObject.filter((Item) => Item.title.toLowerCase().includes(SearchT.toLowerCase()));
  }

}
