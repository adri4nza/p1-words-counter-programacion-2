# Analizador de Frecuencia de Palabras en Angular
Este proyecto es una aplicación web desarrollada con el framework **Angular** que permite analizar la frecuencia de aparición de palabras en un archivo de texto `.in`, ignorando aquellas que estén en una lista de **palabras prohibidas** también contenida en un archivo `.in`.

## Autor del proyecto
Francisco Adrianza. C.I. V-29.928.573
Estudiante de ingeniería informática de la Universidad Nacional Experimental del Táchira (UNET).

## Enlace de visualizacion en la nube
El proyecto está actualmente hosteado en netlify, en el siguiente enlace: `https://words-counter-unet.netlify.app/`.

## ¿Qué hace la app?

- Lee dos archivos `.in`:
  - `texto.in`: contiene el texto a analizar (puede tener varias líneas).
  - `prohibidas.in`: contiene palabras prohibidas, una por línea.
- Limpia el texto (ignora signos de puntuación y mayúsculas).
- Excluye las palabras prohibidas.
- Cuenta las apariciones de cada palabra válida.
- Muestra el resultado ordenado alfabéticamente.
- Permite ordenar el resultado en orden de frecuencia descentendemente
- Permite ver el contenido de los archivos cargados y editar el texto y las palabras prohibidas a analizar.
---

## ¿Cómo ejecutar localmente el proyecto?
1. Debes instalar los modulos de node, asi que debe tener instalado node. Enlace para instalar node: `https://nodejs.org/en`
2. Teniendo node instalado, ubicarse con bash en la raiz del proyecto y ejecutar el comando `npm install`
3. Luego de instalar los modulos, ejecutar el comando `npm start` o `ng serve`

## Colaboraciones
Para sugerir modificaciones al proyecto, te invito a solicitar un pull request en mi repositorio en github!!: `https://github.com/adri4nza/p1-words-counter-programacion-2`
