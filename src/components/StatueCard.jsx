import { Link } from "react-router-dom";

function StatuesCard(props) {
  const { statue, afterDelete, modositClick } = props;
  const { person, height, location, price } = statue;
  const statueTorlese = () => {
    fetch(`${process.env.REACT_APP_API_LINK}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    }).then(async (response) => {
      if (response.status !== 204) {
        const data = await response.json();
        alert(data.message);
      }
      afterDelete();
    });
  };

  return (
    <div className="col-md-6">
      <div className="card h-100">
        <div className="card-header">
          <h4 className="card-title">{person}</h4>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>Magasság</th>
                <td>{height}</td>
              </tr>
              <tr>
                <th>Helyszín</th>
                <td>{location}</td>
              </tr>
              <tr>
                <th>Ár</th>
                <td>{price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">
            <div className="row row-cols-2">
                <Link to="create" className="btn btn-warning col" onClick={() => {modositClick(id)}}>Módosítás</Link>
                <button className="btn btn-danger col" onClick={() => {statueTorlese();}}>Törlés</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StatuesCard;
