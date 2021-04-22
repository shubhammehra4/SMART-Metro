import numpy as np
import pickle
import os
import sklearn

path = os.path.dirname(__file__) + '/RFR_Model.pkl'
with open(path, 'rb') as file:
    model = pickle.load(file)
#print(model)
days = ['FRIDAY', 'MONDAY', 'SATURDAY', 'SUNDAY', 'THURSDAY', 'TUESDAY',
    'WEDNESDAY']

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

# for i in range(len(stations)):
#     ls = list(stations[i].split(","))
#     stations[i] = ' '.join(ls)

# print(stations)

import json
from heapq import heapify, heappush, heappop
from queue import Queue
import sys

from math import radians, cos, sin, asin, sqrt


def distance(lat1, lat2, lon1, lon2):

    # radians which converts from degrees to radians.
    lon1 = radians(lon1)
    lon2 = radians(lon2)
    lat1 = radians(lat1)
    lat2 = radians(lat2)

    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2

    c = 2 * asin(sqrt(a))

    r = 6371

    return (c * r)


path2 = os.path.dirname(__file__) + '/stationJS.json'
with open(path2) as f:
    data = json.load(f)

# with open("stationNames.txt", "w") as f1:
#     # Writing data to a file
#     for j in data:
#         f1.write(j['name'])
#         f1.write('\n')


def djisktras(src, dest, v):
    if (src not in vis or dest not in vis):
        print('Invalid Station Names')
        return
    q = []
    heapify(q)

    #print("src:",src,dest)

    dist = {}
    par = {}
    for i in v:
        dist[i] = 10**18
    dist[src] = 0.0
    heappush(q, [0.0, src])

    while (len(q)):
        p = heappop(q)
        #print('p',p,v[p[1]])

        if (dist[p[1]] != p[0]):
            continue
        #print("dfgdf")

        for i in v[p[1]]:
            #print('src',p[1],i,v[p[1]][i])
            if (dist[p[1]] + v[p[1]][i] < dist[i]):
                dist[i] = dist[p[1]] + v[p[1]][i]
                par[i] = p[1]
                heappush(q, [dist[i], i])

    x = dest
    path = []

    while (x != src):
        path.append(x)
        x = par[x]
    path.append(src)
    path = path[-1::-1]
    #f=open("pathFile.txt","w")
    print('Total distance from ', src, ' to ', dest, ' is:', dist[dest], ' M',end='|')
    print("Path using Djikstra's Algorithm in the weighted graph", end="|")
    for i in path:
        print(i, end=',')
    print(end='|')

def dynamicWeight(v):
    v["Mandi House"]["Rajiv Chowk"] = 100000;
    v["Rajiv Chowk"]["Mandi House"] = 100000;
 


def getShortestPath(src, dest, v, vis):
    if (src not in vis or dest not in vis):
        print('Invalid Station Names',end='|')
        return
    q = Queue()
    q.put(src)
    par = {}
    while (q.empty() == False):
        front = q.get()
        if (front == dest):
            x = dest
            path = []
            while (x != src):
                path.append(x)
                x = par[x]
            path.append(src)
            path = path[-1::-1]
            print('Shortest Path considering unweighted graph:',end='|')
            for x in path:
                print(x, end=',')
            print(end='|')
            return

        for x in v[front]:
            if (not vis[x]):
                q.put(x)
                vis[x] = 1
                par[x] = front


def getAllPossiblePaths(src, dest, v, vis, path):

    if (src == dest):
        path.append(src)

        for x in path:
            print(x, end=',')
        print()
        path.pop()
        return
    if (src not in v):
        print('no such station exists',end='|')
        return
    vis[src] = 1

    path.append(src)
    for x in v[src]:
        if (not vis[x]):
            getAllPossiblePaths(x, dest, v, vis, path)

    path.pop()
    vis[src] = 0


v = {}
vis = {}
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
dest = sys.argv[2]
currTime = sys.argv[3]
currDay = sys.argv[4]
currWeather = sys.argv[5]

for i in stations:
    v[i] = {}
    vis[i] = 0

crowd = {}
for i in stations:
    aa = np.array(
        [dict[i], weekDict[currDay], currTime, weatherDict[currWeather]])
    crowd[i] = model.predict(aa.reshape(-1, 4))

for i in data:
    temp = data[i]
    y = i
    # if (i not in dict):
    #     continue
    lat1 = temp['details']['latitude']
    longi1 = temp['details']['longitude']
    for j in temp['connected']:
        x = j
        # if (x not in dict):
        #     continue
        if (y not in v[x]):
            lat2 = data[j]['details']['latitude']
            longi2 = data[j]['details']['longitude']
            #print(distance(lat1, lat2, longi1, longi2)*600,(crowd[x]+crowd[y]) * 3)
            v[x][y] = distance(lat1, lat2, longi1, longi2) * 600 + (
                (crowd[x] + crowd[y]) * 3)
            v[y][x] = v[x][y]

path = []
# dynamicWeight(v)

getShortestPath(src, dest, v, vis)
# print(end='|')
djisktras(src, dest, v)
vis = dict.fromkeys(vis, 0)
