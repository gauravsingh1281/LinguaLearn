import { useContext, useState } from "react";
import axios from "axios";
import { VocabContextProvider } from "../context/VocabContext";

const LANGUAGE_OPTIONS = [
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "ja", label: "Japanese" },
  { code: "zh", label: "Chinese" },
];

const VocabularyList = () => {
  const { vocabList, setVocabList } = useContext(VocabContextProvider);
  const [newWord, setNewWord] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editedWord, setEditedWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newWord.trim()) return;
    setVocabList((prev) => [...prev, newWord.trim()]);
    setNewWord("");
  };

  const openModal = (word) => {
    setSelectedWord(word);
    setSelectedLanguage("hi");
    setTranslation("");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchTranslation = async () => {
    setTranslation("");
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await axios.get("https://api.mymemory.translated.net/get", {
        params: { q: selectedWord, langpair: `en|${selectedLanguage}` },
      });
      const translatedText = res.data?.responseData?.translatedText;
      if (translatedText) setTranslation(translatedText);
      else setErrorMsg("No translation found.");
    } catch (err) {
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    setVocabList((prev) => prev.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedWord(vocabList[index]);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedWord("");
  };

  const saveEdit = (index) => {
    if (!editedWord.trim()) return;
    const updatedList = [...vocabList];
    updatedList[index] = editedWord.trim();
    setVocabList(updatedList);
    cancelEdit();
  };

  return (
    <>
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border"
      >
        <label className="block text-gray-700 font-semibold mb-2">
          Add New Word
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a word"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Word List Section */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md border">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Your Vocabulary
        </h1>
        <ul className="space-y-4">
          {vocabList.map((word, idx) => (
            <li
              key={idx}
              className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center"
            >
              {editIndex === idx ? (
                <div className="flex-1 mr-4 flex gap-2">
                  <input
                    type="text"
                    value={editedWord}
                    onChange={(e) => setEditedWord(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => saveEdit(idx)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-800 font-medium">{word}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(word)}
                      className="text-blue-600 hover:underline"
                    >
                      Translate
                    </button>
                    <button
                      onClick={() => startEdit(idx)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Translation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Translate: <span className="text-blue-600">{selectedWord}</span>
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Language
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchTranslation}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Translate
            </button>

            {loading && <p className="mt-4 text-yellow-600">Translating...</p>}
            {errorMsg && <p className="mt-4 text-red-600">{errorMsg}</p>}
            {translation && (
              <div className="mt-4 bg-gray-100 p-3 rounded-lg text-center text-gray-700">
                <strong>Result:</strong> {translation}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VocabularyList;
