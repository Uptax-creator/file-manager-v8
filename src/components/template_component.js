/**
 * Template de Componente v1.0.0
 * Este é o padrão OBRIGATÓRIO para todos os componentes
 */

// [CODE] Component Template v1
try {
  // 1. Capturar input
  const input = $input.all();
  
  // 2. Validação de entrada
  if (!input || !input.action) {
    throw new Error('Action is required');
  }
  
  // 3. Buscar configuração do Code Storage (se necessário)
  const config = await $http.request({
    method: 'GET',
    url: 'https://api.baserow.io/api/database/rows/table/653888/',
    headers: {
      'Authorization': 'Token YOUR_TOKEN'
    },
    qs: {
      'search': 'component_config'
    }
  });
  
  // 4. Processar lógica principal
  let result;
  switch (input.action) {
    case 'create':
      result = await createRecord(input.data);
      break;
    case 'read':
      result = await readRecord(input.id);
      break;
    case 'update':
      result = await updateRecord(input.id, input.data);
      break;
    case 'archive':
      // NUNCA use delete real
      result = await archiveRecord(input.id);
      break;
    default:
      throw new Error(`Unknown action: ${input.action}`);
  }
  
  // 5. Return padronizado de sucesso
  return [{
    success: true,
    data: result,
    component: 'template_component',
    version: 'v1.0.0',
    timestamp: new Date().toISOString(),
    metadata: {
      action: input.action,
      processed: true
    }
  }];
  
} catch (error) {
  // 6. Error logging no Baserow
  try {
    await $http.request({
      method: 'POST',
      url: 'https://api.baserow.io/api/database/rows/table/652039/',
      headers: {
        'Authorization': 'Token YOUR_TOKEN',
        'Content-Type': 'application/json'
      },
      body: {
        component: 'template_component',
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        severity: 'error',
        input: JSON.stringify($input.all())
      }
    });
  } catch (logError) {
    // Se o log falhar, continua
    console.error('Failed to log error:', logError);
  }
  
  // 7. Return padronizado de erro
  return [{
    success: false,
    error: error.message,
    component: 'template_component',
    version: 'v1.0.0',
    timestamp: new Date().toISOString(),
    retry: true
  }];
}

// Funções auxiliares (exemplo)
async function createRecord(data) {
  // Implementação
  return { id: 'new_id', ...data };
}

async function readRecord(id) {
  // Implementação
  return { id, data: 'example' };
}

async function updateRecord(id, data) {
  // Implementação
  return { id, ...data, updated: true };
}

async function archiveRecord(id) {
  // NUNCA delete real, sempre archive
  return { id, archived: true };
}