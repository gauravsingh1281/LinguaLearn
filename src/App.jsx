import { Header } from "./components/Header";
import MainRoutes from "./Routes/MainRoutes";

const App = () => {
  return (
    <>
      <main className="pt-20 pb-10 bg-black min-h-screen">
        <Header />
        <MainRoutes />
      </main>
    </>
  );
};

export default App;
