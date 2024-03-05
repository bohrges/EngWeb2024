import json

def addCommas():
    f1 = open("filmes.json", "r")
    f2 = open("newfilmes.json", "w+")

    lines = f1.readlines()
    for l in lines:
        f2.write(l + ",")

def normalize_id():
    with open('newfilmes.json', 'r') as f:
        data = json.load(f)
    for item in data['filmes']:
        item['id'] = item['_id']['$oid']
        del item['_id']
    with open('newfilmes2.json', 'w+') as f:
        json.dump(data, f, indent=2)


def genres_and_actors():
    with open('newfilmes2.json', 'r') as f:
        data = json.load(f)
    genres_dict = {}
    actors_dict = {}

    for film in data['filmes']:
        film_id = film['id']
        
        for genre in film['genres']:
            if genre not in genres_dict:
                genres_dict[genre] = [film_id]
            else:
                genres_dict[genre].append(film_id)
        
        for actor in film['cast']:
            if actor not in actors_dict:
                actors_dict[actor] = [film_id]
            else:
                actors_dict[actor].append(film_id)

    data['genres'] = [{"id": genre, "list": genres_dict[genre]} for genre in genres_dict]
    data['actors'] = [{"id": actor, "list": actors_dict[actor]} for actor in actors_dict]

    with open('newfilmes3.json', 'w+') as f:
        json.dump(data, f, indent=2)
