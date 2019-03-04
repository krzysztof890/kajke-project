import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKeyValuelist'
})

export class EnumKeyValueListPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    const items = [];
    for (const key in value) {
      if (!this.isValueProperty(key)) { continue; }
      items.push({ key: key, value: value[key] });
    }
    return items;
  }

  private isValueProperty = (key: string) => parseInt(key, 10) >= 0;
}
