import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

function PeopleForm(props) {
  const { onSuccess, modositandoId = 0, resetModositando } = props;
  const [person, setPerson] = useState("");
  const [height, setHeight] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (modositandoId === 0) {
      formReset();
    } else {
      fetch(`${process.env.REACT_APP_API_LINK}/${modositandoId}`, {
        headers: {
          Accept: "application/json",
        },
      }).then(async (response) => {
        const data = await response.json();
        if (response.status !== 200) {
          alert(data.message);
        } else {
          setPerson(data.person);
          setHeight(data.height);
          setLocation(data.location);
          setPrice(data.price);
        }
      });
    }
  }, [modositandoId]);

  const statueFelvetele = () => {
    const statue = {
      person: person,
      height: height,
      location: location,
      price: price,
    };
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

  const statueModositasa = () => {
    const statue = {
      person: person,
      height: height,
      location: location,
      price: price,
    };
    fetch(`${process.env.REACT_APP_API_LINK}/${modositandoId}`, {
      method: "PUT",
      body: JSON.stringify(person),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.status === 200) {
        onSuccess();
        resetModositando();
        navigate("/");
      } else if (response.status === "404") {
        setErrorMessage("Az oldal nem található");
      } else {
        const jsonData = await response.json();
        const errorMessage = jsonData.message;
        setErrorMessage(errorMessage);
      }
    });
  };

  const formReset = () => {
    setPerson("");
    setHeight("");
    setLocation("");
    setPrice("");
  };

  return (
    <section id="felvetel" className="mt-3">
      {modositandoId === 0 ? (
        <h2>Új szobor felvétele</h2>
      ) : (
        <h2>{person} módosítása</h2>
      )}
      {errorMessage !== "" ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (modositandoId === 0) {
            statueFelvetele();
          } else {
            statueModositasa();
          }
        }}
      >
        <FormInput
          inputId={"personInput"}
          inputLabel={"Személy"}
          value={person}
          setValue={setPerson}
        />
        <FormInput
          inputId={"heightInput"}
          inputLabel={"Magasság"}
          inputType={"magasság"}
          value={height}
          setValue={setHeight}
        />
        <FormInput
          inputId={"locationInput"}
          inputLabel={"Helyszín"}
          value={location}
          setValue={setLocation}
        />
        <FormInput
          inputId={"priceInput"}
          inputLabel={"Ár"}
          inputType={"ár"}
          value={price}
          setValue={setPrice}
        />
        {modositandoId === 0 ? (
          <button className="btn btn-success" type="submit">
            Felvétel
          </button>
        ) : (
          <button className="btn btn-warning" type="submit">
            Módosítás
          </button>
        )}
        <button
          className="btn btn-danger"
          type="reset"
          onClick={() => {
            formReset();
            resetModositando();
          }}
        >
          Űrlap alaphelyzetbe
        </button>
      </form>
    </section>
  );
}

export default StatueForm;
