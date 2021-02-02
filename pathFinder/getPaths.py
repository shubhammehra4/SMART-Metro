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


with open('stationJS.json') as f:
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

    dist = {}
    par = {}
    for i in v:
        dist[i] = 10**18
    dist[src] = 0
    heappush(q, [0.0, src])

    while (len(q)):
        p = heappop(q)
        #print('p',p)

        if (dist[p[1]] != p[0]):
            continue

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
    print('Total distance from ', src, ' to ', dest, ' is:', dist[dest], ' KM')
    print("Path using Djikstra's Algorithm in the weighted graph")
    for i in path:
        print(i, end=',')


def getShortestPath(src, dest, v, vis):
    if (src not in vis or dest not in vis):
        print('Invalid Station Names')
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
            print('Shortest Path considering unweighted graph:')
            for x in path:
                print(x, end=',')
            print()
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
        print('no such station exists')
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

for i in data:
    v[i] = {}
    vis[i] = 0

for i in data:
    temp = data[i]
    y = i
    lat1 = temp['details']['latitude']
    longi1 = temp['details']['longitude']
    for j in temp['connected']:
        x = j
        if (y not in v[x]):
            lat2 = data[j]['details']['latitude']
            longi2 = data[j]['details']['longitude']
            v[x][y] = distance(lat1, lat2, longi1, longi2)
            v[y][x] = v[x][y]

path = []

src=sys.argv[1]
dest=sys.argv[2]

getShortestPath(src, dest, v, vis)
print()
djisktras(src, dest, v)
vis = dict.fromkeys(vis, 0)
#getAllPossiblePaths(src, dest, v, vis, path)
