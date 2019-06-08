import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchValue: string, searchField: string): any[] {
    if(!items) return [];
    if(!searchValue || searchValue.length === 0) return items;

    searchValue = searchValue.toLowerCase();
    
    return items.filter(item => {
      return item[searchField].toLowerCase().includes(searchValue);
    })
  }

}
