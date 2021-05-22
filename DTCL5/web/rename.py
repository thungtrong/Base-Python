import os

path = "/HK2-2020/BasePython/base-python/DTCL5/web/image"
dir_list = os.listdir(path)
extend = "jpg"

for file in dir_list:
    realpath = os.path.join(path, file)
    
    renamepath = os.path.join(path, f'{file.split(".")[0]}.{extend}')
    print(renamepath)
    os.rename(realpath, renamepath)
    

