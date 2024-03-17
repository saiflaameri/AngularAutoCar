import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonFilter'
})
export class JsonFilterPipe implements PipeTransform {
  transform(value: any, excludedProperties: string[]): any {
    if (!value) return value;

    // Créez une copie de l'objet JSON
    const filteredValue = { ...value };

    // Supprimez les propriétés exclues
    excludedProperties.forEach(property => {
      delete filteredValue[property];
    });

    // Renvoyez l'objet JSON filtré
    return JSON.stringify(filteredValue, null, 2);
  }
}
