// Os 16 termos: "id" é a resposta usada nas casas, "nome" é o texto mostrado no botão
var termos = [
  { id: "CPU",              nome: "CPU" },
  { id: "ULA",              nome: "ULA" },
  { id: "UC",               nome: "UC" },
  { id: "REGISTRADORES",    nome: "Registradores" },
  { id: "RAM",              nome: "RAM" },
  { id: "ROM",              nome: "ROM" },
  { id: "EEPROM",           nome: "EEPROM" },
  { id: "FLASH",            nome: "Flash" },
  { id: "CACHE",            nome: "Cache" },
  { id: "MEMORIADEMASSA",   nome: "Memória de massa" },
  { id: "DMA",              nome: "DMA" },
  { id: "ADDRESSBUS",       nome: "Address bus" },
  { id: "DATABUS",          nome: "Data bus" },
  { id: "MICROCONTROLADOR", nome: "Microcontrolador" },
  { id: "DUALCORE",         nome: "Dual core" },
  { id: "QUADCORE",         nome: "Quad core" }
];

// Pista de cada casa (a casa é identificada pela resposta)
var pistas = {
  DMA:              "Mecanismo que move dados entre periféricos e memória sem ocupar o processador.",
  CACHE:            "Memória pequena e muito rápida que guarda dados usados com frequência, perto do processador.",
  REGISTRADORES:    "Pequenas posições de armazenamento dentro do processador, as mais rápidas de todas.",
  DATABUS:          "Caminho bidirecional que transporta os valores lidos ou escritos entre os componentes.",
  MEMORIADEMASSA:   "Guarda arquivos e programas de forma permanente, em grande volume, como o HD.",
  ULA:              "Circuito do processador que realiza somas, comparações e operações lógicas.",
  EEPROM:           "Guarda dados mesmo desligada e pode ser reescrita com eletricidade, mudando um dado pequeno de cada vez (byte a byte).",
  ADDRESSBUS:       "Caminho de sentido único por onde a CPU indica a posição de memória desejada.",
  DUALCORE:         "Processador com dois núcleos que podem executar tarefas ao mesmo tempo.",
  UC:               "Parte da CPU que interpreta as instruções e comanda os demais componentes.",
  QUADCORE:         "Processador com quatro núcleos de execução em um só chip.",
  ROM:             "Memória que já vem pronta de fábrica: guarda as instruções básicas e não muda.",
  RAM:              "Memória temporária e volátil onde ficam os códigos em execução; perde tudo ao desligar.",
  MICROCONTROLADOR: "Chip único com processador, memória e portas de entrada e saída, comum em Arduino.",
  CPU:              "Componente central que executa as instruções dos programas.",
  FLASH:            "Guarda sem energia e regrava por blocos inteiros, usada em pendrives e SSDs."
};

var textoInicial = "Clique numa casa do diagrama para ler a pista.";

var casas = [];          // uma por casa do diagrama
var selecionada = null;  // casa escolhida no momento
var ordemDoBanco = [];   // ordem embaralhada dos termos na lista
var banco = document.getElementById("banco");
var painelPista = document.getElementById("pista");
var contador = document.getElementById("contador");
var recado = document.getElementById("recado");
var barra = document.getElementById("barra-preenchida");

function nomeDoTermo(id) {
  for (var i = 0; i < termos.length; i++) {
    if (termos[i].id === id) {
      return termos[i].nome;
    }
  }
  return id;
}

// Escreve no post-it da pista. Criar um <span> novo faz a animação de entrada rodar de novo.
function escreverNoPainel(texto) {
  painelPista.innerHTML = "<span class='texto'>" + texto + "</span>";
}

function mostrarPista(casa) {
  escreverNoPainel(casa.n + ". " + pistas[casa.resposta]);
}

// Lê as casas que estão no HTML e liga os eventos de cada uma
function criarCasas() {
  var elementos = document.querySelectorAll(".slot");
  for (var i = 0; i < elementos.length; i++) {
    var casa = {
      el: elementos[i],
      n: i + 1,
      resposta: elementos[i].getAttribute("data-resposta"),
      colocado: "",   // id do termo colocado ("" = vazia)
      estado: ""      // "", "certa" ou "errada"
    };
    casas.push(casa);
    ligarEventosDaCasa(casa);
  }
}

function ligarEventosDaCasa(casa) {
  

  // Clique: seleciona a casa; se já tinha um termo, ele volta para a lista
  casa.el.onclick = function () {
    casa.colocado = "";
    casa.estado = "";
    selecionada = casa;
    mostrarPista(casa);
    desenhar();
  };

  // Arrastar e soltar: o termo solto na casa fica nela
  casa.el.ondragover = function (e) {
    e.preventDefault();
  };
  casa.el.ondrop = function (e) {
    e.preventDefault();
    colocar(casa, e.dataTransfer.getData("text"));
  };
}

// Coloca o termo na casa (e tira o mesmo termo de qualquer outra casa)
function colocar(casa, idDoTermo) {
  if (idDoTermo === "") {
    return;
  }
  for (var i = 0; i < casas.length; i++) {
    if (casas[i].colocado === idDoTermo) {
      casas[i].colocado = "";
      casas[i].estado = "";
    }
  }
  casa.colocado = idDoTermo;
  casa.estado = "";
  selecionada = null;
  desenhar();
  casa.el.classList.add("nova");   // animação de "encaixe"
}

