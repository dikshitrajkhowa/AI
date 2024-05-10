import random

numbers = list(range(1, 9))
numbers.append('B')
random.shuffle(numbers)
print(numbers)
grid =[numbers[i:i+3] for i in range(0, 9, 3)]
print(grid)