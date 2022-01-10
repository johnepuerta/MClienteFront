import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string|number, ocultarAlgunsValores: boolean = false): string {
    let valorFormatado = value + '';

    valorFormatado = valorFormatado
        .padStart(11, '0')                  // item 1
        .substr(0, 11)                      // item 2
        .replace(/[^0-9]/, '')              // item 3
        .replace(                           // item 4
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );

    if(ocultarAlgunsValores){
      valorFormatado = valorFormatado.substr(0, 4)+ 'XXX.XXX' + valorFormatado.substr(11);
    }

    return valorFormatado;
  }

}
