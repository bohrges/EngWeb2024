# TPC1: Mapa das Ruas de Braga

## 2024-02-05

## Autor
- A96357
- Luís Tiago Pereira Borges

## Resumo
    
Neste trabalho, utilizou-se material fornecido pelo docente; ficheiro XML com a informação de 60 ruas de Braga; fotos atuais (associadas a uma determinada vista); e fotos dos espaços desenhados no séc. XVIII das mesmas ruas, para produzir um website onde se pode consultar e navegar nesta estrutura.
    
O site apresenta uma página principal com a linha de ruas ordenada alfabeticamente. 
    
Clicando numa das ruas acede-se à página individual da rua onde se pode consultar toda a informação. Nesta página há também um link para regressar à página principal. 

## Desenvolvimento

### index.py
index.py é o ficheiro para criar a página de index. O processo de criação passou pelo desenvolvimento de um header e um footer simples, aos quais foi acrescentada uma lista de todas as ruas com uma hiperligação para cada uma.

Para a criação da lista, foi formado um dicionário que associava, a cada número de rua, o seu nome, através da iteração dos ficheiros .xml. Por fim, o dicionário foi ordenado de forma alfabética, tal como pedido.


