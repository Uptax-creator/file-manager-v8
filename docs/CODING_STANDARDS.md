# 📝 CODING STANDARDS - File Manager v8

## 🚨 POLÍTICAS OBRIGATÓRIAS (NUNCA IGNORAR)

### 1. Try-Catch em TODOS os Componentes
```javascript
// ✅ CORRETO - SEMPRE USE ESTE PADRÃO
try {
  const input = $input.all();
  
  // Validação de entrada
  if (!input.id) {
    throw new Error('ID is required');
  }
  
  // Lógica do componente
  const result = await processData(input);
  
  // Return padronizado
  return [{
    success: true,
    data: result,
    component: 'component_id',
    version: 'v1',
    timestamp: new Date().toISOString()
  }];
  
} catch (error) {
  // Log no Baserow
  await logError(error);
  
  // Return de erro padronizado
  return [{
    success: false,
    error: error.message,
    component: 'component_id',
    timestamp: new Date().toISOString()
  }];
}
```

### 2. NUNCA Hardcode - Use Code Storage
```javascript
// ❌ ERRADO
const API_KEY = 'abc123';

// ✅ CORRETO
const config = await getFromCodeStorage('api_config_v1');
const API_KEY = config.api_key;
```

### 3. Versionamento Semântico
- MAJOR.MINOR.PATCH (1.0.0)
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### 4. Error Logging Obrigatório
```javascript
async function logError(error) {
  await baserow.createRecord('652039', {
    component: 'component_id',
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    severity: 'error'
  });
}
```

## 📊 ESTRUTURA DE RETORNO

### Sucesso
```javascript
{
  success: true,
  data: any,
  component: string,
  version: string,
  timestamp: ISO8601,
  metadata: {} // opcional
}
```

### Erro
```javascript
{
  success: false,
  error: string,
  component: string,
  timestamp: ISO8601,
  retry: boolean // opcional
}
```

## 🔒 SEGURANÇA

1. **Validação de Entrada**: SEMPRE valide inputs
2. **Sanitização**: Limpe dados antes de processar
3. **Rate Limiting**: Implemente throttling
4. **Audit Logs**: Registre todas as operações

## 📝 NOMENCLATURA

### Componentes
- Prefixo por tipo: `[VAL]`, `[QRY]`, `[BIZ]`, `[TRX]`
- CamelCase: `validateUserInput`
- Descritivo: `getUserProjectsByEmail`

### Variáveis
```javascript
// Constantes
const MAX_RETRIES = 3;

// Configurações
const config = {};

// Resultados
const result = await operation();
```

## ⚡ PERFORMANCE

1. **Batch Operations**: Processe em lotes
2. **Caching**: Use cache quando possível
3. **Async/Await**: Sempre para operações I/O
4. **Early Returns**: Falhe rápido

## 🧪 TESTES

Cada componente DEVE ter:
1. Teste de sucesso
2. Teste de erro
3. Teste de edge cases
4. Validação de schema

## 🚫 PROIBIDO

1. ❌ Código sem try-catch
2. ❌ Console.log em produção
3. ❌ Hardcoded values
4. ❌ Delete real (use archive)
5. ❌ SQL injection vulnerável
6. ❌ Credenciais em código

---
*Estas políticas são MANDATÓRIAS. Violações resultam em rejeição do código.*