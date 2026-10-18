
const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');


formulario.addEventListener('submit', function(evento) {
  evento.preventDefault();
  const nome = document.getElementById('nome').value.trim();

  if (nome === '') {
    resultado.textContent = 'Digite o nome do estabelecimento.';
    return;
  }

  // 3. Checked informa se a caixa está marcada: true ou false.
  const entrada = document.getElementById('entrada').checked;
  const quarto = document.getElementById('quarto').checked;
  const banheiro = document.getElementById('banheiro').checked;
  const comunicacao = document.getElementById('comunicacao').checked;
  let pontos = '';

  // 4. O sinal ! significa NÃO. Juntamos os itens não confirmados.
  if (!entrada) {
    pontos += 'Entrada acessível. ';
  }
  if (!quarto) {
    pontos += 'Circulação no quarto. ';
  }
  if (!banheiro) {
    pontos += 'Recursos no banheiro. ';
  }
  if (!comunicacao) {
    pontos += 'Comunicação acessível. ';
  }


  if (pontos === '') {
    resultado.textContent = `${nome}: os quatro itens foram marcados. Isso não garante acessibilidade completa; confirme as necessidades de cada hóspede.`;
  } else {
    resultado.textContent = `${nome}: pontos a verificar: ${pontos}`;
  }

  console.log(resultado.textContent);
});


formulario.addEventListener('reset', function() {
  resultado.textContent = 'Preencha a lista para ver os pontos a verificar.';
});
formulario.addEventListener('input', function() {
  resultado.textContent = 'Clique em Ver resultado para atualizar a resposta.';
});
