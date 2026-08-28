/*
========================================================================
ARQ ESCOLHA — LÓGICA DO SIMULADOR
========================================================================

O QUE ESTE ARQUIVO FAZ:
Este arquivo controla o comportamento da página simulador.html.

ELE É RESPONSÁVEL POR:
1. armazenar temporariamente os dados das soluções;
2. localizar os elementos existentes no HTML;
3. detectar as ações realizadas pelo usuário;
4. validar os valores informados;
5. filtrar e ordenar as soluções;
6. selecionar a alternativa mais adequada;
7. apresentar o resultado ou uma mensagem de erro na página.

ONDE É EXECUTADO:
Este código é executado pelo navegador, pois utiliza o objeto "document"
para acessar os elementos do HTML.

Por isso, este arquivo NÃO deve ser executado diretamente com:

    node simulador.js

Abra o arquivo index.html com o Live Server e acompanhe a execução pelo
Console do navegador: F12 > Console.
========================================================================
*/


// ---------------------------------------------------------------------
// 1. DECLARAÇÃO DOS DADOS PROVISÓRIOS
// ---------------------------------------------------------------------

/*
const:
Declara uma constante. Isso significa que a variável "solucoes" não poderá
receber outro array posteriormente.

array:
Os colchetes [ ] criam uma lista ordenada de elementos.

objetos:
Cada par de chaves { } representa uma solução. Um objeto agrupa
características relacionadas por meio de pares propriedade: valor.

Exemplo:

    nome: "Solução A"

"nome" é a propriedade e "Solução A" é o valor dessa propriedade.

Esses dados são demonstrativos. Futuramente, deverão ser substituídos
pelos parâmetros e regras extraídos da planilha real.
*/
const solucoes = [
  { nome: "Solução A", capacidade: 100, area: 120, custo: 5000 },
  { nome: "Solução B", capacidade: 150, area: 180, custo: 6500 },
  { nome: "Solução C", capacidade: 220, area: 220, custo: 9000 }
];


// ---------------------------------------------------------------------
// 2. SELEÇÃO DOS ELEMENTOS DA PÁGINA HTML
// ---------------------------------------------------------------------

/*
document:
Representa o documento HTML carregado no navegador.

querySelector():
Procura e retorna o primeiro elemento que corresponde ao seletor informado.

O símbolo # indica que estamos procurando um elemento pelo atributo "id".

Exemplo:

    document.querySelector("#formulario")

procura no HTML:

    <form id="formulario">

As constantes abaixo guardam referências aos elementos da página. Assim,
podemos ler valores, detectar eventos e alterar conteúdos posteriormente.
*/
const formulario = document.querySelector("#formulario");
const campoCapacidade = document.querySelector("#capacidade");
const campoArea = document.querySelector("#area");
const campoOrcamento = document.querySelector("#orcamento");
const caixaResultado = document.querySelector("#conteudo-resultado");
const botaoRedefinir = document.querySelector("#botao-redefinir");

/*
querySelectorAll():
Retorna todos os elementos que correspondem ao seletor informado.

O seletor abaixo procura todos os inputs cujo atributo "name" seja
"prioridade":

    <input name="prioridade">

O resultado é uma NodeList, uma coleção semelhante a uma lista.
*/
const opcoesPrioridade = document.querySelectorAll(
  'input[name="prioridade"]'
);


// ---------------------------------------------------------------------
// 3. REGISTRO DOS EVENTOS
// ---------------------------------------------------------------------

/*
addEventListener():
Registra uma função que deverá ser executada quando determinado evento ocorrer.

Evento "submit":
Ocorre quando o formulário é enviado, normalmente ao selecionar o botão
"Calcular solução".

Quando isso acontecer, o navegador executará calcularSolucao.

IMPORTANTE:
Passamos apenas o nome calcularSolucao, sem parênteses. Dessa forma, a função
fica registrada para ser executada futuramente. Se escrevêssemos
calcularSolucao(), ela seria executada imediatamente.
*/
formulario.addEventListener(
  "submit",
  calcularSolucao
);

