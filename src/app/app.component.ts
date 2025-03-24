import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'votingPage';
  lastName: string = "";
  search: boolean = true;
  results: any; // Para almacenar los resultados
  ranges: any[] = [
    { initA: 'ABALOS', initB: 'ROSSO', endA: 'CAMACHO', endB: 'HUANCA', tableNum: 4, classRoom: 507 },
    { initA: 'CAMACHO', initB: 'KOYO', endA: 'CUENCA', endB: 'FELIPE', tableNum: 5, classRoom: 508 },
    { initA: 'CUENTAS', initB: 'AGUILAR', endA: 'HUANCA', endB: 'LUMPE', tableNum: 6, classRoom: 509 },
    { initA: 'HUANCA', initB: 'MAMANI', endA: 'MENDOZA', endB: 'CHOQUE', tableNum: 7, classRoom: 511 },
    { initA: 'MENDOZA', initB: 'COLQUE', endA: 'QUISPE', endB: 'GUZMAN', tableNum: 8, classRoom: 512 },
    { initA: 'QUISPE', initB: 'HUANCA', endA: 'TARQUI', endB: 'VARGAS', tableNum: 9, classRoom: 513 },
    { initA: 'TEJERINA', initB: 'CHACA', endA: 'ZURITA', endB: 'VEIZAGA', tableNum: 10, classRoom: 514 }
  ];
  seeClassRoom(): any {
    try {
      if (this.lastName.trim() == "") return alert("Ingresa tu apellido")
      this.lastName = this.lastName.toUpperCase();
      const lastNameParts = this.lastName.trim().toUpperCase().split(" ");
      const surnamePaterno = lastNameParts[0]; // primer apellido
      const surnameMaterno = lastNameParts.length > 1 ? lastNameParts[1] : '';
      // Obtener los primeros 4 caracteres de los apellidos
      const paternoAbreviado = surnamePaterno.slice(0, 6);
      const maternoAbreviado = surnameMaterno.slice(0, 6);
      for (let [i, range] of this.ranges.entries()) {
        const initA = range.initA.slice(0, 6);  // Apellido paterno inicial
        const endA = range.endA.slice(0, 6);    // Apellido paterno final
        const endB = range.endB.slice(0, 6);    // Apellido materno final
        const paternoInRange = (paternoAbreviado >= initA && paternoAbreviado <= endA);
        //esta en rango
        if (paternoInRange) {
          //justo coincide endA con el apellido paterno
          if (paternoAbreviado == endA && maternoAbreviado.length > 0) {
            //comparar ademas el materno
            if (maternoAbreviado <= endB) {
              this.results = range
              break
            } else {
              this.results = this.ranges[i + 1];
              break
            }
          } else {
            this.results = range
            break
          }
        }

      };
      if (this.results) {
        this.search = false;
      } else {
        alert("No se encontraron coincidencias.");
      }

    } catch (e) {
      console.log('el error es')
    }
  }

  clean() {
    this.search = true;
    this.lastName = "";
    this.results = null;
  }
}
