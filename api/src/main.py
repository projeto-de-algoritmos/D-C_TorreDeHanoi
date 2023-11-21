from .hanoi import Hanoi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get("/hanoi/{num_disk}")
def get_hanoi(num_disk: int):
    h = Hanoi(num_disk)
    steps = h.solve()
    return {"min_steps": h.min_moves, "steps": steps}
