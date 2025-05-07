
export class AppComponent {
  texto: string = '';
  // palabrasProhibidas: Set<string> = new Set();
  palabrasProhibidas: string[] = [];
  resultado: {palabra: string, frecuencia: number}[] = [];

  cargarArchivoTexto(event: Event): void {

    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (archivo) {
      const lector = new FileReader()

      lector.onload = () => {
        this.texto = lector.result as string;
      };
      lector.readAsText(archivo);
    }
  }

  cargarArchivoProhibidas(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        const contenido = lector.result as string;
        const palabras = contenido.split(/\r?\n/).filter(p => p.length > 0).map(p => p.trim().toLowerCase())
        this.palabrasProhibidas = palabras

      };
      lector.readAsText(archivo);
    }
  }

  procesarTexto(): void {
    const frecuencia: { [palabra: string]: number } = {};

    // Eliminar signos de puntuación y convertir a minúsculas
    const palabras = this.texto
      .toLowerCase()
      .replace(/[.,!?]/g, '') // Eliminar puntuación
      .split(/\s+/) // Separar por espacios
      .filter(p => p.length > 0 && this.palabrasProhibidas.indexOf(p) < 0);

      console.log('palabras: ', palabras);


    for (const palabra of palabras) {
      frecuencia[palabra] = (frecuencia[palabra] || 0) + 1;
    }

    // Convertir a un arreglo de objetos

    console.log('KEYS: ', Object.keys(frecuencia));

    this.resultado = Object.keys(frecuencia)
      .sort()
      .map(p => ({ palabra: p, frecuencia: frecuencia[p] }));

    console.log(this.resultado);
  }


}
