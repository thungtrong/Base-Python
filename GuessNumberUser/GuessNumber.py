from numpy import random

number = random.randint(0, 1000)
guess = int(input("Guess number: "))

while guess != number:
    if (guess > number):
        print(f"{guess} is higher than number")    
    else:
        print(f"{guess} is lower than number")
    
    guess = int(input("Guess number: "))

print("Congratulation!!!")