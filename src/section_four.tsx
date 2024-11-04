import { useState } from "react";
import "./section_four.css";

export default function SectionFour() {
  const [entry, setEntry] = useState("");

  interface ChangeEvent {
    target: {
      value: string;
    };
  }

  function handleChangeInput(event: ChangeEvent) {
    setEntry(event.target.value);
  }

  return (
    <div className="section_four-wrapper">
      <form action="">
        <div className="entry-wrapper">
          <label htmlFor="entry">Type something: </label>
          <input
            type="text"
            name="entry"
            placeholder="type..."
            value={entry}
            onChange={handleChangeInput}
          />
        </div>
      </form>
      <div className="result-typing">
        <p>
          You have typed: <span>{entry}</span>
        </p>
      </div>
    </div>
  );
}
