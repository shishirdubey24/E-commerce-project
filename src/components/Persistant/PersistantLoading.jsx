// components/LoadingSpinner.jsx

const PersistLoading = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    backgroundColor: '#f5f5f5',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #ff4b5c',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px',
    }}></div>
    <h2>Loading Myntra...</h2>
    <p>Restoring your data...</p>
  </div>
);

export default PersistLoading;
