import React, { useEffect, useState } from "react";
import { ApiRequest } from "./api/api";
import { TranslateResponse } from "./types/ApiRespone";
import { SpeakerWave, Recycle } from "./icons";
import "./App.css";

import { fakeWordList } from "./fakeData/wordList";

function App() {
  const [count, setCount] = useState<number>(0);
  interface translateList {
    untranslateWord: string;
    translatedWord: string;
  }
  const [wordList, setWordList] = useState<translateList[]>([]);
  const [word, setWord] = useState<string>("");

  //TODO:假資料
  useEffect(() => {
    setWordList(fakeWordList);
  }, []);

  const translateAndDisplayListToTable = async (word: string) => {
    // const translateUrl =
    //   "https://api.edenai.run/v2/translation/automatic_translation";
    // const data = {
    //   providers: "amazon,google,ibm,microsoft",
    //   text: word,
    //   source_language: "en",
    //   target_language: "zh-TW",
    //   fallback_providers: "",
    // };

    // const res = (await ApiRequest(
    //   "post",
    //   translateUrl,
    //   data
    // )) as TranslateResponse;
    // console.log(res);

    // setWordList([
    //   ...wordList,
    //   {
    //     untranslateWord: word,
    //     translatedWord: res?.amazon?.text,
    //   },
    // ]);

    setWord(" ");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setWordList([
        ...wordList,
        {
          untranslateWord: word,
          translatedWord: "",
        },
      ]);
    }
  };

  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center">
      <h1>英文單字翻譯朗讀</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>please input the word</p>
      </div>
      <div className="w-full flex justify-between ">
        <label className="p-4">
          Word:
          <input
            type="text"
            placeholder="請輸入單字"
            onChange={(e) => {
              setWord(e.target.value);
            }}
            value={word}
            onKeyDown={handleKeyDown}
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
      <div className="flex w-full justify-center items-center flex-col overflow-x-auto shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Word Table</h2>
        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Word</th>
              <th className="px-6 py-3">中文</th>
              <th className="px-6 py-3">發音</th>
            </tr>
          </thead>
          <tbody>
            {wordList.map((word) => (
              <tr
                key={word.untranslateWord}
                className=" border-b bg-gray-800 border-gray-700"
              >
                <td className="px-6 py-4">{word.untranslateWord}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row items-center justify-around">
                    {word.translatedWord}
                    <button>
                      <Recycle />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <SpeakerWave />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
