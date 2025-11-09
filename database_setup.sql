-- ============================================
-- Script de Base de Datos: Traductor Emberá-Español
-- ============================================
-- Este script crea las tablas necesarias e inserta
-- el diccionario completo de 81 palabras Emberá-Español
-- 
-- Base de datos: PostgreSQL
-- Encoding: UTF-8
-- ============================================

-- Crear tabla del diccionario
CREATE TABLE IF NOT EXISTS diccionario (
    id SERIAL PRIMARY KEY,
    espanol TEXT NOT NULL,
    embera TEXT NOT NULL
);

-- Crear tabla de usuarios (opcional - para autenticación futura)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Limpiar datos existentes (opcional - comentar si no desea limpiar)
-- TRUNCATE TABLE diccionario RESTART IDENTITY CASCADE;

-- ============================================
-- Insertar palabras del diccionario (81 palabras)
-- ============================================

INSERT INTO diccionario (espanol, embera) VALUES
('hola', 'panabá'),
('buenos días', 'jinú parásida'),
('gracias', 'benkruá'),
('agua', 'juí'),
('río', 'dokabí'),
('montaña', 'wadó'),
('selva', 'párra'),
('árbol', 'warra'),
('casa', 'bé'),
('familia', 'purúm'),
('padre', 'akóre'),
('madre', 'umá'),
('hijo', 'chiá'),
('hija', 'chiama'),
('hermano', 'bedé'),
('hermana', 'bedama'),
('amigo', 'aramá'),
('sol', 'bedá'),
('luna', 'akará'),
('estrella', 'dedebáta'),
('lluvia', 'kurí'),
('viento', 'burrú'),
('fuego', 'ñudá'),
('tierra', 'badá'),
('cielo', 'trupá'),
('pájaro', 'chipía'),
('pez', 'namá'),
('comida', 'amá'),
('comer', 'amakó'),
('beber', 'juíkó'),
('dormir', 'drabé'),
('caminar', 'purá'),
('hablar', 'peresé'),
('cantar', 'imakó'),
('bailar', 'kutú'),
('niño', 'chié'),
('niña', 'chiéma'),
('hombre', 'waimbía'),
('mujer', 'waimbíama'),
('grande', 'bedabú'),
('pequeño', 'chichiná'),
('bueno', 'warrá'),
('malo', 'warrá kudé'),
('bonito', 'dosúa'),
('feliz', 'anambí'),
('triste', 'bedé kudé'),
('blanco', 'chirá'),
('negro', 'kisirá'),
('rojo', 'kiridá'),
('amarillo', 'parúa'),
('verde', 'debá'),
('azul', 'azurá'),
('uno', 'pokóra'),
('dos', 'ombí'),
('tres', 'kemá'),
('cuatro', 'aró'),
('cinco', 'atubí'),
('sí', 'maí'),
('no', 'kudé'),
('adiós', 'arambaré'),
('paz', 'anambía'),
('amor', 'dedí'),
('corazón', 'aré'),
('vida', 'bedé'),
('muerte', 'dedé'),
('medicina', 'jaí'),
('curar', 'jaíkó'),
('enfermedad', 'dedekó'),
('dolor', 'kukú'),
('sano', 'warrá bedé'),
('flor', 'dosúara'),
('semilla', 'ombira'),
('fruto', 'amabá'),
('raíz', 'aká'),
('hoja', 'drabí'),
('canoa', 'purú'),
('remo', 'purubá'),
('cesta', 'warrá'),
('collar', 'chaquira'),
('tambor', 'bedabá'),
('flauta', 'dedé');

-- ============================================
-- Verificar instalación
-- ============================================

-- Contar palabras insertadas (debe ser 81)
SELECT COUNT(*) as total_palabras FROM diccionario;

-- Mostrar algunas palabras de ejemplo
SELECT * FROM diccionario LIMIT 10;

-- ============================================
-- Script completado exitosamente
-- ============================================
-- 
-- Próximos pasos:
-- 1. Configurar las variables de entorno de conexión a la base de datos
-- 2. Asegurar que PostgreSQL está corriendo
-- 3. Ejecutar el servidor de la aplicación
--
-- Para ejecutar este script:
-- psql -U tu_usuario -d nombre_base_datos -f database_setup.sql
--
-- O desde línea de comandos PostgreSQL:
-- \i database_setup.sql
-- ============================================
