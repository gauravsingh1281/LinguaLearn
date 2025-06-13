import { createContext, useState, useEffect } from "react";

export const VocabContextProvider = createContext(null);

const VocabContext = ({ children }) => {
  /* ─── helper ─── */
  const getFromLocalStorage = (key, defaultVal) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  /* ─── core vocab states ─── */
  const [vocabList, setVocabList] = useState(() =>
    getFromLocalStorage("vocabList", [])
  );
  const [learnedWords, setLearnedWords] = useState(() =>
    getFromLocalStorage("learnedWords", [])
  );
  const [quizQuestions, setQuizQuestions] = useState(() =>
    getFromLocalStorage("quizQuestions", [])
  );
  const [flashcardIndex, setFlashcardIndex] = useState(() =>
    getFromLocalStorage("flashcardIndex", 0)
  );
  const [theme, setTheme] = useState(() =>
    getFromLocalStorage("theme", "light")
  );
  const [progress, setProgress] = useState(() =>
    getFromLocalStorage("progress", 0)
  );

  /* ─── NEW: quiz score stats ─── */
  const [quizStats, setQuizStats] = useState(() =>
    getFromLocalStorage("quizStats", { total: 0, correct: 0, incorrect: 0 })
  );
  const resetQuizStats = () =>
    setQuizStats({ total: 0, correct: 0, incorrect: 0 });

  /* ─── persist each piece ─── */
  useEffect(() => {
    localStorage.setItem("vocabList", JSON.stringify(vocabList));
  }, [vocabList]);

  useEffect(() => {
    localStorage.setItem("learnedWords", JSON.stringify(learnedWords));
  }, [learnedWords]);

  useEffect(() => {
    localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
  }, [quizQuestions]);

  useEffect(() => {
    localStorage.setItem("flashcardIndex", JSON.stringify(flashcardIndex));
  }, [flashcardIndex]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("quizStats", JSON.stringify(quizStats));
  }, [quizStats]);

  /* ─── provider ─── */
  return (
    <VocabContextProvider.Provider
      value={{
        /* vocabulary + ui */
        vocabList,
        learnedWords,
        quizQuestions,
        flashcardIndex,
        theme,
        progress,

        /* quiz stats */
        quizStats,
        resetQuizStats,

        /* setters */
        setVocabList,
        setLearnedWords,
        setQuizQuestions,
        setFlashcardIndex,
        setTheme,
        setProgress,
        setQuizStats,
      }}
    >
      {children}
    </VocabContextProvider.Provider>
  );
};

export default VocabContext;
