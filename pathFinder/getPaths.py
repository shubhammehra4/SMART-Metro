import json
from heapq import heapify
from queue import Queue
with open('stationJS.json') as f:
    data = json.load(f)

# with open("stationNames.txt", "w") as f1:
#     # Writing data to a file
#     for j in data:
#         f1.write(j['name'])
#         f1.write('\n')

def getShortestPath(src,dest,v,vis):
    if(src not in vis or dest not in vis):
        print('Invalid Station Names')
    q=Queue()
    q.put(src)
    par={}
    while(q.empty()==False):
        front=q.get()
        if(front==dest):
            x=dest
            path=[]
            while(x!=src):
                path.append(x)
                x=par[x]
            path.append(src)
            path=path[-1::-1]
            print('Shortest Path:')
            for x in path:
                print(x,end='->')
            print()
            return




        for x in v[front]:
            if(not vis[x]):
                q.put(x)
                vis[x]=1
                par[x]=front

    


def getAllPossiblePaths(src, dest, v, vis, path):

    if (src == dest):
        path.append(src)

        for x in path:
            print(x,end='->')
        print()
        path.pop()
        return
    if(src not in v):
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
    for j in temp['connected']:
        x = j
        if (y not in v[x]):
            v[x][y] = 1
            v[y][x] = 1

path = []

getShortestPath('Dwarka', 'Akshardham', v, vis)
#print('\n \n\n\n')
vis = dict.fromkeys(vis, 0)
getAllPossiblePaths('Dwarka', 'Akshardham', v, vis, path)
