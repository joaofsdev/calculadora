## Calculadora (Estudos em JavaScript)

Projeto simples de uma calculadora feita com HTML, CSS e JavaScript puro, pensado como repositório de estudos.

### Sobre
- **Objetivo**: praticar manipulação de DOM, eventos de teclado e clique, controle de estado e formatação numérica em `pt-BR`.
- **Tecnologias**: HTML5, CSS3 e JavaScript (sem bibliotecas externas).

### Como executar
- Abra o arquivo `index.html` diretamente no navegador.
- Opcional: use uma extensão como “Live Server” (VS Code) para recarregar automaticamente a cada alteração.

### Estrutura do projeto
```text
calculadora/
  ├─ index.html
  └─ src/
     ├─ styles.css
     └─ script.js
```

### Funcionalidades
- **Operações**: adição (+), subtração (−), multiplicação (×), divisão (÷).
- **Porcentagem**: aplica porcentagem relativa ao valor anterior quando há operador ativo.
- **Memória de etapa**: encadeia operações sem precisar apertar “igual” entre elas.
- **Controles**: AC (limpar tudo), DEL (apagar último dígito), vírgula decimal (exibição com vírgula, entrada aceita "," e ".").
- **Histórico curto**: exibe o operando/operador atual acima do visor.
- **Teclado**:
  - Números: 0–9
  - Operadores: +, -, *, /
  - Decimal: "," ou "."
  - Ações: Enter/= (igual), Backspace (DEL), Esc (AC), % (porcentagem)

### Decisões técnicas
- **Formatação**: o visor usa `pt-BR` (separador de milhar com ponto e decimal com vírgula). Internamente, o cálculo usa ponto como decimal.
- **Limites**: até 16 dígitos no número atual; notação científica para números muito grandes/pequenos.
- **Erros**: divisão por zero e resultados inválidos exibem “Erro”.
- **Porcentagem**: quando há `operador` e `anterior`, calcula porcentagem relativa ao valor anterior.

### Acessibilidade
- Marcações `role="application"`, `aria-label` e `aria-live` para melhorar leitura por leitores de tela.
- Foco visível nos botões via teclado.

### Possíveis melhorias (para estudo)
- Botão de trocar sinal (+/−) e memória (MC/MR/M+/M−).
- Histórico detalhado com rolagem e repetição de resultado ao pressionar “=”.
- Testes unitários e de integração (ex.: Jest + Testing Library em ambiente DOM).
- Layout responsivo com tema claro/escuro e animações.
- Internacionalização (i18n) e PWA.

### Licença
- Repositório para fins de estudo. Utilize e adapte livremente.


