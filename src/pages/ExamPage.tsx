import { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { translateList } from "../types";

interface TestProps {}

export const ExamPage: FunctionComponent<TestProps> = () => {
  const location = useLocation();
  const [wordList, setWordList] = useState<translateList[]>([]);
  const data = location.state;
  useEffect(() => {
    console.log("passData", data);
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

  return (
    <div>
      <h2>Shuffled Word List</h2>
      <ul>
        {wordList.map((item, index) => (
          <li key={index}>{item.translatedWord}</li>
        ))}
      </ul>
    </div>
  );
};
