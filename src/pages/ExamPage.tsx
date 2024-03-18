import { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { translateList } from "../types";
import { SpeakerWave } from "../icons";
interface TestProps {}

export const ExamPage: FunctionComponent<TestProps> = () => {
  const location = useLocation();
  const [wordList, setWordList] = useState<translateList[]>([]);
  const [count, setCount] = useState(0);
  const [word, setWord] = useState<string>("");
  const [translateWord, setTranslateWord] = useState<string>("");
  const [englishError, setEnglishError] = useState<boolean>(false);
  const [chineseError, setChineseError] = useState<boolean>(false);
  const data = location.state;

  useEffect(() => {
    // console.log("passData", data);
    if (Array.isArray(data)) {
      const shuffledList = shuffleWordList(data);
      setWordList(shuffledList);
    }
  }, [data]);

  const shuffleWordList = (data: translateList[]) => {
    const shuffledList = [...data];
    for (let index = shuffledList.length - 1; index > 0; index--) {
      let swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffledList[index], shuffledList[swapIndex]] = [
        shuffledList[swapIndex],
        shuffledList[index],
      ];
    }
    return shuffledList;
  };

  const speak = (utter: SpeechSynthesisUtterance) => {
    const synth = window.speechSynthesis;

    synth.speak(utter);
  };

  const readWordHandler = () => {
    const utter = new SpeechSynthesisUtterance();
    if (count < wordList.length) {
      const word = wordList[count];
      utter.text = word.untranslateWord;
      speak(utter);
      console.log("word", word);
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };

  const checkAnswer = () => {
    console.log("答案", wordList[count - 1].translatedWord);
    console.log("答案", wordList[count - 1].untranslateWord);
    console.log("我輸入的", translateWord);
    console.log("我輸入的", word);

    // 確認答案是否正確
    const englishAnswerCorrect = wordList[count - 1].translatedWord == word;
    const chineseAnswerCorrect =
      wordList[count - 1].untranslateWord == translateWord;

    // 更新錯誤提示狀態
    setEnglishError(!englishAnswerCorrect);
    setChineseError(!chineseAnswerCorrect);

    // 如果答案正確，播放提示音並清空答案
    if (englishAnswerCorrect && chineseAnswerCorrect) {
      const audio = new Audio("/public/ding.mp3");
      audio.play();
      setTranslateWord("");
      setWord("");
      setCount(count + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };
  return (
    <div>
      <h2>wordList Exam </h2>
      <p>根據以下的發音,寫出中文跟英文單字</p>
      <div className="m-8">
        <button
          onClick={() => {
            readWordHandler();
          }}
        >
          <SpeakerWave />
        </button>
      </div>

      <div>
        <label className="p-4 m-4">
          English:
          <input
            type="text"
            className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none ${
              englishError ? "border-red-500" : ""
            }`}
            placeholder="請輸入中文單字"
            value={translateWord}
            onChange={(e) => {
              setTranslateWord(e.target.value);
              setEnglishError(false); // 清除錯誤提示
            }}
            onKeyDown={handleKeyDown}
          />
          {englishError && <span className="text-red-500">英文錯誤</span>}
        </label>

        <label className="p-4 m-4">
          中文:
          <input
            type="text"
            className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none ${
              chineseError ? "border-red-500" : ""
            }`}
            placeholder="請輸入中文單字"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              setChineseError(false); // 清除錯誤提示
            }}
            onKeyDown={handleKeyDown}
          />
          {chineseError && <span className="text-red-500">中文錯誤</span>}
        </label>
      </div>

      <ul>
        {wordList.map((item, index) => (
          <li key={index}>{item.translatedWord}</li>
        ))}
      </ul>
    </div>
  );
};
