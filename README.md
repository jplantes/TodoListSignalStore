# TodoListSignalStore

El proyecto se genero mediante [Angular CLI](https://github.com/angular/angular-cli) versión 18.0.5.

## Detalle proyecto angular
```
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 18.0.5
Node: 20.15.0
Package Manager: npm 10.8.1

Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1800.5 (cli-only)
@angular-devkit/core         18.0.5 (cli-only)
@angular-devkit/schematics   18.0.5 (cli-only)
@schematics/angular          18.0.5 (cli-only)
```

## Instalaciones y configuraciones

### Tailwindcss

[Documentación instalación Tailwindcss](https://tailwindcss.com/docs/guides/angular)

### JSON Server

#### Instalación

```sh
npm i json-server
```

#### Configuración

1.- Creamos en la raiz del proyecto el directorio `db` y dentro el archivo `db.json`

2.- dentro del archivo `db.json` colocamos la siguiente estructura:

```json
{
  "todos": []
}
```

3.- colocamos en el `packaje.json`el siguiente script:

```json
{
  ...,
  "scripts": {
    ...,
    "json-server": "json-server db/db.json"
  },
  ...
}
```

4.- lo ejecutamos desde la terminal.

```sh
npm run json-server
```

### NgRx

#### SignalStore

[Referencia](https://ngrx.io/guide/signals)

Instalación:

``` 
ng add @ngrx/signals@next
```

#### Operators

[Referencia](https://ngrx.io/guide/operators)

Instalación:

```
ng add @ngrx/operators@latest
```

## Levantar el proyecto en modo desarrollo

### Clonar el repo

```sh
git clone https://github.com/jplantes/TodoListSignalStore.git
```
### Instalación de paquetes

```sh
npm install
```

### Levantar proyecto

  > Debe estar corriendo json-server para que el proyecto funcione correctamente

```sh
ng serve
```