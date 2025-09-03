# 📚 PROJECT INSTRUCTIONS - File Manager v8

## 🎯 CONTEXTO DO PROJETO
Sistema modular de gestão de arquivos usando n8n com arquitetura de microserviços e code storage dinâmico.

## 🔧 CONFIGURAÇÃO ESSENCIAL

### Workflows
```yaml
Production: lIVd7afgcpijTGSs    # NUNCA MODIFICAR DIRETAMENTE
POC/Dev: rJ903l1Uouu0xQYj       # Ambiente de desenvolvimento
Google MCPs: 7s55K0wzBOZpS3QQ   # Em produção
```

### Database Baserow
```yaml
Database ID: 278193
Tables:
  - 653888: code_storage    # Código dinâmico versionado
  - 650321: entries         # Uploads de arquivos
  - 650962: projects        # Projetos de usuários
  - 652039: error_logs      # Logs de erro centralizados
```

## 🏗️ ARQUITETURA

### Microserviços Ativos
1. **Code Storage API** - Gestão de código dinâmico
2. **User Projects API** - Projetos e permissões
3. **File Upload API** - Upload e processamento
4. **Dashboard API** - Interface unificada
5. **Google Drive MCP** - Integração Drive
6. **Google Sheets MCP** - Integração Sheets
7. **Google Docs MCP** - Integração Docs (+ AI Prompts)

### Fluxo de Dados
```
Frontend → Baserow Hub → Microserviço → Response
                ↓
          Code Storage
```

## 📝 POLÍTICAS MANDATÓRIAS

### 1. SEMPRE Try-Catch
```javascript
try {
  // código
  return [{ success: true, data: result }];
} catch (error) {
  return [{ success: false, error: error.message }];
}
```

### 2. NUNCA Hardcode
- Sempre buscar do Code Storage
- Credenciais no n8n, não no código
- Configurações em tabelas Baserow

### 3. Versionamento Obrigatório
- Formato: v1.0.0 (MAJOR.MINOR.PATCH)
- Cada mudança = nova versão
- Manter histórico no Code Storage

### 4. Error Logging Centralizado
- Todos os erros → tabela 652039
- Incluir: timestamp, component, error, stack

## 🚀 PROCEDIMENTOS DE DESENVOLVIMENTO

### Novo Componente
1. Escrever código com try-catch
2. Salvar no Code Storage (653888)
3. Testar no POC workflow
4. Validar error handling
5. Documentar no GitHub
6. Deploy gradual

### Modificação Existente
1. Buscar versão atual do Code Storage
2. Criar nova versão (incrementar)
3. Testar no POC
4. Backup antes de produção
5. Deploy com monitoramento

## 🔒 SEGURANÇA

### Obrigatório
- Validação de entrada
- Sanitização de dados
- Rate limiting
- Audit logs
- No delete real (apenas archive)

### Proibido
- Credenciais hardcoded
- Console.log em produção
- SQL injection vulnerável
- Bypass de validação

## 📊 MÉTRICAS DE QUALIDADE

### Performance
- Response time < 200ms
- Error rate < 1%
- Success rate > 99%
- Cache hit > 80%

### Código
- Try-catch: 100%
- Test coverage: > 80%
- Documentation: 100%
- No hardcoding: 100%

## 🎯 PRÓXIMAS PRIORIDADES

### Sprint 1 (Imediato)
1. **Prompts Library** - Google Docs para AI prompts
2. **Error Handler Central** - Componente unificado
3. **Cache Layer** - Redis/Memory cache

### Sprint 2 (Próxima semana)
1. **Dashboard v8** - Interface moderna
2. **Batch Processing** - Split/Merge pattern
3. **Performance Monitoring** - Métricas em tempo real

### Sprint 3 (Futuro)
1. **Service Registry** - Descoberta de serviços v2.0
2. **API Gateway** - Rate limiting e auth
3. **CI/CD Pipeline** - Deploy automatizado

## 🔄 COMANDOS ÚTEIS

### Code Storage
```javascript
// Salvar código
await saveToCodeStorage(component_id, code, version);

// Buscar código
const code = await getFromCodeStorage(component_id);

// Listar versões
const versions = await listVersions(component_id);
```

### Error Logging
```javascript
await logError({
  component: 'component_id',
  error: error.message,
  stack: error.stack,
  severity: 'error'
});
```

### Baserow Operations
```javascript
// Create
await baserow.create(tableId, data);

// Read
await baserow.get(tableId, filters);

// Update
await baserow.update(tableId, recordId, data);

// Archive (nunca delete)
await baserow.update(tableId, recordId, { archived: true });
```

## 📚 DOCUMENTAÇÃO ADICIONAL

- [Coding Standards](./CODING_STANDARDS.md)
- [Development Procedures](./PROCEDURES.md)
- [API Reference](./API_REFERENCE.md)
- [Architecture](./ARCHITECTURE.md)

## ⚠️ AVISOS CRÍTICOS

1. **NUNCA** modificar produção sem backup
2. **SEMPRE** testar no POC primeiro
3. **NUNCA** pular try-catch
4. **SEMPRE** versionar mudanças
5. **NUNCA** commitar credenciais

---
*Última atualização: 2025-09-03*
*Mantenedor: @Uptax-creator*