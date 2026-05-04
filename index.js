```javascript
#!/usr/bin/env node

const readline = require('readline');

// Clase para manejar la búsqueda binaria con visualización
class BinarySearchVisualizer {
  constructor(array) {
    this.array = array.sort((a, b) => a - b);
    this.steps = [];
    this.found = false;
    this.targetIndex = -1;
  }

  search(target) {
    this.steps = [];
    this.found = false;
    this.targetIndex = -1;

    let left = 0;
    let right = this.array.length - 1;
    let stepCount = 0;

    while (left <= right) {
      stepCount++;
      const mid = Math.floor((left + right) / 2);
      const midValue = this.array[mid];

      // Registrar paso
      this.steps.push({
        step: stepCount,
        left,
        right,
        mid,
        midValue,
        target,
        status: midValue === target ? 'ENCONTRADO' : midValue < target ? 'BUSCAR DERECHA' : 'BUSCAR IZQUIERDA'
      });

      if (midValue === target) {
        this.found = true;
        this.targetIndex = mid;
        return true;
      } else if (midValue < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return false;
  }

  visualizeStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) {
      return '';
    }

    const step = this.steps[stepIndex];
    const visualization = [];

    visualization.push(`\n┌─ PASO ${step.step} ─────────────────────────┐`);
    visualization.push(`│ Buscando: ${step.target}`);
    visualization.push(`│ Rango: [${step.left}...${step.right}]`);
    visualization.push(`│ Índice medio (mid): ${step.mid}`);
    visualization.push(`│ Valor en mid: ${step.midValue}`);
    visualization.push(`│ Acción: ${step.status}`);
    visualization.push(`└──────────────────────────────────────┘`);

    // Visualizar el array
    visualization.push('\nArray: [' + this.array.map((val, idx) => {
      if (idx === step.mid) {
        return `\x1b[1;32m${val}\x1b[0m`; // Verde para mid
      } else if (idx >= step.left && idx <= step.right) {
        return `\x1b[1;33m${val}\x1b[0m`; // Amarillo para rango activo
      } else {
        return `\x1b[90m${val}\x1b[0m`; // Gris para fuera de rango
      }
    }).join(', ') + ']');

    visualization.push('\nIndices:  [' + this.array.map((_, idx) => {
      if (idx === step.mid) {
        return `\x1b[1;32m${idx}\x1b[0m`;
      } else if (idx >= step.left && idx <= step.right) {
        return `\x1b[1;33m${idx}\x1b[0m`;
      } else {
        return `\x1b[90m${idx}\x1b[0m`;
      }
    }).join(', ') + ']');

    return visualization.join('\n');
  }

  printSummary() {
    console.log('\n\x1b[1;36m════════════════════════════════════════\x1b[0m');
    console.log('\x1b[1;36m        RESUMEN DE BÚSQUEDA BINARIA\x1b[0m');
    console.log('\x1b[1;36m════════════════════════════════════════\x1b[0m');
    console.log(`Array original (ordenado): [${this.array.join(', ')}]`);
    console.log(`Total de pasos: ${this.steps.length}`);
    
    if (this.found) {
      console.log(`\x1b[1;32m✓ ¡ENCONTRADO! El número ${this.steps[this.steps.length - 1].target} está en índice ${this.targetIndex}\x1b[0m`);
    } else {
      console.log(`\x1b[1;31m✗ No encontrado. El número no está en el array.\x1b[0m`);
    }
    
    console.log('\n\x1b[1;33mDetalles de cada paso:\x1b[0m');
    this.steps.forEach(step => {
      console.log(`  Paso ${step.step}: mid=${step.mid}, valor=${step.midValue}, ${step.status}`);
    });
    
    console.log('\x1b[1;36m════════════════════════════════════════\x1b[0m\n');
  }

  printAllSteps() {
    console.log('\n\x1b[1;35m╔════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[1;35m║      VISUALIZACIÓN COMPLETA PASO A PASO║\x1b[0m');
    console.log('\x1b[1;35m╚════════════════════════════════════════╝\x1b[0m');
    
    for (let i = 0; i < this.steps.length; i++) {
      console.log(this.visualizeStep(i));
    }
    
    this.printSummary();
  }
}

// Función interactiva
async function runInteractiveMode() {
  const