import { storage } from '../server/storage';
import * as fs from 'fs';

async function exportToSQL() {
  try {
    console.log('📖 Obteniendo todas las palabras de la base de datos...');
    
    const words = await storage.getAllWords();
    console.log(`✅ ${words.length} palabras encontradas`);
    
    // Generar INSERTs
    const inserts = words.map(word => {
      const espanol = word.espanol.replace(/'/g, "''"); // Escapar comillas simples
      const embera = word.embera.replace(/'/g, "''");
      return `('${espanol}', '${embera}')`;
    });
    
    const sqlContent = `-- ============================================
-- Insertar palabras del diccionario (${words.length} palabras)
-- ============================================

INSERT INTO diccionario (espanol, embera) VALUES
${inserts.join(',\n')};`;
    
    // Guardar a archivo
    fs.writeFileSync('/tmp/palabras_insert.sql', sqlContent);
    
    console.log('\n✅ Archivo SQL generado: /tmp/palabras_insert.sql');
    console.log(`   Total de palabras: ${words.length}`);
    console.log('\nPrimeras 5 líneas:');
    console.log(inserts.slice(0, 5).join(',\n'));
    console.log('...');
    console.log('\nÚltimas 5 líneas:');
    console.log('...');
    console.log(inserts.slice(-5).join(',\n'));
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

exportToSQL()
  .then(() => {
    console.log('\n✅ Exportación completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
  });
