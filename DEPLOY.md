# Instrucciones de despliegue y ejecución

Este proyecto contiene tanto el cliente (Vite + React) como el servidor (Express + Drizzle). Aquí tienes los pasos para ejecutar y desplegar la aplicación.

## Variables de entorno importantes

  `postgresql://user:password@host:5432/database`
 - También puedes configurar el modelo por defecto usando la variable `MODEL_NAME` en `docker-compose.yml` o en el entorno.

## Desarrollo (local)

1. Instalar dependencias:

```bash
npm install
```

2. Levantar en modo desarrollo (sirve cliente y servidor con recarga):

```bash
npm run dev
```

Salida esperada:

```
[express] serving on http://127.0.0.1:5000
```

3. Abrir el navegador en la URL mostrada.

## Producción

1. Construir cliente y empaquetar servidor:

```bash
npm run build
```

2. Ejecutar (asegúrate de definir `DATABASE_URL` y, si es necesario, `HOST` y `PORT`):

```bash
NODE_ENV=production HOST=0.0.0.0 PORT=5000 DATABASE_URL="postgresql://user:pass@host:5432/db" npm start
```

## Notas técnicas y cambios aplicados

- Se añadió la dependencia `pg` a `package.json` y se instaló.
- Se corrigió la importación de `pg` en `server/db.ts` para ser compatible con builds ESM: ahora usamos la importación por defecto y extraemos `Pool`.
- Se reemplazaron usos de `import.meta.dirname` por una forma compatible:
  `path.dirname(fileURLToPath(import.meta.url))` en `vite.config.ts` y `server/vite.ts`.
  Esto evita problemas en entornos Node ESM que no exponen `import.meta.dirname`.

## Problemas conocidos y recomendaciones

- Ejecuta `npm audit` y `npm audit fix` si te preocupan las vulnerabilidades reportadas.
- Si despliegas en entornos donde `import.meta.url` no se comporte como se espera, revisa las rutas del build.
- Para pruebas de integración que usan la DB, proporciona una base de datos de prueba y asegúrate de que `DATABASE_URL` apunte a ella.

## Comprobaciones rápidas

- Verificar TypeScript:

```bash
npm run check
```

Si quieres, puedo añadir este documento al `README.md` o crear un script de `docker-compose` para facilitar despliegues locales con PostgreSQL.
