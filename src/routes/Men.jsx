import { useSelector } from "react-redux";
import ShowMendata from "../components/pages/NavPage/ShowMendata";

const Men = () => {
  const mendata = useSelector((store) => store.mendata);

  if (!mendata || mendata.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>No  products available.</h2>;
  }

  return (
    <div className="filtered-items-container">
      {mendata.map((item) => {
        if (!item.id) {
          console.error("Item ID is undefined for item:", item);
          return null;
        }

        return <ShowMendata key={item.id} mendata={item} />;
      })}
    </div>
  );
};

export default Men;
