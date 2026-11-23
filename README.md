# Monte o computador

Jogo de navegador para treinar os termos de **Tópicos de Arquitetura Computacional**
(disciplina de Arquitetura Computacional). Em vez de uma cruzadinha, o jogador monta
um computador: cada termo é um componente que precisa ser encaixado no lugar certo
de uma placa-mãe desenhada na tela.

Feito só com HTML, CSS e JavaScript puros, sem bibliotecas.

## Jogue aqui

**Link publicado:** https://SEU-USUARIO.github.io/arqcomp-cruzadinha/

## Como jogar

1. Clique numa casa numerada do desenho para ler a pista dela no post-it amarelo.
2. Cole o termo certo nessa casa: clique no termo da lista **Termos** ou arraste-o até a casa.
3. Os desenhos também ajudam: o formato e o lugar de cada peça combinam com o que ela é.
4. Clique numa casa já preenchida para devolver o termo à lista e tentar outro.
5. Quando quiser, clique em **Conferir**: casas certas ficam verdes, erradas ficam vermelhas, e o contador mostra quantos componentes estão certos.
6. Depois do primeiro **Conferir**, aparece a *Cola de estudo*, com a diferença entre ROM, EEPROM, Flash e DMA.
7. **Reiniciar** limpa o tabuleiro e embaralha os termos de novo.

Acertando os 16 componentes, a tela comemora com confete.

> Arrastar e soltar não funciona em telas de toque. No celular, use o clique.

## Palavras e pistas

| Termo | Pista |
|---|---|
| CPU | Componente central que executa as instruções dos programas. |
| ULA | Circuito do processador que realiza somas, comparações e operações lógicas. |
| UC | Parte da CPU que interpreta as instruções e comanda os demais componentes. |
| Registradores | Pequenas posições de armazenamento dentro do processador, as mais rápidas de todas. |
| RAM | Memória temporária e volátil onde ficam os códigos em execução; perde tudo ao desligar. |
| ROM | Memória que já vem pronta de fábrica: guarda as instruções básicas e não muda. |
| EEPROM | Guarda dados mesmo desligada e pode ser reescrita, mudando um dado pequeno de cada vez. |
| Flash | A do pendrive e do cartão de memória: guarda sem energia e apaga por blocos. |
| Cache | Memória pequena e muito rápida que guarda dados usados com frequência, perto do processador. |
| Memória de massa | Guarda arquivos e programas de forma permanente, em grande volume, como o HD. |
| DMA | Um atalho: o dispositivo mexe direto na memória, sem fazer a CPU trabalhar. |
| Address bus | Caminho de sentido único por onde a CPU indica a posição de memória desejada. |
| Data bus | Caminho bidirecional que transporta os valores lidos ou escritos entre os componentes. |
| Microcontrolador | Chip único com processador, memória e portas de entrada e saída, comum em Arduino. |
| Dual core | Processador com dois núcleos que podem executar tarefas ao mesmo tempo. |
| Quad core | Processador com quatro núcleos de execução em um só chip. |

## Estrutura do projeto

```
index.html   página e desenho da placa-mãe
style.css    visual (estilo indie, animações)
script.js    lógica do jogo
README.md    este arquivo
```

## Como rodar localmente

Abra o `index.html` no navegador. Não precisa instalar nada.
