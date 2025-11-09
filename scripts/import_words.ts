import XLSX from 'xlsx';
import { storage } from '../server/storage';
import { db } from '../server/db';
import { diccionario } from '@shared/schema';
import { eq } from 'drizzle-orm';

interface WordPair {
  espanol: string;
  embera: string;
}

async function importWordsFromExcel() {
  try {
    console.log('📖 Leyendo archivo Excel...');
    
    // Leer el archivo Excel
    const workbook = XLSX.readFile('attached_assets/DIALECTOS EMBERA DOBIDA - 2025 - anatolio chanapicama_1762696394136.xlsx');
    
    // Obtener la primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    
    console.log(`📋 Archivo tiene ${rawData.length} filas`);
    console.log('\n🔍 Explorando estructura del archivo...');
    console.log('Primeras 15 filas:');
    rawData.slice(0, 15).forEach((row, i) => {
      console.log(`  Fila ${i}:`, row);
    });
    
    // Según la estructura observada:
    // Columna 0: Letra de organización (A, B, C, etc.)
    // Columna 1: Emberá
    // Columna 2: Español
    const emberaColIndex = 1;
    const spanishColIndex = 2;
    
    console.log(`\n✅ Usando estructura estándar del archivo:`);
    console.log(`   Columna ${emberaColIndex}: Emberá`);
    console.log(`   Columna ${spanishColIndex}: Español`);
    
    // Extraer palabras (empezar desde fila 4 donde comienzan los datos reales)
    const excelWords: WordPair[] = [];
    for (let i = 4; i < rawData.length; i++) {
      const row = rawData[i];
      const embera = row[emberaColIndex]?.toString().trim();
      const espanol = row[spanishColIndex]?.toString().trim();
      
      if (espanol && embera && espanol.length > 0 && embera.length > 0) {
        excelWords.push({ espanol, embera });
      }
    }
    
    console.log(`📚 ${excelWords.length} palabras válidas encontradas en Excel`);
    
    // Obtener palabras existentes en la base de datos
    console.log('\n🗄️  Consultando base de datos...');
    const existingWords = await storage.getAllWords();
    console.log(`📊 ${existingWords.length} palabras existentes en la base de datos`);
    
    // Crear un Set para búsqueda rápida (usando español en minúsculas como clave)
    const existingSpanishWords = new Set(
      existingWords.map(w => w.espanol.toLowerCase().trim())
    );
    
    // Encontrar palabras nuevas
    const newWords = excelWords.filter(word => 
      !existingSpanishWords.has(word.espanol.toLowerCase().trim())
    );
    
    console.log(`\n🆕 ${newWords.length} palabras nuevas para agregar`);
    
    if (newWords.length === 0) {
      console.log('✅ No hay palabras nuevas para agregar. La base de datos está actualizada.');
      return;
    }
    
    // Mostrar las primeras 10 palabras nuevas
    console.log('\n📝 Muestra de palabras nuevas (primeras 10):');
    newWords.slice(0, 10).forEach((word, i) => {
      console.log(`  ${i + 1}. ${word.espanol} → ${word.embera}`);
    });
    
    // Agregar las palabras nuevas
    console.log(`\n💾 Agregando ${newWords.length} palabras nuevas a la base de datos...`);
    
    let addedCount = 0;
    for (const word of newWords) {
      try {
        await storage.addWord({
          espanol: word.espanol,
          embera: word.embera
        });
        addedCount++;
        
        // Mostrar progreso cada 10 palabras
        if (addedCount % 10 === 0) {
          console.log(`  ✓ ${addedCount}/${newWords.length} palabras agregadas...`);
        }
      } catch (error) {
        console.error(`  ❌ Error agregando: ${word.espanol} → ${word.embera}`, error);
      }
    }
    
    console.log(`\n✅ ¡Completado! Se agregaron ${addedCount} palabras nuevas.`);
    
    // Mostrar estadísticas finales
    const finalCount = await db.select().from(diccionario);
    console.log(`\n📊 Total de palabras en la base de datos: ${finalCount.length}`);
    console.log(`   - Palabras originales: ${existingWords.length}`);
    console.log(`   - Palabras agregadas: ${addedCount}`);
    
  } catch (error) {
    console.error('❌ Error durante la importación:', error);
    throw error;
  }
}

// Ejecutar la importación
importWordsFromExcel()
  .then(() => {
    console.log('\n🎉 Importación completada exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
