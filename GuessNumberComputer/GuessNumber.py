from numpy import random

number = int(input("Number: "))

hi = 1001
low = 0
guess = random.randint(low, hi)


while guess != number:
    if (guess > number):
        print(f"{guess} is higher than number")
        hi = guess
    else:
        print(f"{guess} is lower than number")
        low = guess + 1
    
    guess = random.randint(low, hi)

print(f"Congratulation!!! {guess} is correct")