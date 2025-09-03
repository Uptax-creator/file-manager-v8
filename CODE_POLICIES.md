# 📝 CODE POLICIES - File Manager v8

## 🔴 MANDATORY RULES

### 1. Try-Catch Pattern
**EVERY** Code node MUST implement try-catch:

```javascript
// ✅ CORRECT
try {
  const input = $input.all();
  
  // Validation
  if (!input.id) {
    throw new Error('ID is required');
  }
  
  // Business logic
  const result = await processData(input);
  
  // Success return
  return [{
    success: true,
    data: result,
    component: 'component_name',
    version: 'v1.0.0',
    timestamp: new Date().toISOString()
  }];
  
} catch (error) {
  // Error logging
  await logToBaserow(error);
  
  // Error return
  return [{
    success: false,
    error: error.message,
    component: 'component_name',
    stack: error.stack,
    timestamp: new Date().toISOString()
  }];
}
```

### 2. No Hardcoding
**NEVER** hardcode values. Always use:
- Code Storage (table 653888) for dynamic code
- Environment variables for secrets
- Baserow for configuration

```javascript
// ❌ WRONG
const apiUrl = "https://api.example.com";

// ✅ CORRECT
const apiUrl = await getConfig('api_url');
```

### 3. Return Format
**ALWAYS** return an array with objects:

```javascript
// ❌ WRONG
return result;
return "success";

// ✅ CORRECT
return [{
  success: true,
  data: result
}];
```

### 4. Error Logging
**ALL** errors MUST be logged to Baserow (table 652039):

```javascript
async function logError(error, component) {
  await baserow.createRecord('652039', {
    timestamp: new Date().toISOString(),
    component: component,
    error_message: error.message,
    stack_trace: error.stack,
    severity: 'error',
    workflow_id: $workflow.id
  });
}
```

### 5. Versioning
Use semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

```javascript
const VERSION = 'v1.2.3';
```

### 6. Component Structure

```javascript
/**
 * Component: User Projects Filter
 * Version: v1.0.0
 * Author: System
 * Modified: 2025-09-03
 * Dependencies: Baserow API
 */

try {
  // 1. Input validation
  const { email, limit = 10 } = $input.all();
  if (!email) throw new Error('Email required');
  
  // 2. Business logic
  const projects = await queryProjects(email, limit);
  
  // 3. Output transformation
  return [{
    success: true,
    data: projects,
    count: projects.length,
    component: 'user_projects_filter',
    version: 'v1.0.0'
  }];
  
} catch (error) {
  // 4. Error handling
  await logError(error, 'user_projects_filter');
  return [{
    success: false,
    error: error.message
  }];
}
```

## 🟡 BEST PRACTICES

### Async/Await
Always use async/await for promises:

```javascript
// ❌ WRONG
fetch(url).then(res => res.json()).then(data => ...);

// ✅ CORRECT
const res = await fetch(url);
const data = await res.json();
```

### Input Validation
Validate ALL inputs:

```javascript
function validateInput(input) {
  const required = ['id', 'email', 'action'];
  
  for (const field of required) {
    if (!input[field]) {
      throw new Error(`${field} is required`);
    }
  }
  
  // Type validation
  if (typeof input.id !== 'string') {
    throw new Error('ID must be a string');
  }
  
  // Format validation
  if (!input.email.includes('@')) {
    throw new Error('Invalid email format');
  }
}
```

### Performance
- Use `$input.first()` for single items
- Use `$input.all()` for multiple items
- Cache repeated API calls
- Implement pagination for large datasets

### Security
- **NEVER** expose API keys
- Sanitize user inputs
- Use parameterized queries
- Validate file types and sizes

## 🟢 NAMING CONVENTIONS

### Components
```javascript
// Pattern: [category]_[action]_[version]
'user_projects_filter_v1'
'file_upload_processor_v2'
'error_handler_central_v1'
```

### Variables
```javascript
// Use camelCase
const userName = 'John';
const projectCount = 5;

// Constants in UPPERCASE
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const API_TIMEOUT = 30000; // 30s
```

### Functions
```javascript
// Descriptive verb-noun pattern
async function validateUserInput(input) {}
async function fetchProjectData(id) {}
async function logErrorToBaserow(error) {}
```

## 📊 DATABASE CONVENTIONS

### Baserow Tables
- **653888**: code_storage
- **650321**: entries
- **650962**: projects
- **652039**: error_logs

### Field Names
- Use snake_case: `user_email`, `created_at`
- Timestamps: ISO 8601 format
- IDs: UUID v4 when possible

## 🔧 TESTING CHECKLIST

Before deploying any component:

- [ ] Try-catch implemented
- [ ] Input validation complete
- [ ] Error logging works
- [ ] Return format correct
- [ ] Version updated
- [ ] Documentation added
- [ ] Tested with edge cases
- [ ] Performance acceptable (<200ms)

## 📈 MONITORING

Track these metrics:
- Error rate: < 1%
- Response time: < 200ms
- Success rate: > 99%
- Memory usage: < 128MB

## 🚨 FORBIDDEN PRACTICES

1. ❌ Using `eval()` or `Function()`
2. ❌ Storing passwords in plain text
3. ❌ Direct database modifications without validation
4. ❌ Infinite loops or recursion without limits
5. ❌ Synchronous file operations
6. ❌ Console.log in production (use proper logging)

## 📝 CODE REVIEW CRITERIA

All code must pass:
1. Automated linting
2. Security scan
3. Performance test
4. Manual review
5. Documentation check

---
*These policies are MANDATORY for all developers*
*Last Updated: 2025-09-03*
