import { useEffect } from "react";
import StatueCard from "./StatueCard";

function StutesList(props) {
  const { statues, onMount, modositClick } = props;
  useEffect(() => {
    onMount();
  }, []);
  const cardList = [];
  statues.forEach((statue) => {
    cardList.push(<StatuesCard key={statue.id} statue={statue} afterDelete={onMount} modositClick={modositClick} />);
  });
  return (
    <section>
      <h2>Szobrok listája</h2>
      <div className="row gy-4">{cardList}</div>
    </section>
  );
}

export default StatuesList;
