import React from "react";
import VocabularyList from "../components/VocabularyList";
import Flashcards from "../components/Flashcards";
import Quiz from "../components/Quiz";
import ProgressTracker from "../components/ProgressTracker";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<VocabularyList />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/quizzes" element={<Quiz />} />
      <Route path="/progress" element={<ProgressTracker />} />
    </Routes>
  );
};

export default MainRoutes;
