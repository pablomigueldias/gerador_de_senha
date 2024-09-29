// Elementos
const formulario = document.querySelector(".formulario");
const geradorDeSenha = document.querySelector(".gerar-senha");
const divGerador = document.querySelector("gerador-de-senha");
const divGerada = document.querySelector(".senha-gerada");

const containerOpcaoSenha = document.querySelector(".opcao-senha");
const btnAbrirOpcao = document.querySelector(".abrir-gerar-senha");
const quantidadeCaractere = document.querySelector("#caracteres");
const letras = document.querySelector("#letras");
const numeros = document.querySelector("#numeros");
const simbolos = document.querySelector("#simbolos");
const btnCopiar = document.querySelector(".senha-gerada button");

// Funções

const pegarLetraMinuscula = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
const pegarLetraMiuscula = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const pegarNumero = () => {
  return Math.floor(Math.random() * 10).toString();
};

const pegarSimbolo = () => {
  const simbolo = "()[]{}=<>/!@#$%&*";

  return simbolo[Math.floor(Math.random() * simbolo.length)];
};

const geradorDeSenhas = (
  pegarLetraMinuscula,
  pegarLetraMiuscula,
  pegarNumero,
  pegarSimbolo
) => {
  let senha = "";

  const tamanhoSenha = +quantidadeCaractere.value;

  if (tamanhoSenha > 25) {
    return;
  }
  const gerador = [];

  if (letras.checked) {
    gerador.push(pegarLetraMinuscula, pegarLetraMiuscula);
  }
  if (numeros.checked) {
    gerador.push(pegarNumero);
  }
  if (simbolos.checked) {
    gerador.push(pegarSimbolo);
  }

  if (gerador.length === 0) {
    return;
  }

  for (i = 0; i < tamanhoSenha; i = i + gerador.length) {
    gerador.forEach(() => {
      const valorAleatorio =
        gerador[Math.floor(Math.random() * gerador.length)]();

      senha += valorAleatorio;
      //   mesma coisa que senha = senha + valor aleatorio
    });
  }

  senha = senha.slice(0, tamanhoSenha);

  divGerada.style.display = "flex";
  divGerada.querySelector("h4").innerText = senha;
};

// Eventos

geradorDeSenha.addEventListener("click", (e) => {
  e.preventDefault();
  geradorDeSenhas(
    pegarLetraMinuscula,
    pegarLetraMiuscula,
    pegarNumero,
    pegarSimbolo
  );
});

btnAbrirOpcao.addEventListener("click", () => {
  containerOpcaoSenha.classList.toggle("hide");
});

btnCopiar.addEventListener("click", (e) => {
  e.preventDefault();
  const senha = divGerada.querySelector("h4").innerText;

  navigator.clipboard.writeText(senha).then(() => {
    btnCopiar.innerText = "Senha Copiada!";
  });

  setTimeout(() => {
    btnCopiar.innerText = "Copiar";
  }, 1000);
});
