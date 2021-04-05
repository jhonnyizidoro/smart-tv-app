# Smart TV App

---

### Como foi feita a navegação?

Para a navegação utilizei um método chamado 'Focus Key' ou 'Focus Map' ([saiba mais](https://medium.com/norigintech/smart-tv-navigation-with-react-86bd5f3037b7)). Todos os componentes de uma página implementam a interface `Focusable`, que recebe uma propriedade chamada `isFocused`, e caso essa propriedade seja `true`, esse componente é navegável.  Os itens navegáveis desses componentes estão dentro do componente `Navegateble`, que cuida de toda a lógica da navegação pelo teclado.

No componente `List`, por exemplo, os itens da lista estão dentro de `Navegateble`, e quando a tecla `ArrowUp` é pressionada, o componente `List`, que por sua vez implementa `Focusable`, verifica se o `ListItem` focado é o `0`, se sim, o componente chama a função `onFocusUp`, e a página que utiliza o componente `List` se encarrega de mudar o componente focado.

### Suporte em browsers

Um dos requisitos era o app funcionar em browsers antigos. O app feito não está funcionando no **Opera 12** pelo fato do iframe do Youtube não funcionar nesse browser. Eu até comecei a adicionar os _polyfills_ necessários, mas de qualquer forma os vídeos não seriam executados. Vale destacar que em alguns browsers não tão antigos, IE11 por exemplo, funciona.

### Gerenciamento de estado

Utilizei o `Context API` para gerenciar o **Dark Mode** e os **Favoritos**, mantendo os estados no `localStorage` para que eles pudessem ser recuperados ao recarregar a página.

### Design

O design utilizado foi feito por mim, e está disponível [nesse link](https://xd.adobe.com/view/d9656c35-119c-4926-b5e7-32fdd7b47b5b-8c36/). Não fui 100% fiel ao meu design, pois quando fiz, fiz pensando na navegação apenas pelo teclado.

### Execução do projeto

Basta rodar o comando `yarn start` ou `npm start` no terminal. O projeto também foi hospedado na **Vercel** e está disponível no [nesse link](https://smart-tv-app.vercel.app/).