/*
Evento "click":
Ocorre quando o botão de redefinição é selecionado.

Quando isso acontecer, será executada a função redefinirFormulario.
*/
botaoRedefinir.addEventListener(
  "click",
  redefinirFormulario
);

/*
forEach():
Percorre cada opção de prioridade encontrada por querySelectorAll().

opcao:
Representa temporariamente o input que está sendo percorrido.

=>:
Cria uma arrow function, também chamada de função de seta.

Evento "change":
Ocorre quando o usuário muda a opção selecionada.

Para cada input, registramos a função atualizarSelecao. Ela atualizará
a aparência visual da opção marcada.
*/
opcoesPrioridade.forEach(
  opcao =>
    opcao.addEventListener(
      "change",
      atualizarSelecao
    )
);


// ---------------------------------------------------------------------
// 4. FUNÇÃO PRINCIPAL DO CÁLCULO
// ---------------------------------------------------------------------

/*
function:
Declara uma função, ou seja, um bloco reutilizável de instruções.

calcularSolucao:
Nome atribuído à função.

evento:
Parâmetro que receberá automaticamente o objeto do evento "submit".
Esse objeto contém informações sobre o envio do formulário.
*/
function calcularSolucao(evento) {

  /*
  preventDefault():
  Impede o comportamento padrão do formulário.

  Por padrão, um formulário tenta enviar os dados e recarregar a página.
  Como o cálculo será feito pelo JavaScript no próprio navegador, impedimos
  esse recarregamento.
  */
  evento.preventDefault();

  /*
  .value:
  Obtém o valor digitado no campo HTML.

  Os valores dos inputs normalmente chegam ao JavaScript como texto.
  Mesmo que o usuário digite 150, recebemos inicialmente "150".

  Number():
  Converte o texto em um número.

  Portanto:

      "150" -> 150
  */
  const capacidadeMinima = Number(
    campoCapacidade.value
  );

  const areaDisponivel = Number(
    campoArea.value
  );

  const orcamentoMaximo = Number(
    campoOrcamento.value
  );

  /*
  O seletor :checked localiza somente o radio button atualmente marcado.

  Depois, .value obtém o valor dessa opção:

  - "custo"; ou
  - "capacidade".
  */
  const prioridade = document.querySelector(
    'input[name="prioridade"]:checked'
  ).value;

  /*
  console.log():
  Mostra informações no Console do navegador.

  É usado para acompanhar e depurar a execução, de forma semelhante ao
  print() do Python.

  As chaves criam um objeto com os valores que serão apresentados.
  */
  console.log(
    "Dados informados:",
    {
      capacidadeMinima,
      areaDisponivel,
      orcamentoMaximo,
      prioridade
    }
  );


  // -------------------------------------------------------------------
  // 4.1. VALIDAÇÃO DOS VALORES
  // -------------------------------------------------------------------

  /*
  if:
  Executa seu bloco quando a condição for verdadeira.

  <=:
  Significa "menor ou igual a".

  ||:
  Significa "OU" lógico.

  Basta que uma das três condições seja verdadeira para o valor ser
  considerado inválido.
  */
  if (
    capacidadeMinima <= 0 ||
    areaDisponivel <= 0 ||
    orcamentoMaximo <= 0
  ) {

    /*
    Chama mostrarErro() e envia a mensagem como argumento.
    */
    mostrarErro(
      "Preencha todos os valores com números maiores que zero."
    );

    /*
    return:
    Encerra imediatamente a execução da função calcularSolucao.

    Sem o return, o código continuaria tentando calcular mesmo depois
    de detectar dados inválidos.
    */
    return;
  }


  // -------------------------------------------------------------------
  // 4.2. FILTRAGEM DAS SOLUÇÕES COMPATÍVEIS
  // -------------------------------------------------------------------

  /*
  filter():
  Percorre o array "solucoes" e cria um novo array contendo somente os
  elementos que atendem à condição.

  solucao:
  Representa temporariamente cada objeto durante a repetição.

  &&:
  Significa "E" lógico. Todas as condições precisam ser verdadeiras.

  Uma solução será mantida somente quando:

  1. sua capacidade for maior ou igual à capacidade mínima;
  2. a área exigida for menor ou igual à área disponível;
  3. seu custo for menor ou igual ao orçamento máximo.

  O array original "solucoes" não é alterado pelo filter().
  */
  const alternativasValidas = solucoes.filter(
    solucao =>
      solucao.capacidade >= capacidadeMinima &&
      solucao.area <= areaDisponivel &&
      solucao.custo <= orcamentoMaximo
  );


  // -------------------------------------------------------------------
  // 4.3. ORDENAÇÃO CONFORME A PRIORIDADE
  // -------------------------------------------------------------------

  /*
  sort():
  Ordena os elementos do array alternativasValidas.

  primeira e segunda:
  Representam dois objetos que estão sendo comparados.

  ===:
  Faz uma comparação estrita. Verifica o valor e o tipo.

  Operador ternário:

      condição ? resultadoSeVerdadeiro : resultadoSeFalso

  Ele funciona como uma forma compacta de if/else.

  Se a prioridade for "capacidade":
  ordenamos da maior capacidade para a menor.

      segunda.capacidade - primeira.capacidade

  Caso contrário:
  ordenamos do menor custo para o maior.

      primeira.custo - segunda.custo
  */
  alternativasValidas.sort(
    (primeira, segunda) =>
      prioridade === "capacidade"
        ? segunda.capacidade - primeira.capacidade
        : primeira.custo - segunda.custo
  );

  /*
  console.table():
  Apresenta arrays ou objetos como tabela no Console do navegador.
  Isso facilita a inspeção das alternativas que passaram pelo filtro.
  */
  console.table(
    alternativasValidas
  );


  // -------------------------------------------------------------------
  // 4.4. SELEÇÃO DA MELHOR ALTERNATIVA
  // -------------------------------------------------------------------

  /*
  Os arrays começam na posição zero:

      [0] = primeiro elemento
      [1] = segundo elemento
      [2] = terceiro elemento

  Como o array já foi ordenado conforme a prioridade, o elemento [0]
  representa a melhor solução.

  Se o array estiver vazio, alternativasValidas[0] será undefined.
  */
  const melhorSolucao =
    alternativasValidas[0];

  /*
  !:
  É o operador de negação lógica.

  Se melhorSolucao não existir, !melhorSolucao será verdadeiro.
  */
  if (!melhorSolucao) {
    mostrarErro(
      "Nenhuma solução atende simultaneamente aos requisitos informados."
    );

    return;
  }

  /*
  Se o programa chegou até este ponto, existe uma solução válida.

  Enviamos para mostrarResultado():

  1. o objeto da melhor solução;
  2. a prioridade escolhida.
  */
  mostrarResultado(
    melhorSolucao,
    prioridade
  );
}


