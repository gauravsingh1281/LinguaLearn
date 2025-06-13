import { useContext, useEffect, useState } from "react";
import { VocabContextProvider } from "../context/VocabContext";
import API_Instance from "../apiInstance";

export default function Flashcards() {
  const { vocabList } = useContext(VocabContextProvider);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [definition, setDefinition] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState("hi"); // Hindi default
  const [translation, setTranslation] = useState("");

  const currentWord = vocabList[currentIndex] || "";

  // Fetch definition from dictionary API
  useEffect(() => {
    if (!currentWord) return;

    const fetchDefinition = async () => {
      try {
        const response = await API_Instance.get(
          `/api/v2/entries/en/${currentWord}`
        );
        const def =
          response.data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
        setDefinition(def || "Definition not found.");
      } catch (error) {
        setDefinition("Definition not found.");
      }
    };

    fetchDefinition();
  }, [currentWord]);

  // Fake translation function (replace with real API later)
  const handleTranslate = () => {
    if (currentWord) {
      setTranslation(`(${language}) Translation of "${currentWord}"`); // placeholder
    }
  };

  const nextWord = () => {
    if (currentIndex < vocabList.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevWord = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Flashcard
      </h2>

      {currentWord ? (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-600">
              {currentWord}
            </h3>
            <p className="text-gray-700 mt-2">{definition}</p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevWord}
              disabled={currentIndex === 0}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Translate
            </button>
            <button
              onClick={nextWord}
              disabled={currentIndex === vocabList.length - 1}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">
          No words available. Please add some words first.
        </p>
      )}

      {/* Translation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">
              Translate "{currentWord}"
            </h3>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="hi">Hindi</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>

            <button
              onClick={handleTranslate}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 mb-2"
            >
              Translate
            </button>

            {translation && (
              <p className="text-gray-700 bg-gray-100 p-2 rounded text-center mt-2">
                {translation}
              </p>
            )}

            <button
              onClick={() => {
                setIsModalOpen(false);
                setTranslation("");
              }}
              className="mt-4 w-full text-sm text-gray-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
