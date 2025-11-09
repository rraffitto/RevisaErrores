import { db } from '../server/db';
import { diccionario } from '@shared/schema';
import { sql } from 'drizzle-orm';

async function deduplicateDictionary() {
  try {
    console.log('🔍 Buscando palabras duplicadas...\n');
    
    // Contar total antes
    const totalBefore = await db.select().from(diccionario);
    console.log(`📊 Total de palabras antes: ${totalBefore.length}`);
    
    // Encontrar duplicados
    const duplicates = await db.execute(sql`
      SELECT espanol, embera, COUNT(*) as count
      FROM diccionario
      GROUP BY espanol, embera
      HAVING COUNT(*) > 1
      ORDER BY count DESC, espanol
    `);
    
    console.log(`\n🔎 Duplicados encontrados: ${duplicates.rows.length} pares\n`);
    
    if (duplicates.rows.length > 0) {
      console.log('Lista de duplicados:');
      duplicates.rows.forEach((row: any) => {
        console.log(`  - "${row.espanol}" → "${row.embera}" (${row.count} veces)`);
      });
    }
    
    // Eliminar duplicados manteniendo solo el primero de cada par
    console.log('\n🗑️  Eliminando duplicados...\n');
    
    const result = await db.execute(sql`
      DELETE FROM diccionario a USING (
        SELECT MIN(id) as id, espanol, embera
        FROM diccionario
        GROUP BY espanol, embera
        HAVING COUNT(*) > 1
      ) b
      WHERE a.espanol = b.espanol 
        AND a.embera = b.embera 
        AND a.id != b.id
    `);
    
    console.log(`✅ Duplicados eliminados`);
    
    // Contar total después
    const totalAfter = await db.select().from(diccionario);
    console.log(`\n📊 Total de palabras después: ${totalAfter.length}`);
    console.log(`   - Palabras eliminadas: ${totalBefore.length - totalAfter.length}`);
    console.log(`   - Palabras únicas: ${totalAfter.length}`);
    
    // Verificar que no haya más duplicados
    const verificar = await db.execute(sql`
      SELECT espanol, embera, COUNT(*) as count
      FROM diccionario
      GROUP BY espanol, embera
      HAVING COUNT(*) > 1
    `);
    
    if (verificar.rows.length === 0) {
      console.log('\n✅ ¡Perfecto! No hay duplicados en la base de datos.');
    } else {
      console.log('\n⚠️  Aún hay duplicados:', verificar.rows.length);
    }
    
  } catch (error) {
    console.error('❌ Error durante la deduplicación:', error);
    throw error;
  }
}

deduplicateDictionary()
  .then(() => {
    console.log('\n🎉 Deduplicación completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
