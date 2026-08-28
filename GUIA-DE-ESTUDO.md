# Guia de estudo do ARQ Escolha

## Como as três linguagens participam

| Linguagem | Responsabilidade |
|---|---|
| HTML | Estrutura e conteúdo |
| CSS | Aparência, posicionamento e responsividade |
| JavaScript | Eventos, validação, cálculo e atualização da página |

## Fluxo completo

1. O navegador abre `index.html`.
2. O HTML importa `css/style.css`.
3. O botão da capa abre `simulador.html`.
4. O simulador importa o mesmo CSS e `js/simulador.js`.
5. O JavaScript localiza os elementos pelos identificadores do HTML.
6. O usuário envia o formulário.
7. O JavaScript valida, filtra e ordena as soluções.
8. O resultado é inserido em `#conteudo-resultado`.

## Principais tags HTML

| Tag | Finalidade |
|---|---|
| `header` | Cabeçalho da página |
| `nav` | Área de navegação |
| `main` | Conteúdo principal |
| `section` | Seção temática |
| `article` | Conteúdo independente |
| `form` | Formulário |
| `label` | Nome acessível de um campo |
| `input` | Entrada de valor |
| `select` | Lista de escolhas |
| `fieldset` | Grupo de campos relacionados |
| `button` | Ação selecionável |

## Principais propriedades CSS

| Propriedade | Finalidade |
|---|---|
| `display` | Define o modelo de layout |
| `grid-template-columns` | Define colunas de uma grade |
| `flex-direction` | Define a direção dos itens flexíveis |
| `gap` | Espaço entre elementos |
| `padding` | Espaçamento interno |
| `margin` | Espaçamento externo |
| `position` | Define o modo de posicionamento |
| `z-index` | Controla a sobreposição |
| `background` | Define fundo, gradiente ou imagem |
| `border` | Define borda |
| `box-shadow` | Define sombra |
| `transition` | Suaviza alterações visuais |
| `@media` | Aplica regras conforme a tela |

## Principais recursos JavaScript

| Recurso | Finalidade |
|---|---|
| `const` | Declara uma constante |
| `querySelector()` | Localiza um elemento no HTML |
| `addEventListener()` | Registra uma ação para um evento |
| `Number()` | Converte texto em número |
| `filter()` | Filtra um array |
| `sort()` | Ordena um array |
| `forEach()` | Percorre elementos |
| `innerHTML` | Insere conteúdo HTML |
| `classList.toggle()` | Adiciona ou remove uma classe |
| `return` | Encerra a função |

## Ordem recomendada de leitura

1. Leia `index.html`.
2. Leia `simulador.html`.
3. Compare as classes do HTML com os seletores de `style.css`.
4. Compare os IDs do formulário com os `querySelector()` do JavaScript.
5. Acompanhe `calcularSolucao()` com o Console aberto.
6. Altere um valor por vez e observe o resultado.
