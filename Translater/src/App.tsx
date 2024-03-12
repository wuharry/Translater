import { useState } from "react";
import { ApiRequest } from "./api/api";

import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);
  interface translateList {
    untranslateWord: string;
    translatedWord: string;
  }
  const [wordList, setWordList] = useState<translateList[]>([]);
  const [word, setWord] = useState<string>("");

  const translateAndDisplayListToTable = async (word: string) => {
    const translateUrl =
      "https://api.edenai.run/v2/translation/automatic_translation";
    const data = {
      providers: "amazon,google,ibm,microsoft",
      text: word,
      source_language: "en",
      target_language: "zh",
      fallback_providers: "",
    };

    const res = await ApiRequest("post", translateUrl, data);
    console.log();

    setWordList([
      ...wordList,
      {
        untranslateWord: word,
        translatedWord: res.data.amazon.text,
      },
    ]);
    setWord(" ");
  };

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="">
        <label>
          Word:
          <input
            type="text"
            placeholder="請輸入單字"
            onChange={(e) => {
              setWord(e.target.value);
            }}
            value={word}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </label>
        <button
          onClick={() => {
            translateAndDisplayListToTable(word);
          }}
        >
          Add
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Word Table</h2>
        <table className="table-auto border border-collapse border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Word</th>
              <th className="border border-black px-4 py-2">中文</th>
            </tr>
          </thead>
          <tbody>
            {wordList.map((word) => (
              <tr key={word.untranslateWord}>
                <td className="border border-black px-4 py-2">
                  {word.untranslateWord}
                </td>
                <td className="border border-black px-4 py-2">
                  {word.translatedWord}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
