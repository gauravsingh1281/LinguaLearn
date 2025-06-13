import { useContext } from "react";
import { VocabContextProvider } from "../context/VocabContext";

const ProgressTracker = () => {
  const { quizStats, resetQuizStats } = useContext(VocabContextProvider);

  const accuracy = quizStats.total
    ? ((quizStats.correct / quizStats.total) * 100).toFixed(1)
    : 0;

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📊 Your Progress</h2>
      <div className="space-y-2 text-lg">
        <p>✅ Correct Answers: {quizStats.correct}</p>
        <p>❌ Incorrect Answers: {quizStats.incorrect}</p>
        <p>📋 Total Questions Attempted: {quizStats.total}</p>
        <p>🎯 Accuracy: {accuracy}%</p>
      </div>
      <button
        onClick={resetQuizStats}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset Progress
      </button>
    </div>
  );
};

export default ProgressTracker;
