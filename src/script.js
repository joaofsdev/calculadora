(() => {
  const visorEl = document.getElementById('display');
  const historicoEl = document.getElementById('history');
  const teclas = document.querySelector('.keys');

  // Estado da calculadora
  let atual = '0';
  let anterior = null;
  let operador = null;
  let ultimoIgual = false;

  const TAMANHO_MAX = 16;

  function formatarNumero(n) {
    if (n === 'Infinity' || n === '-Infinity' || Number.isNaN(Number(n))) return 'Erro';
    const num = Number(n);
    const abs = Math.abs(num);
    if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) {
      return num.toExponential(6).replace('.', ',');
    }
    const [inteira, decimal = ''] = n.toString().split('.');
    const inteiraFmt = Number(inteira).toLocaleString('pt-BR');
    return decimal ? `${inteiraFmt},${decimal.slice(0, 10)}` : inteiraFmt;
  }

  function converterParaNumero(str) {
    return Number(String(str).replace(/\./g, '').replace(',', '.'));
  }

  function atualizarVisor() {
    visorEl.value = formatarNumero(atual);
  }

  function atualizarHistorico() {
    if (anterior != null && operador) {
      historicoEl.textContent = `${formatarNumero(String(anterior))} ${operadorParaSimbolo(operador)}`;
    } else {
      historicoEl.textContent = '';
    }
  }

  function operadorParaSimbolo(op) {
    return op === '/' ? '÷' : op === '*' ? '×' : op === '-' ? '−' : op;
  }

  function limparTudo() {
    atual = '0';
    anterior = null;
    operador = null;
    ultimoIgual = false;
    atualizarVisor();
    atualizarHistorico();
  }

  function apagarUltimo() {
    if (ultimoIgual) return; // não apaga resultado
    if (atual.length <= 1 || (atual.length === 2 && atual.startsWith('-'))) {
      atual = '0';
    } else {
      atual = atual.slice(0, -1);
    }
    atualizarVisor();
  }

  function digitarNumero(digito) {
    if (ultimoIgual) {
      atual = String(digito);
      ultimoIgual = false;
      atualizarHistorico();
      atualizarVisor();
      return;
    }
    if (atual === '0') {
      atual = String(digito);
    } else if (atual.replace('-', '').length < TAMANHO_MAX) {
      atual += String(digito);
    }
    atualizarVisor();
  }

  function digitarDecimal() {
    if (ultimoIgual) {
      atual = '0.';
      ultimoIgual = false;
      atualizarHistorico();
      atualizarVisor();
      return;
    }
    if (!atual.includes('.')) {
      atual += '.';
      atualizarVisor();
    }
  }

  function definirOperador(proximoOperador) {
    const valorAtual = converterParaNumero(atual);
    if (operador && anterior != null && !ultimoIgual) {
      // encadeia operações
      const resultado = calcular(anterior, valorAtual, operador);
      anterior = resultado;
      atual = String(resultado);
    } else {
      anterior = valorAtual;
    }
    operador = proximoOperador;
    ultimoIgual = false;
    atual = '0';
    atualizarHistorico();
    atualizarVisor();
  }

  function calcular(a, b, op) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? NaN : a / b;
      default: return b;
    }
  }

  function igual() {
    if (operador == null || anterior == null) return;
    const a = Number(anterior);
    const b = converterParaNumero(atual);
    const resultado = calcular(a, b, operador);
    atual = String(resultado);
    anterior = null;
    operador = null;
    ultimoIgual = true;
    atualizarVisor();
    atualizarHistorico();
  }

  function porcentagem() {
    const valor = converterParaNumero(atual);
    if (operador && anterior != null) {
      // porcentagem relativa ao anterior (ex: 200 + 10% => 220)
      const relativo = (Number(anterior) * valor) / 100;
      atual = String(relativo);
    } else {
      atual = String(valor / 100);
    }
    atualizarVisor();
  }

  teclas.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const tipo = btn.getAttribute('data-type');

    switch (tipo) {
      case 'numero':
        digitarNumero(btn.getAttribute('data-value'));
        break;
      case 'decimal':
        digitarDecimal();
        break;
      case 'operador':
        definirOperador(btn.getAttribute('data-op'));
        break;
      case 'igual':
        igual();
        break;
      case 'limpar':
        limparTudo();
        break;
      case 'apagar':
        apagarUltimo();
        break;
      case 'porcento':
        porcentagem();
        break;
    }
  });

  // Suporte ao teclado
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/^[0-9]$/.test(key)) {
      digitarNumero(key);
    } else if (key === ',' || key === '.') {
      digitarDecimal();
    } else if (["+", "-", "*", "/"].includes(key)) {
      definirOperador(key);
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault();
      igual();
    } else if (key === 'Escape') {
      limparTudo();
    } else if (key === 'Backspace') {
      apagarUltimo();
    } else if (key === '%') {
      porcentagem();
    }
  });

  // Inicialização
  atualizarVisor();
  atualizarHistorico();
})();


