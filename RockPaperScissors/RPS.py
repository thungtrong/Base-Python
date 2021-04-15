from numpy import random

def isWin(user, computer):
    print(f"user = {user}, computer = {computer}")
    global rps
    if (user == computer):
        return False, None
    elif (rps[user] == computer):
        return True, 'Computer'
    elif (rps[computer] == user):
        return True, 'User'
    
rps = {
    'r': 'p',
    'p': 's',
    's': 'r'
}


computer = random.choice(list(rps.keys()))
user = input('''
    r: Rock
    p: Paper
    s: Scissors
''')


result, winner = isWin(user, computer)
while result == False:
    computer = random.choice(list(rps.keys()))
    user = input('''
        r: Rock
        p: Paper
        s: Scissors
    ''')
    result, winner = isWin(user, computer)

print(f"winner = {winner}")

