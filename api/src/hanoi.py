class Hanoi:
    def __init__(self, n):
        self.n = n
        self.min_moves = 2**n - 1
        self.moves = []

    def solve_recursive(self, n, start, end):
        if n == 1:
            self.stack(start, end)
        else:
            other = 6 - (start + end)
            self.solve_recursive(n - 1, start, other)
            self.stack(start, end)
            self.solve_recursive(n - 1, other, end)

    def stack(self, start, end):
        self.moves.append({"from": start, "to": end})
    
    def solve(self):
        self.solve_recursive(self.n, 1, 3)
        return self.moves