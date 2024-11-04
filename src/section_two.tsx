import { useState } from "react";

export default function SectionTwo() {
  const [name, setName] = useState("Dima");
  const [message, setMessage] = useState("***");
  const [showSend, setShowSend] = useState(false);

  function clicked() {
    setName(name === "Dima" ? "Dimka" : "Dima");
    setMessage(message === "***" ? "Hello World!" : "***");
  }

  function send() {
    setShowSend(true);

    setTimeout(() => {
      setShowSend(false);
    }, 3000);
  }

  return (
    <>
      <p>{name}</p>
      <p>{message}</p>
      <button onClick={clicked}>click me</button>
      <hr style={{ margin: "37px auto" }} />
      <button onClick={send}>send</button>
      <div
        className="message_container"
        style={{
          height: "50px",
          width: "300px",
          display: "flex",
          margin: "25px auto 15px auto",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        {showSend && (
          <div
            id="send_message"
            style={{
              color: "green",
              border: "1px solid green",
              borderRadius: "3px",
              padding: "10px",
            }}
          >
            Message sent
          </div>
        )}
      </div>
    </>
  );
}
