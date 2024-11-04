import { useState } from "react";
import "./section_one.css";

export default function SectionOne() {
  const [title, setTitle] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [displayed, setDisplayed] = useState(false);
  const a = "Hello World";
  const b = "from React";

  async function getData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("fetch error " + response.status);
      }

      const data = await response.json();
      setTitle(data[3].title);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("error here: ", error);
      setError("Failed to fetch title");
    }
  }

  function displayResult() {
    getData();
    setDisplayed(!displayed);
  }

  return (
    <>
      <h1>{a}</h1>
      <p>{b}</p>
      <button onClick={displayResult}>click to fetch</button>
      <div>
        {error && <h2 style={{ color: "red" }}>{error}</h2>}{" "}
        {/* Display error if any */}
      </div>
      <div className="fetched_container">
        {title && displayed && (
          <h2>
            Fetched title: <span>{title}</span>
          </h2>
        )}{" "}
        {/* Only show if title exists */}
      </div>
    </>
  );
}
