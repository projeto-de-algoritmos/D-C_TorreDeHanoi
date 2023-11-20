def Hanoi(n, start, end):
    if n == 1:
        print_move(start, end)
    else:
        other = 6 - (start + end)
        Hanoi(n - 1, start, other)
        print_move(start, end)
        Hanoi(n - 1, other, end)

def print_move(start, end):
    print("Move from {} to {}".format(start, end))