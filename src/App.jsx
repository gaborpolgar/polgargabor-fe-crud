import { useEffect, useRef, useState } from "react";
import Statue from "./Statue";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [toDos, setStatues] = useState([]);
  const feladat = useRef("");

  const statuesListazasa = () => {
    fetch("https://retoolapi.dev/36TAjw/statues")
      .then((respone) => respone.json())
      .then((statues) => setStatues(statues));
  };
  const statueHozzadasa = () => {
    if (feladat.current.value.length === 0) {
      alert("A szobrok adatainak megadása kötelező");
      return;
    }

    fetch("https://retoolapi.dev/36TAjw/statues").then(async (respone) => {
      if (respone.status === 201) {
        feladat.current.value = "";
        statuesListazasa();
      } else {
        const data = respone.json();
        alert(data.message);
      }
    });
  };

  useEffect(() => {
    statuesListazasa();
  }, []);

  const statueList = [];
  toDos.forEach((statue) => {
    statueList.push(
      <Statue
        key={statue.id}
        feladat={statue}
        onUpdate={() => statuesListazasa()}
      />
    );
  });
  
  console.log("Kirajzol");
  return (
    <main className="container">
      <h1>Szobrok</h1>
      <section>
        <h2>Szobor hozzáadása</h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="szobor_input">
            Szobor:
          </label>
          <input
            className="form-control"
            type="text"
            name="szobor"
            id="szobor_input"
            placeholder="Szobor"
            ref={feladat}
          />
        </div>
        <button className="btn btn-danger" onClick={() => szoborHozzadasa()}>
          Hozzáad
        </button>
      </section>
    </main>
  );
}

export default App;