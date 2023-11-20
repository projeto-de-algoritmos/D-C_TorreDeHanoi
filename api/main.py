from hanoi import Hanoi
from fastapi import FastAPI

app = FastAPI()

@app.get("/hanoi/{num_disk}")
def get_hanoi(num_disk: int):
    h = Hanoi(num_disk)
    steps = h.solve()
    return {"min_steps": h.min_moves, "steps": steps}
