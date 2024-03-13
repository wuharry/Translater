import { useState } from "react";
import { ApiRequest } from "./api/api";
import { TranslateResponse } from "./types/ApiRespone";
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
      target_language: "zh-TW",
      fallback_providers: "",
    };

    const res = (await ApiRequest(
      "post",
      translateUrl,
      data
    )) as TranslateResponse;
    console.log(res);

    setWordList([
      ...wordList,
      {
        untranslateWord: word,
        translatedWord: res?.amazon?.text,
      },
    ]);
    setWord(" ");
  };

  return (
    <>
      <div></div>
      <h1>英文單字翻譯朗讀</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>please input the word</p>
      </div>
      <div className="w-full flex  justify-around">
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
      <div className="">
        <h2 className="text-xl font-bold mb-4">Word Table</h2>
        <table className=" w-full flex justify-center items-center table-auto border border-collapse border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Word</th>
              <th className="border border-black px-4 py-2">中文</th>
              <th>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              </th>
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
