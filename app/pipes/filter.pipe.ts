import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(arr: any[], searchText: string, fieldName: string): any[] {
    if (arr.length === 0 || searchText === "") { return arr; }

    searchText = searchText.toLowerCase();
    return arr.filter((item: any) => {
      if (Array.isArray(item[fieldName])) {
        // если хотя бы один из элементов удовлетворяет условию
        return item[fieldName].some((element: any) => element.toLowerCase().includes(searchText));
      }
      return item[fieldName].toLowerCase().includes(searchText);
    });
  }
}
