import numpy as np
import pickle
import sys
import os
import sklearn

path = os.path.dirname(__file__) + '/RFR_Model.pkl'
with open(path, 'rb') as file:
    model = pickle.load(file)
#print(model)
days = [
    'FRIDAY', 'MONDAY', 'SATURDAY', 'SUNDAY', 'THURSDAY', 'TUESDAY',
    'WEDNESDAY'
]

weather = ['Cool', 'Rainy', 'Sunny', 'ThunderStorm']
arr = np.array([1, 6, 10, 2])
res = model.predict(arr.reshape(-1, 4))
stations = [
    'AIIMS', 'Adarsh Nagar', 'Akshardham', 'Anand Vihar', 'Arjan Garh',
    'Ashok Park Main', 'Azadpur', 'Badarpur Border', 'Botanical Garden',
    'Central Secretariat', 'Chandni Chowk', 'Chawri Bazar', 'Chhatarpur',
    'Civil Lines', 'Dwarka', 'GTB Nagar', 'Ghitorni', 'Green Park',
    'Guru Dronacharya', 'HUDA City Centre', 'Haiderpur', 'Hauz Khas',
    'IFFCO Chowk', 'IITD', 'INA', 'Inderlok', 'Jahangirpuri', 'Janakpuri West',
    'Jor Bagh', 'Kalkaji Mandir', 'Karkarduma', 'Kashmere Gate', 'Kaushambi',
    'Kirti Nagar', 'Lajpat Nagar', 'Laxmi Nagar', 'Lok Kalyan Marg', 'MG Road',
    'Mandi House', 'Mayur Vihar -I', 'Mayur Vihar Extension', 'Model Town',
    'Munirka', 'Netaji Subhash Place', 'New Ashok Nagar', 'New Delhi',
    'Nirman Vihar', 'Noida City Centre', 'Noida Golf Course',
    'Noida Sector 15', 'Noida Sector 16', 'Noida Sector 18', 'Patel Chowk',
    'Preet Vihar', 'Qutab Minar', 'Rajiv Chowk', 'Rithala',
    'Rohini Sector 18-19', 'Saket', 'Samaypur Badli', 'Shahdara',
    'Sikandarpur', 'Sultanpur', 'Surajmal Stadium', 'Terminal 1 IGI Airport',
    'Udyog Bhawan', 'Vaishali', 'Vidhan Sabha', 'Vishwa Vidyalaya', 'Welcome',
    'Yamuna Bank'
]

dict = {}
for i in range(len(stations)):
    dict[stations[i]] = i

weekDict = {}

for i in range(len(days)):
    weekDict[days[i]] = i

weatherDict = {}
for i in range(len(weather)):
    weatherDict[weather[i]] = i

src = sys.argv[1]
currTime = sys.argv[2]
currDay = sys.argv[3]
currWeather = sys.argv[4]

aa = np.array([dict[src], weekDict[currDay], currTime, weatherDict[currWeather]])
crowd = model.predict(aa.reshape(-1, 4))

print(crowd)