// Clique num termo da lista
function clicarNoTermo(idDoTermo) {
  if (selecionada === null) {
    escreverNoPainel("Primeiro clique numa casa do diagrama para ler a pista.");
    return;
  }
  colocar(selecionada, idDoTermo);
}

// Redesenha tudo a partir do estado (casas + lista de termos)
function desenhar() {
  for (var i = 0; i < casas.length; i++) {
    var c = casas[i];
    var texto = c.colocado === "" ? "?" : nomeDoTermo(c.colocado);
    c.el.innerHTML = "<span class='n'>" + c.n + "</span>" + texto;

    var classes = "slot";
    if (c.colocado !== "") { classes += " cheia"; }
    if (c === selecionada) { classes += " selecionada"; }
    if (c.estado !== "") { classes += " " + c.estado; }
    c.el.className = classes;
  }
  desenharBanco();
}

// A lista mostra só os termos que ainda não foram colocados
function desenharBanco() {
  banco.innerHTML = "";
  for (var i = 0; i < ordemDoBanco.length; i++) {
    var id = ordemDoBanco[i];
    if (!estaColocado(id)) {
      banco.appendChild(criarBotaoDoTermo(id, i));
    }
  }
}

function estaColocado(id) {
  for (var i = 0; i < casas.length; i++) {
    if (casas[i].colocado === id) {
      return true;
    }
  }
  return false;
}

// A posição na lista (i) define a cor e a inclinação do termo, e não muda durante a partida
function criarBotaoDoTermo(id, i) {
  var botao = document.createElement("button");
  botao.type = "button";
  botao.className = "termo cor" + (i % 5) + " gira" + (i % 4);
  botao.textContent = nomeDoTermo(id);
  botao.draggable = true;
  botao.ondragstart = function (e) {
    e.dataTransfer.setData("text", id);
  };
  botao.onclick = function () {
    clicarNoTermo(id);
  };
  return botao;
}

// Frase de incentivo mostrada depois do Conferir
function fraseDeIncentivo(acertos, preenchidas) {
  if (acertos === casas.length) {
    return "Montou tudo! Que máquina!";
  }
  if (preenchidas === 0) {
    return "O tabuleiro está vazio. Bora montar!";
  }
  if (acertos < casas.length / 2) {
    return "Tá esquentando! Releia as pistas e tente de novo.";
  }
  return "Mais da metade! Falta pouquinho!";
}

// Botão Conferir
function conferir() {
  var acertos = 0;
  var erradas = 0;
  var preenchidas = 0;

  for (var i = 0; i < casas.length; i++) {
    var c = casas[i];
    if (c.colocado !== "") {
      preenchidas++;
    }
    if (c.colocado === c.resposta) {
      c.estado = "certa";
      acertos++;
    } else if (c.colocado !== "") {
      c.estado = "errada";
      erradas++;
    } else {
      c.estado = "";
    }
  }

  contador.textContent = acertos + " de " + casas.length + " componentes";
  recado.textContent = fraseDeIncentivo(acertos, preenchidas);
  barra.style.width = (acertos / casas.length * 100) + "%";

  // O mascote muda de cara conforme o resultado
  document.body.classList.remove("vitoria", "erros");
  if (acertos === casas.length) {
    document.body.classList.add("vitoria");
    confete();
  } else if (erradas > 0) {
    document.body.classList.add("erros");
  }
  desenhar();
}

// Botão Reiniciar: devolve todos os termos e embaralha a lista de novo
function reiniciar() {
  for (var i = 0; i < casas.length; i++) {
    casas[i].colocado = "";
    casas[i].estado = "";
  }
  selecionada = null;
  document.body.classList.remove("vitoria", "erros");
  contador.textContent = "0 de " + casas.length + " componentes";
  recado.textContent = "";
  barra.style.width = "0%";
  escreverNoPainel(textoInicial);
  embaralhar();
  desenhar();
}

function embaralhar() {
  ordemDoBanco = [];
  for (var i = 0; i < termos.length; i++) {
    ordemDoBanco.push(termos[i].id);
  }
  ordemDoBanco.sort(function () {
    return Math.random() - 0.5;
  });
}

// Chuva de confete: cria 60 papeizinhos coloridos que caem e somem depois de uns segundos
function confete() {
  var cores = ["#ff5a43", "#ffc531", "#5fd6a4", "#b9a4ff", "#7cc7ff", "#ff9ec7"];
  var area = document.getElementById("confete");
  area.innerHTML = "";
  for (var i = 0; i < 60; i++) {
    var p = document.createElement("span");
    p.className = "papelzinho";
    p.style.left = (Math.random() * 100) + "%";
    p.style.background = cores[i % cores.length];
    p.style.animationDelay = (Math.random() * 0.8) + "s";
    p.style.animationDuration = (2.2 + Math.random() * 1.8) + "s";
    area.appendChild(p);
  }
  setTimeout(function () {
    area.innerHTML = "";
  }, 5000);
}

// Os olhos do mascote seguem o mouse (o CSS lê --px e --py, de -1 a 1)
document.onmousemove = function (e) {
  var px = (e.clientX / window.innerWidth) * 2 - 1;
  var py = (e.clientY / window.innerHeight) * 2 - 1;
  document.documentElement.style.setProperty("--px", px);
  document.documentElement.style.setProperty("--py", py);
};

criarCasas();
embaralhar();
desenhar();
document.getElementById("btn-conferir").onclick = conferir;
document.getElementById("btn-reiniciar").onclick = reiniciar;