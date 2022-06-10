# browsewithme

Navega por Internet en grupo con *browsewithme*.

Se trata de la implementación más simple del cobrowsing (conavegación):
todos los que estén Connecteds a la web reciben cualquier cambio en la barra
de directiones, mostrando la nueva web en un iframe.

*browsewithme* está escrita en nodejs y socket.io y tiene licencia AGPL.

## Instalación
```bash
git clone https://github.com/joker-x/browsewithme.git
cd browsewithme
npm install #instala todas las dependencias, en este caso sólo socket.io
cp config.json.dist config.json
nano config.json #editamos el archivo de configuración a nuestro gusto
NODE_ENV=production node inicio.js #Lanzamos la aplicación
```
Sólo queda ingresar en la url definida en el archivo *config.json* para acceder al visit.
Por ejemplo: *http://localhost:7000*

Si queremos controlar la sesión deberemos entrar a la dirección *http://localhost:7000/control*

