import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface Piece {
  id: number;
  width: number;
}

interface Step {
  from: number;
  to: number;
}

export default function Home() {
  const [firstColumn, setFirstColumn] = useState<Piece[]>([]);
  const [secondColumn, setSecondColumn] = useState<Piece[]>([]);
  const [thirdColumn, setThirdColumn] = useState<Piece[]>([]);

  const numberOfPieces = 3;

  useEffect(() => reset(), []);

  function reset() {
    let width = 20;
    const pieces: Piece[] = [];

    for (let index = 0; index < numberOfPieces; index++) {
      pieces.push({
        id: index,
        width,
      });

      width += 10;
    }

    setFirstColumn(pieces);
    setSecondColumn([]);
    setThirdColumn([]);
  }

  async function solve() {
    const steps: Step[] = [
      {
        from: 1,
        to: 3,
      },
      {
        from: 1,
        to: 2,
      },
      {
        from: 3,
        to: 2,
      },
      {
        from: 1,
        to: 3,
      },
      {
        from: 2,
        to: 1,
      },
      {
        from: 2,
        to: 3,
      },
      {
        from: 1,
        to: 3,
      },
    ];

    for (const step of steps) {
      await change(step);
    }
  }

  async function change({ from, to }: Step) {
    const columns = [firstColumn, secondColumn, thirdColumn];

    const fromColumn = columns[from - 1];
    const toColumn = columns[to - 1];

    if (fromColumn.length === 0) return;

    const piece = fromColumn.shift();
    toColumn.unshift(piece!);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setFirstColumn([...firstColumn]);
    setSecondColumn([...secondColumn]);
    setThirdColumn([...thirdColumn]);
  }

  return (
    <div className={styles.container}>
      {/* columns */}
      <div className={styles.sector}>
        {/*<span className={styles.column}></span>*/}

        {firstColumn.map((piece) => (
          <span
            key={piece.id}
            className={styles.piece}
            style={{ width: `${piece.width}%` }}
          />
        ))}
      </div>

      <div className={styles.sector}>
        {secondColumn.map((piece) => (
          <span
            key={piece.id}
            className={styles.piece}
            style={{ width: `${piece.width}%` }}
          />
        ))}
      </div>

      <div className={styles.sector}>
        {thirdColumn.map((piece) => (
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
  );
}
