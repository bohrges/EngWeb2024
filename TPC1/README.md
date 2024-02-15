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

### page.py
page.py é responsável pela criação das páginas individuais e é mais complexo.
Comecei por criar um header e um footer simples, tal como no ficheiro acima. 

Depois, iterei sobre os ficheiros .xml para obter o número e nome de cada rua, de forma a criar o ficheiro HTML, onde inseri o header e o footer.

Seguidamente, para cada ficheiro .xml, procurei pela descrição da rua e por informação sobre a listas de casas, adicionando todo este conteúdo ao ficheiro HTML.

No que toca à parte das imagens, comecei por procurar, nos ficheiros xml, os caminhos para as imagens correspondentes. Para combater casos em que a extensão presente no .xml é diferente da extensão do dataset (no .xml está em maiúsculas e no dataset em minúscula ou o contrário, exemplo da rua 53), começamos por modificar a lista de caminhos para as imagens antifas obtida de forma a que todos os elementos tenham a extensão em minúsculas. Depois, ao procurar a imagem, procura-se pela extensão em minúsculas e, se não for encontrada, procura-se em maiúsculas, tendo a garantia que uma destas será encontrada.

Para as imagens novas, o processo é mais simples, passando apenas pelo uso de uma expressão regular para procurar todas as imagens correspondentes à rua, através do número.

Por fim, juntamos todos os elementos no ficheiro HTML.

