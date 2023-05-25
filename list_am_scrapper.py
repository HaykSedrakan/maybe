from bs4 import BeautifulSoup

# Head to List.am Select a spicific catagory
# Locate the "Regular ads div" which is <div class="gl"> or <div class="gl"> that contains <a> tags with card data
# Copy the div elemen with Copy > Copy Element and past into the html_doc


html_doc = """"""

# Screapper for cars catagory
soup = BeautifulSoup(html_doc, 'html.parser')
for i in soup.findAll('a'):
    if i.find('div', class_='p'):
        try:
            image = f"https:{i.img['data-original']}"
            price = i.find('div', class_='p').text
            if "֏" in price:
                price_currency = 'AMD'
                price = price.replace(',', '')
                price = price.replace('֏', '')
            elif "$" in price:
                price_currency = 'USD'
                price = price.replace(',', '')
                price = price.replace('$', '')
            else:
                continue
            label = i.find('div', class_='l').text.replace(',', '')
            discription_location_data = i.find('div', class_='at').text.replace(',', '')
            location = discription_location_data.split(' ')[0].replace(',', '')
            
            discription = discription_location_data.split(' ')
            del discription[0]
            discription = ' '.join(discription).replace('y.', 'Year')
            if location == 'On':
                location = 'On The Way'
                discription = discription.replace('the way', '')
            elif location == 'Nor':
                location = 'Nor Nork'
                discription = discription.replace('Nork', '')
            catagory = 'cars'
            print(f'{label},{discription},{price},{price_currency},{location},{catagory},{image}')
        except:
            continue

# Scrapper for electronics catagory
soup = BeautifulSoup(html_doc, 'html.parser')
for i in soup.findAll('a'):
    if i.find('div', class_='p'):
        try:
            image = f"https:{i.img['data-original']}"
            price = i.find('div', class_='p').text
            if "֏" in price:
                price_currency = 'AMD'
                price = price.replace(',', '')
                price = price.replace('֏', '')
            elif "$" in price:
                price_currency = 'USD'
                price = price.replace(',', '')
                price = price.replace('$', '')
            else:
                continue
            label = i.find_all('div')[1].text.replace(',', ' ')
            discription = 'Electronics For Sale Please Call For Details'
            location = i.find('div', class_='at').text.replace(',', '')
            
            catagory = 'electronics'
            print(f'{label},{discription},{price},{price_currency},{location},{catagory},{image}')
        except:
            continue

# Scrapper for the Home Accessories Catagory
soup = BeautifulSoup(html_doc, 'html.parser')
for i in soup.findAll('a'):
    if i.find('div', class_='p'):
        try:
            image = f"https:{i.img['data-original']}"
            price = i.find('div', class_='p').text
            if "֏" in price:
                price_currency = 'AMD'
                price = price.replace(',', '')
                price = price.replace('֏', '')
            elif "$" in price:
                price_currency = 'USD'
                price = price.replace(',', '')
                price = price.replace('$', '')
            else:
                continue
            label = i.find_all('div')[1].text.replace(',', ' ')
            discription = i.find('div', class_='c').text.replace('›', '')
            location = i.find('div', class_='at').text.replace(',', '')
            
            catagory = 'home accessories'
            print(f'{label},{discription},{price},{price_currency},{location},{catagory},{image}')
        except:
            continue

# Scrapper for the Real-State catagory
soup = BeautifulSoup(html_doc, 'html.parser')
for i in soup.findAll('a'):
    if i.find('div', class_='p'):
        try:
            image = f"https:{i.img['data-original']}"
            price = i.find('div', class_='p').text
            if "֏" in price:
                price_currency = 'AMD'
                price = price.replace(',', '')
                price = price.replace('֏', '')
            elif "$" in price:
                price_currency = 'USD'
                price = price.replace(',', '')
                price = price.replace('$', '')
            else:
                continue
            label = i.find('div', class_='l').text.replace(',', '')
            discription_location_data = i.find('div', class_='at').text.replace(',', '')
            location = discription_location_data.split(' ')[0].replace(',', '')
            discription = discription_location_data.split(' ')
            del discription[0]
            discription = ' '.join(discription).replace('y.', 'Year')
            if location == 'On':
                location = 'On The Way'
                discription = discription.replace('the way', '')
            elif location == 'Nor':
                location = 'Nor Nork'
                discription = discription.replace('Nork', '')
            catagory = 'real-state'
            print(f'{label},{discription},{price},{price_currency},{location},{catagory},{image}')
        except:
            continue