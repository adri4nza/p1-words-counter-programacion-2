import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
  ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  texto: string = '';
  palabrasProhibidas: string[] = [];
  resultado: {palabra: string, frecuencia: number}[] = [];
  form!: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({
      texto: new FormControl(''),
      palabrasProhibidas: new FormControl('')
    });
  }


  cargarArchivoTexto(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if(archivo){
      const lector = new FileReader()
      lector.onload = () => {
        this.texto =lector.result as string;
        this.form.get('texto')?.setValue(this.texto)

      }
      lector.readAsText(archivo)
    }
  }

  cargarArchivoProhibidas(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if(archivo) {
      const lector = new FileReader()
      lector.onload = () => {
        const contenido = lector.result as string;
        const palabras = contenido
                          .split(/\r?\n/)
                          .filter( p => p.length > 0)
                          .map(
                            p => p
                              .trim()
                              .toLocaleLowerCase()
                          );

        this.form.get('palabrasProhibidas')?.setValue(palabras.join('\n'));
        this.palabrasProhibidas = palabras;
      }
      lector.readAsText(archivo);
    }
  }

  procesarTexto(): void {

    this.updateProhibidas()


    const frecuencia: {[palabra: string]: number} = {}
    const palabras = this.form.get('texto')?.value
      .toLowerCase()
      .replace(/[.,!?]/g, '')
      .split(/\s+/)
      .filter((p: string) => p.length > 0 && this.palabrasProhibidas.indexOf(p) <0)


      console.log(palabras);

      for(const palabra of palabras){
        frecuencia[palabra] = (frecuencia[palabra] || 0) + 1;
      }

      this.resultado = Object.keys(frecuencia)
        .sort()
        .map(p => ({palabra: p, frecuencia: frecuencia[p]}))

  }


  ordenarAlfabeticamente(): void {
    this.resultado.sort((a, b) => a.palabra.localeCompare(b.palabra));
  }

  ordenarPorFrecuencia(): void {
    this.resultado.sort((a, b) => b.frecuencia - a.frecuencia);
  }

  updateProhibidas(){
    const palabras = this.form.get('palabrasProhibidas')?.value.split(/\r?\n/).filter((p: string) => p.length > 0)
    this.palabrasProhibidas = palabras.map((p: string) => p.trim().toLowerCase())
    console.log(this.palabrasProhibidas);
  }


  borrarArchivo(input: HTMLInputElement): void {
    input.value = '';
    if (input === this.form.get('archivoTexto')?.value) {
      this.texto = '';
    } else if (input === this.form.get('archivoProhibidas')?.value) {
      this.palabrasProhibidas = [];
    }
    console.log('aarchivo borrado');
  }

  resetear( inputTexto: HTMLInputElement, inputProhibidas: HTMLInputElement): void {
    this.texto = '';
    this.palabrasProhibidas = [];
    inputTexto.value = '';
    inputProhibidas.value = '';
    this.form.reset();
    this.resultado = [];

  }

  validaciones(): boolean{
    return this.form.get('texto')?.value?.length > 0 && this.form.get('palabrasProhibidas')?.value?.length > 0
  }

}
