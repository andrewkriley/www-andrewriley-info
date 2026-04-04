import { useMemo, useState } from "preact/hooks";

const quotes = [
  { text: "Ship small, learn fast.", by: "Riles" },
  { text: "Homelab is production for curiosity.", by: "Riles" },
  { text: "Automate the boring, document the weird.", by: "Riles" },
];

export default function RandomQuote() {
  const [i, setI] = useState(0);
  const q = useMemo(() => quotes[i % quotes.length], [i]);

  return (
    <div class="rq">
      <p class="rq__text">&ldquo;{q.text}&rdquo;</p>
      <p class="rq__by">— {q.by}</p>
      <button type="button" class="rq__btn" onClick={() => setI((n) => n + 1)}>
        Another line
      </button>
    </div>
  );
}
