import { useState } from "react";
import axios from "axios";
import cleanedData from "./cleaned_json_file.json";

function App() {
  const [inputText, setInputText] = useState("");
  const [suggestedTags, setSuggestedTags] = useState({ add: [], remove: [] });
  const [predictedTags, setPredictedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(inputText);
      const response = await fetch(
        "https://pch2h4bzzj.execute-api.us-east-1.amazonaws.com/first",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputText: inputText }),
        }
      );

      const data = await response.json();
      console.log(data);

      const predictedTags = data.choices[0].message.content.trim().split(", ");

      // Remove escaped characters from inputText
      const unescapedInputText = inputText
        .replace(/\\n/g, "\n")
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"');
      console.log(predictedTags);
      for (let i = 0; i < 1; i++) {
        console.log(cleanedData[i].transcription.toString());
        console.log(unescapedInputText);
        console.log(
          cleanedData[i].transcription.toString() === unescapedInputText
        );
      }
      const existingEntry = cleanedData.find(
        (entry) => entry.transcription === unescapedInputText
      );

      if (existingEntry) {
        const existingTags = existingEntry.tags;
        const tagsToAdd = predictedTags.filter(
          (tag) => !existingTags.includes(tag)
        );
        const tagsToRemove = existingTags.filter(
          (tag) => !predictedTags.includes(tag)
        );

        setSuggestedTags({ add: tagsToAdd, remove: tagsToRemove });
      } else {
        setSuggestedTags({ add: predictedTags, remove: [] });
      }
      setPredictedTags(predictedTags);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text..."
          style={{
            minHeight: "200px",
            padding: "1rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Predict Tags"}
        </button>
      </form>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Predicted Tags: {predictedTags.join(", ")}
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Tags to Add: {suggestedTags.add.join(", ")}
        </p>
        <p style={{ fontSize: "1rem" }}>
          Tags to Remove: {suggestedTags.remove.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default App;
