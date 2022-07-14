# Ejercicio No. 3

### En este ejercicio usamos lo anterior de los ejecicios, pero en lugar d eusar una API Rest ahora usamos `MongoDB` y lo conectamos con el front

El ejercicio usa dos carpetas `login-api` y `login-react`. Tenemos que levantar las dos carpetas para que funcione el login

## CARPETA login-api

Tenemos que ingresar a  `login-api` esta carpeta crea un servidor de json. 

Se ingreso un script en el `package.json` el cual con el comando `npm start` levantamos el servidor:

["start": "json-server --watch users.json --port 3001"]


## CARPETA login-react

Tenemos que ingresar a  `login-react` esta carpeta contiene el formulario en react

En el archivo package.json debemos agregar:

["proxy": "http://localhost:3001/user"]

el cual hace un llamado a la database de Mongo a la coleccion `user`