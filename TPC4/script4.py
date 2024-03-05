import json

with open('compositores.json', 'r') as f:
    data = json.load(f)

periodos_dict = {}

for comp in data['compositores']:
    comp_id = comp['id']
    periodo = comp['periodo']
    if periodo not in periodos_dict:
        periodos_dict[periodo] = [comp_id]
    else:
        periodos_dict[periodo].append(comp_id)

# Add genres and actors to the data dictionary
data['periodos'] = [{"id": periodo, "list": periodos_dict[periodo]} for periodo in periodos_dict]


# Write the modified JSON data to a new file
with open('compositores2.json', 'w+') as f:
    json.dump(data, f, indent=2)
