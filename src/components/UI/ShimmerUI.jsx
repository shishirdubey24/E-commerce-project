import { Shimmer } from "react-shimmer";

const ShimmerUI = () => {
  const shimmerContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "10px",
  };
  const shimmerBoxStyle = {
    flex: "1 1 calc(25% - 20px)", 
    margin: "10px",
    height: "250px",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  };

  return (
    <div style={shimmerContainerStyle}>
      {[...Array(120)].map((_, index) => (
        <div key={index} style={shimmerBoxStyle}>
          <Shimmer width={250} height={250} />
        </div>
      ))}
    </div>
  );
};

export default ShimmerUI;
