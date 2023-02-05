import json
import webbrowser
from time import sleep

f = open("data.json", "r")
data = json.loads(f.read())

for profile in data[1:]:
    model = profile["Model"]
    print(model)