// ---------------------------------------------------------------------
// 5. APRESENTAÇÃO DO RESULTADO
// ---------------------------------------------------------------------

/*
Esta função recebe:

solucao:
O objeto que representa a alternativa escolhida.

prioridade:
O texto "custo" ou "capacidade".
*/
function mostrarResultado(
  solucao,
  prioridade
) {

  /*
  toLocaleString():
  Formata um número de acordo com uma localidade.

  "pt-BR":
  Utiliza a formatação brasileira.

  style: "currency":
  Informa que o número representa moeda.

  currency: "BRL":
  Define a moeda como real brasileiro.

  Exemplo:

      6500 -> R$ 6.500,00
  */
  const custoFormatado =
    solucao.custo.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    );

  /*
  innerHTML:
  Substitui o conteúdo interno do elemento HTML.

  As crases criam uma template string. Ela permite:

  - escrever texto em várias linhas;
  - inserir tags HTML;
  - inserir valores com a sintaxe ${expressao}.

  ATENÇÃO:
  innerHTML deve ser utilizado com cuidado quando o conteúdo vier diretamente
  de usuários ou fontes externas, pois pode permitir a inserção de HTML
  indesejado. Neste projeto, os dados das soluções são definidos pelo próprio
  código, portanto o uso é controlado.
  */
  caixaResultado.innerHTML = `
    <span class="compatibilidade">
      ✓ Melhor compatibilidade
    </span>

    <h3>${solucao.nome}</h3>

    <div class="metricas">
      <div>
        <span>Capacidade</span>
        <strong>${solucao.capacidade}</strong>
        <small>unidades</small>
      </div>

      <div>
        <span>Custo estimado</span>
        <strong>${custoFormatado}</strong>
      </div>
    </div>

    <p>
      É a alternativa de
      ${prioridade === "custo"
        ? "menor custo"
        : "maior capacidade"}
      que atende aos requisitos informados.
    </p>

    <button type="button">
      Ver alternativas compatíveis →
    </button>
  `;
}


