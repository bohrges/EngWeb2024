import os
import xml.etree.ElementTree as ET

# Criar um dicionário: número da rua -> nome da rua
ruas = os.listdir('texto')
ruas_dict = {} #dict: número -> nome
for r in ruas:
    tree = ET.parse('texto/'+ r)
    root = tree.getroot()
    for meta in root.findall('.//meta'):
        numero = meta.find('número').text
        nome = meta.find('nome').text
        if nome[0] == " ": # Caso em que o primeiro char do nome da rua é vazio
            nome = nome[1:]
        ruas_dict[numero]=nome

# Ordenar o dicionário alfabeticamente
ruas_dict_sorted = sorted(ruas_dict.items(), key=lambda x:x[1]) 

preHTML = """
<!DOCTYPE html>
<html>

<head>
    <title>Ruas de Braga</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <meta charset="utf-8"/>
</head>

<body>
    <div class="w3-card-4">
        <header class="w3-container w3-green">
            <h3>Ruas de Braga</h3>
        </header>
        <div class="w3-container">
            <ul class="w3-ul w3-card-4" style="width:50%">
"""

posHTML = """
            </ul>
        </div>
        <footer class="w3-container w3-green">
            <h5>Generated by EMDApp::EngWeb2024::A96357</h5>
        </footer>
    </div>
</body>

</html>
"""

conteudo = ""

# Adicionar cada uma das ruas
for r in ruas_dict_sorted:
    conteudo += f"""
                <li>
                    <a href="{r[0]}.html">
                    {r[1]}</a>
                </li>
                """

pagHTML = preHTML + conteudo + posHTML

# Criar o ficheiro HTML
f = open('html/index.html', 'w+', encoding='utf-8')
f.write(pagHTML)
f.close

print("Index Created")
