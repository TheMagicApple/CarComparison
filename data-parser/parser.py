from bs4 import BeautifulSoup
import requests
import re
import json


def get_soup():
    html_request = requests.get("https://insideevs.com/reviews/344001/compare-evs/")
    html_text = html_request.text
    soup = BeautifulSoup(html_text, "lxml");
    return soup


def get_raw_price_data(soup):
    table = soup.find_all("table")[0]
    table_rows = [[td.text for td in row.find_all("td")] for row in table.find_all("tr")]
    return table_rows


def get_raw_battery_data(soup):
    table = soup.find_all("table")[1]
    table_rows = [[td.text for td in row.find_all("td")] for row in table.find_all("tr")]
    return table_rows


def get_data(soup):
    raw_price_data = get_raw_price_data(soup)
    raw_battery_data = get_raw_battery_data(soup)

    data = []

    length = min(len(raw_price_data), len(raw_battery_data))
    for i in range(1, length):
        price_data = raw_price_data[i]
        battery_data = raw_battery_data[i]

        model = price_data[0]
        model = model[5:]
        model = model.replace("\"", "")
        price = price_data[4]
        price = price.replace("*", "")
        price = price.replace("$", "")
        price = price.replace(",", "")

        drive = battery_data[1]
        drive = drive.replace("*", "")
        capacity = battery_data[2]
        capacity = capacity.replace("*", "")
        rng = battery_data[3]
        rng = rng.replace("*", "")
        rng = rng.replace("mi", "")
        rng = re.sub("\([0-9]+ km\)", "", rng)
        if (rng == "" or rng == "\xa0"):
            rng = "-1"
        zero_to_sixty = battery_data[4]
        zero_to_sixty = zero_to_sixty.replace("*", "")
        if (zero_to_sixty == "" or zero_to_sixty == "\xa0"):
            zero_to_sixty = "-1"
        max_speed = battery_data[5]
        max_speed = max_speed.replace("*", "")
        max_speed = max_speed.replace("mph", "")
        max_speed = re.sub("\([0-9]+ km/h\)", "", max_speed);
        if (max_speed == "" or max_speed == "\xa0"):
            max_speed = "-1"

        car_profile = {"Model": model,
                       "Price": float(price),
                       "Drive": drive,
                       "Capacity": float(capacity),
                       "Range": float(rng),
                       "0to60": float(zero_to_sixty),
                       "MaxSpeed": float(max_speed)}

        data.append(car_profile)

    return data
    


def main():
    soup = get_soup()
    data = get_data(soup)
    with open("data.json", "w") as f:
        json.dump(data, f)


if (__name__ == "__main__"):
    main()