// ---------------------------------------------------------------------
// 6. APRESENTAÇÃO DE MENSAGENS DE ERRO
// ---------------------------------------------------------------------

/*
mensagem:
Parâmetro que recebe o texto enviado pela função calcularSolucao().

A função substitui a área de resultado por uma mensagem orientando o usuário.
*/
function mostrarErro(mensagem) {
  caixaResultado.innerHTML = `
    <div class="sem-resultado">
      <h3>Nenhuma solução encontrada</h3>
      <p>${mensagem}</p>
      <span>
        Revise os valores e tente novamente.
      </span>
    </div>
  `;
}


// ---------------------------------------------------------------------
// 7. REDEFINIÇÃO DO FORMULÁRIO
// ---------------------------------------------------------------------

/*
Esta função é executada quando o usuário seleciona o botão de redefinição.

reset():
Restaura os campos para os valores originalmente definidos no HTML.
*/
function redefinirFormulario() {
  formulario.reset();

  /*
  Depois do reset, definimos explicitamente os valores demonstrativos.
  A propriedade .value também pode ser utilizada para alterar um campo.
  */
  campoCapacidade.value = 150;
  campoArea.value = 220;
  campoOrcamento.value = 10000;

  /*
  Atualiza a aparência visual dos botões de prioridade.
  */
  atualizarSelecao();

  /*
  solucoes[1]:
  Obtém o segundo objeto do array, correspondente à Solução B.

  O resultado inicial volta a mostrar a Solução B priorizando custo.
  */
  mostrarResultado(
    solucoes[1],
    "custo"
  );
}


// ---------------------------------------------------------------------
// 8. ATUALIZAÇÃO VISUAL DA PRIORIDADE
// ---------------------------------------------------------------------

function atualizarSelecao() {

  /*
  Localiza todos os elementos que possuem a classe CSS "opcao".

  forEach():
  Percorre cada rótulo encontrado.

  rotulo:
  Representa temporariamente cada elemento <label>.
  */
  document
    .querySelectorAll(".opcao")
    .forEach(
      rotulo => {

        /*
        Procura o input que está dentro do rótulo.

        .checked:
        Retorna true se o radio button estiver marcado ou false se não estiver.
        */
        const marcado =
          rotulo.querySelector("input").checked;

        /*
        classList:
        Permite manipular as classes CSS de um elemento.

        toggle("selecionada", marcado):
        - adiciona a classe "selecionada" quando marcado for true;
        - remove a classe quando marcado for false.

        A classe "selecionada" altera a borda, a cor e o fundo da opção.
        */
        rotulo.classList.toggle(
          "selecionada",
          marcado
        );
      }
    );
}


// ---------------------------------------------------------------------
// 9. INICIALIZAÇÃO DA PÁGINA
// ---------------------------------------------------------------------

/*
Esta instrução é executada assim que o navegador carrega o arquivo.

Ela apresenta a Solução B antes mesmo do primeiro cálculo, mantendo a página
igual ao mockup inicial.

Esse comportamento é apenas demonstrativo. Em uma versão definitiva,
poderíamos começar com uma área vazia e mostrar o resultado somente depois
que o usuário selecionasse "Calcular solução".
*/
mostrarResultado(
  solucoes[1],
  "custo"
);
