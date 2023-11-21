import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { api } from "../../api";

interface Piece {
  id: number;
  width: number;
}

interface Step {
  from: number;
  to: number;
}

interface HanoiResponse {
  min_steps: number;
  steps: Step[];
}

export default function Home() {
  const [columns, setColumns] = useState<Piece[][]>([[], [], []]);

  const [counter, setCounter] = useState(0);
  const [stepsNeeded, setStepsNeeded] = useState(0);

  const [solved, setSolved] = useState(false);

  const numberOfPieces = 8;

  useEffect(() => {
    let width = 20;
    const pieces: Piece[] = [];

    for (let index = 0; index < numberOfPieces; index++) {
      pieces.push({ id: index, width });
      width += 10;
    }

    const columns = [pieces, [], []];
    setColumns(columns);
  }, []);

  async function solve() {
    if (solved) {
      return location.reload();
    }

    try {
      const response = await api.get<HanoiResponse>(`hanoi/${numberOfPieces}`);
      setStepsNeeded(response.data.min_steps);

      for (const { from, to } of response.data.steps) {
        await new Promise((resolve) => setTimeout(resolve, 250));

        const copyColumns = columns.map((v) => v);

        const fromColumn = copyColumns[from - 1];
        const toColumn = copyColumns[to - 1];

        if (fromColumn.length === 0) return;

        const piece = fromColumn.shift();
        toColumn.unshift(piece!);

        setColumns(copyColumns);
        setCounter((prev) => prev + 1);
      }

      setSolved(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={styles.container}>
        {/* columns */}
        <div className={styles.sector}>
          {columns[0].map((piece) => (
            <span
              key={piece.id}
              className={styles.piece}
              style={{ width: `${piece.width}%` }}
            />
          ))}
        </div>

        <div className={styles.sector}>
          {columns[1].map((piece) => (
            <span
              key={piece.id}
              className={styles.piece}
              style={{ width: `${piece.width}%` }}
            />
          ))}
        </div>

        <div className={styles.sector}>
          {columns[2].map((piece) => (
            <span
              key={piece.id}
              className={styles.piece}
              style={{ width: `${piece.width}%` }}
            />
          ))}
        </div>

        {/* base */}
        <div className={styles.base} onClick={solve} />
      </div>

      <div className={styles.counter}>
        <p>Passos necessários: {stepsNeeded}</p>
        <p>N° de passos: {counter}</p>
      </div>
    </>
  );
}
