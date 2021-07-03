import sys
from os.path import dirname, join

def main(CodeAreaData,inputText,file_dir):
    inputs = inputText.split("\n")
    def input(prompt=None):
        temp = inputs.pop(0)
        return temp

    filename = join(dirname(file_dir), 'file.txt')
    try:
        original_stdout = sys.stdout
        sys.stdout = open(filename,'w',encoding='utf8', errors="ignore")
        exec (CodeAreaData)
        sys.stdout.close()

        sys.stdout = original_stdout

        output = open(filename, "r").read()
        
    except Exception as e:
        sys.stdout = original_stdout
        output = e

    return output


code = sys.argv[1]
inputs = sys.argv[2]
dir = sys.argv[3]

print(main(code,inputs,dir))