var echko = [];
var user = "";
var outputElement = document.getElementById("output");

function logInput(event) {
  if (event.key === "Enter") {
    var textoDigitado = document.getElementById("meuInput").value;

    if (/[\+\-\*\/]/.test(textoDigitado)) {
      calcular(textoDigitado);
      var lastEchkoMessage = echko[echko.length - 1];
      console.log("Echko:", lastEchkoMessage);
      outputElement.innerHTML += '<span class="echko-operation">echko: ' + lastEchkoMessage + "</span><br />";
    }

    document.getElementById("meuInput").value = "";
  }
}




function typeMessage(element, message) {
  var index = 0;
  var typingInterval = setInterval(function() {
    if (index < message.length) {
      element.textContent += message.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 20); // Intervalo de digitação em milissegundos
}

function exibirMensagemErro(message) {
  outputElement.innerHTML += '<span class="echko-error">' + message + "</span><br />";
}

function exibirMensagemOperacao(message) {
  var echkoMessageElement = document.createElement("span");
  echkoMessageElement.className = "echko-operation";

  outputElement.appendChild(echkoMessageElement);
  outputElement.appendChild(document.createElement("br"));

  typeMessage(echkoMessageElement, "Echko: " + message);
}


function exibirHorarioAtual() {
  var agora = new Date();
  var horarioFormatado = agora.toLocaleTimeString();
  exibirMensagemEchko("Horário atual: " + horarioFormatado);
  echko.push("Horário atual: " + horarioFormatado);
}

function exibirMensagemAjuda() {
  var ajudaMessage = "Comandos disponíveis:\n/clear - Limpar a tela\n/tempo - Exibir horário atual";
  alert(ajudaMessage);
}


function calcularExpressao(expressao) {
  var resultado;
  try {
    resultado = eval(expressao);
    if (isNaN(resultado)) {
      resultado = "Erro: expressão inválida";
    } else {
      resultado = "é igual a " + resultado;
    }
  } catch (error) {}

  if (resultado === "Erro: divisão por zero" || resultado === "Erro: expressão inválida") {
    exibirMensagemErro("echko: " + resultado);
  } else {
    exibirMensagemOperacao(resultado); // Exibir apenas o resultado aqui
  }
  echko.push(resultado);
  console.log("echko: ", echko);
}

function limparTela() {
  outputElement.innerHTML = "";
}


function exibirMensagemEchko(message) {
  var echkoMessageElement = document.createElement("span");
  echkoMessageElement.className = "echko-message";

  outputElement.appendChild(echkoMessageElement);
  outputElement.appendChild(document.createElement("br"));

  typeMessage(echkoMessageElement, "Echko: " + message);
}
function exibirMensagemUsuario(message) {
  outputElement.innerHTML += '<span class="user-message">user: ' + message + "</span><br />";
}



var vidarally = 100;

function exibirImagemRally() {
  var inputElement = document.getElementById("meuInput");
  var textoDigitado = inputElement.value;
  
  // rally quando algo for encontrado exemplo capturar por temperatura ou movimento (drone)
  if (textoDigitado === "/rally") {
    exibirMensagemUsuario("/rally")
    var imagemRallyElement = document.getElementById("imagemRally");
    imagemRallyElement.style.display = "block"; // Exibir a imagem
    exibirMensagemEchko("(mensagem)");
    exibirMensagemEchko("Vida do Rally: " + vidarally);
  } else {
    exibirMensagemEchko("Echko não entendeu o comando.");
  }

  inputElement.value = ""; // Limpar o valor do input
}



function valordigitado(event) {
  if (event.key === "Enter") {
    // Add an opening curly brace here
    event.preventDefault();
    var inputElement = document.getElementById("meuInput");
    var textoDigitado = inputElement.value;
  
    if (textoDigitado === "/clear") {
      limparTela();
    } else if (textoDigitado.startsWith("/hit")) {
      processarComandoHit(textoDigitado);
    } else if (textoDigitado === "/tempo") {
      exibirHorarioAtual();
    } else if (textoDigitado === "/ajuda") {
      exibirMensagemAjuda();
    } else if (/[\+\-\*\/]/.test(textoDigitado)) {
      user = textoDigitado;
      exibirMensagemUsuario(user);
      calcularExpressao(textoDigitado);
    } else if (["oi", "ola", "olá"].includes(textoDigitado.toLowerCase())) {
      user = textoDigitado;
      exibirMensagemUsuario(user);
      exibirMensagemEchko("Olá");
      echko.push("Olá");
    } else {
      user = textoDigitado;
      exibirMensagemUsuario(user);
    }
  
    echko.push(textoDigitado);
    inputElement.value = ""; // Limpar o valor do input
  } // Add a closing curly brace to match the opening one
    


  // Ideia de que o HIT pode se adicionar algo quando /rally foi encontrado ou objeto//

function processarComandoHit(comando) {
  const regex = /^\/hit (\d+)$/; // Expressão regular para corresponder ao comando "/hit [número]"
  const match = comando.match(regex);

  if (match) {
    const dano = parseInt(match[1], 10); // Extrai o valor do dano do comando
    if (!isNaN(dano)) {
      vidarally -= dano; // Reduz a vida do Rally pelo valor do dano
      exibirMensagemEchko("O Rally foi atingido e perdeu " + dano + " de vida.");
      exibirMensagemEchko("Vida atual do Rally: " + vidarally);
    }
  }
}
}
