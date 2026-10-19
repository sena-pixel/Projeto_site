// 1. DADOS LOCAIS: exemplos fictícios, sem servidor ou banco de dados.
// false significa que o recurso NÃO foi informado no exemplo.
const moteis = [
  { nome: "Motel Horizonte", preco: 120, entrada: true, banheiro: false, comunicacao: true },
  { nome: "Motel Acolher", preco: 160, entrada: true, banheiro: true, comunicacao: false },
  { nome: "Motel Sereno", preco: 220, entrada: true, banheiro: true, comunicacao: true }
];

// 2. DOM: guardar referências aos elementos da página.
const formulario = document.getElementById("form-busca");
const campoNome = document.getElementById("nome");
const resultados = document.getElementById("resultados");
const resumo = document.getElementById("resumo");

// Função auxiliar: o operador ternário escolhe entre duas mensagens.
function recurso(informado, descricao) {
  return informado
    ? `<li class="sim"><span aria-hidden="true">✓</span> ${descricao}</li>`
    : `<li class="pendente"><span aria-hidden="true">—</span> ${descricao}: não informado</li>`;
}

// 3. SAÍDA: template literals montam cartões usando apenas os dados locais.
function mostrarMoteis(lista) {
  resultados.innerHTML = "";

  if (lista.length === 0) {
    resultados.innerHTML = `
      <div class="vazio">
        <h3>Nenhum exemplo combina com esta busca.</h3>
        <p>Experimente aumentar o orçamento ou use “Limpar filtros” para visualizar todos os exemplos. Preserve os recursos que são essenciais para você.</p>
      </div>`;
    return;
  }

  for (const motel of lista) {
    resultados.innerHTML += `
      <article class="cartao">
        <p class="etiqueta">Estabelecimento fictício</p>
        <h3>${motel.nome}</h3>
        <p class="preco">R$ ${motel.preco} <span>/ 3 horas</span></p>
        <ul class="recursos">
          ${recurso(motel.entrada, "Entrada sem degraus")}
          ${recurso(motel.banheiro, "Banheiro adaptado")}
          ${recurso(motel.comunicacao, "Atendimento por texto")}
        </ul>
      </article>`;
  }
}

// 4. ENTRADA E VALIDAÇÃO: espaços em branco não contam como um nome.
campoNome.addEventListener("input", function () {
  campoNome.setCustomValidity("");
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Impede que a página recarregue ao enviar o formulário.

  const nome = campoNome.value.trim();
  if (nome === "") {
    campoNome.setCustomValidity("Digite um nome ou apelido, sem usar apenas espaços.");
    campoNome.reportValidity();
    return;
  }

  const orcamento = Number(document.getElementById("orcamento").value);
  const precisaEntrada = document.getElementById("entrada").checked;
  const precisaBanheiro = document.getElementById("banheiro").checked;
  const precisaComunicacao = document.getElementById("comunicacao").checked;
  const encontrados = [];
  let quantidade = 0; // let permite alterar o contador ao longo do laço.

  // 5. REGRA: precisa caber no orçamento E ter TODOS os recursos selecionados.
  for (const motel of moteis) {
    const cabeNoOrcamento = motel.preco <= orcamento;
    const atendeEntrada = !precisaEntrada || motel.entrada;
    const atendeBanheiro = !precisaBanheiro || motel.banheiro;
    const atendeComunicacao = !precisaComunicacao || motel.comunicacao;

    if (cabeNoOrcamento && atendeEntrada && atendeBanheiro && atendeComunicacao) {
      encontrados.push(motel);
      quantidade++;
    }
  }

  mostrarMoteis(encontrados);
  const palavra = quantidade === 1 ? "opção fictícia encontrada" : "opções fictícias encontradas";
  // O nome vem do usuário: textContent o exibe como texto, nunca como HTML.
  resumo.textContent = `${nome}, ${quantidade} ${palavra} com orçamento de até R$ ${orcamento}.`;
});

// 6. RESET: o navegador restaura os campos; o código restaura os resultados.
formulario.addEventListener("reset", function () {
  campoNome.setCustomValidity("");
  mostrarMoteis(moteis);
  resumo.textContent = "3 exemplos fictícios para explorar. Preencha a busca para filtrar.";
});

// Estado inicial: mostrar todos os exemplos, antes de qualquer busca.
mostrarMoteis(moteis);
resumo.textContent = "3 exemplos fictícios para explorar. Preencha a busca para filtrar.";
