from os import name
import numpy as np
import pandas as pd

df_champ = pd.read_csv("champ.csv", header=None)
df_trait = pd.read_csv("Traits.csv", header=None)


df_champ[2] = df_champ[2].apply(lambda x: set(x.split('-')))
df_trait[1] = df_trait[1].apply(lambda x: set([int(t) for t in x.split(',')]))

dict_traits = {}

for i in range(len(df_trait[0])):

    name = df_trait[0][i]
    champs = df_trait[1][i]
    ranks = df_trait[2][i]
    
    dict_traits[name] = {
        'ranks': ranks,
        'champs': champs
    }

def get_all_predict_champ(team):
    traits = set()
    for champ in team:
        traits = traits.union(df_champ[2][champ])
    
    champs = set()
    for name in traits:
        champs = champs.union(dict_traits[name]['champs'])
        
    return list(champs)

import random

def random_team(n_champ, team_tmp):
    team = team_tmp.copy()
    n = len(df_champ)
    
    predict = list(range(58))
    
    while len(team) < n_champ:
        
        champ = random.choices(predict)[0]
        if champ not in team:
            team.append(champ)
            predict = get_all_predict_champ(team)
    
    return team

def evaluate_team(team):
    tmp = []
    for i in team:
        tmp.extend(df_champ[2][i])
    
    counts =  np.unique(tmp, return_counts=True)
    ranks = [dict_traits[x]['ranks'] for x in counts[0]]
    
        
    df = pd.DataFrame(zip(counts[0], counts[1], ranks, [None]*len(ranks)))
    
    df.sort_values([1], ascending=False, inplace=True)
    
    return df

def print_team(team):
    str1 = ''
    name_champs = []
    for champ in team:
        str1 += f'{df_champ[0][champ]} '
        name_champs.append(df_champ[0][champ])
    
    return str1

def merge(team, evaluate):
    name_champs = []
    traits = []
    for champ in team:
        name_champs.append(df_champ[0][champ])
        traits.append(' - '.join(df_champ[2][champ]))
    
    n = len(evaluate[0])
    start = len(team)
    team_copy = team.copy()
    
    for i in range(start, n):
        name_champs.append(None)
        traits.append(None)
        team_copy.append(None)
                
    
    evaluate[4] = team_copy
    evaluate[5] = name_champs
    evaluate[6] = traits
    
    return evaluate

while True:
    team = [10, 20, 23, 53, 46, 40]
    team = random_team(8, team)
    e = evaluate_team(team)

    # print_team(team)
    excel = merge(team, e)
    print(excel)
    excel.to_csv("TeamFight.csv", index=False)

    v = input("Refresh?")
    if (v == '0'):
        break

