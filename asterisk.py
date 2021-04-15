def my_func(a,b,c,d):
    print(a,b,c,d)
print("Normal")
my_func(1, 2, 3, 5)

def my_func1(a,b,c,*,d):
    print(a,b,c,d)
# Bat buoc dung key word
print("\nRequired to use keyword")
my_func1(1, 2, 3, d = 5)

# * can extract list, tuple, set
def my_func2(a,b,c):
    print(a,b,c)
print("\nUse extract * for argument")
lst = [1,2,3]
my_func2(*lst)

# segments
print("\nSegments, ouput allways list")
lst = [1,2,3,4,5,6,7,8,9]
*begin, end = lst
print(begin, end)

begin, *end = lst
print(begin, end)

begin, *middle, end = lst
print(begin, middle, end)

# create list from * extract
print("\nCreate list from * extract")
lst_1 = [1,2,3]
lst_2 = ('a', 'b', 'c')

lst_merge = [*lst_1, *lst_2]
lst_merge[0] = 10
print(lst_merge)
print(lst_1)
# Create dict from ** extract
print("\nCreate dict from ** extract")
dct_1 = {"a": 10, "b": 12, "c": 13}
dct_2 = {"b": 23, "n": 90, "s": 50}
dct_merge = {**dct_1, **dct_2}
print(dct_merge)

# ** can extract dict
print("\nUser extract dict for argument")
dct = {'a': '1', 'b': '1', 'c': '3'}
my_func2(**dct)

print("\nUse *args, **kwargs")
def my_func_3(a,b,c, *args, **kwargs):
    print(f"agrument: a {a}, b {b}, c {c}")
    print("args")
    for arg in args:
        print(arg, end=" ")
    print("\nkwargs")
    for key, arg in kwargs.items():
        print(key, arg)

my_func_3(1,2,3,5,6,7, color="red", line=1.2)