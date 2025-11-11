import "./App.css";
import Footer from "../Footer";
import Main from "../Main";
import Header from "../Header";

function App() {
  return (
    <div className="page">
      <Header title="We love Pizza" version={0 + 1} />
      <Main />
      <Footer />
    </div>
  );
}


export default App;