// Your existing Bag route file (wherever it's located - pages/Bag.jsx or routes/Bag.jsx)
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BagItem from "../components/Bag/BagItem";
import BagSummary from "../components/Bag/BagSummery";

const Bag = () => {
  const bagItems = useSelector((state) => state.bag);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for better UX during rehydration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    console.log('Current bag items:', bagItems);
    
    return () => clearTimeout(timer);
  }, [bagItems]);

  if (isLoading) {
    return (
      <main>
        <div className="bag-page">
          <div className="loading-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            color: '#666'
          }}>
            <p>Loading your bag...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {bagItems.length > 0 ? (
            <>
              <h2 style={{ marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
                Your Bag ({bagItems.length} item{bagItems.length !== 1 ? 's' : ''})
              </h2>
              {bagItems.map((item) => (
                <BagItem key={item.id} item={item} />
              ))}
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              color: '#666'
            }}>
              <h3>Your bag is empty</h3>
              <p>Add some items to get started!</p>
              <button 
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ff4b5c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '20px'
                }}
                onClick={() => window.history.back()}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
        {bagItems.length > 0 && <BagSummary />}
      </div>
    </main>
  );
};

export default Bag;
