import { useContext, useEffect, useState } from "react";
import { VocabContextProvider } from "../context/VocabContext";

const QuizComponent = () => {
  const { vocabList, quizStats, setQuizStats, setProgress } =
    useContext(VocabContextProvider);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);

  const word = vocabList[currentIndex];

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === word.toLowerCase();

    setQuizStats((prev) => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));

    setProgress((prev) => prev + 1);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setCurrentIndex((prev) => (prev + 1) % vocabList.length);
      setUserAnswer("");
      setTimeLeft(10);
    }, 1500);
  };

  if (!vocabList.length) {
    return <p className="text-center text-xl">Add words to start quiz.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Quiz Time 🧠</h2>
      <p className="text-lg mb-2">Translate or define the word:</p>
      <h3 className="text-2xl font-bold text-blue-600 mb-4">{word}</h3>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Your answer..."
      />
      <div className="flex justify-between items-center">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
        <p className="text-sm text-gray-600">⏳ Time left: {timeLeft}s</p>
      </div>
      {showResult && (
        <p className="mt-3 text-lg font-medium">
          {userAnswer.trim().toLowerCase() === word.toLowerCase()
            ? "✅ Correct!"
            : `❌ Incorrect! It was '${word}'`}
        </p>
      )}
    </div>
  );
};

export default QuizComponent;
