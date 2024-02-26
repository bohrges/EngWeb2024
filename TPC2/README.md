# TPC1: Mapa das Ruas de Braga

## 2024-02-05

## Autor
- A96357
- Luís Tiago Pereira Borges

## Resumo
    
Neste trabalho, utilizou-se um dataset em json sobre as cidades de Portugal para criar:
- Um index com todas as cidades
- Uma página individual para cada cidade, com a informação necessária
- Um serviço em node que faz a conexão entre o input do utilizador no url e a página a apresentar

## Desenvolvimento

### geraIndex.py
*geraIndex.py* é usado para criar o ficheiro index.html

### geraPagInd.py
*geraPagInd.py* é usado para criar as páginas individuais das cidades, apresentando a informação relevante e as suas ligações

### servidor_ficheiro.js
*servidor_ficheiro.js* é usado para criar o servidor. Através de uma cadeia de *if* e *else if*, identifica o input no url e devolve a página correspondente.