// components/Bag/BagItem.jsx
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { bagActions } from "../../store/bagSlice";
import { useState } from "react";

const BagItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveItem = async () => {
    try {
      setIsRemoving(true);
      dispatch(bagActions.removeFromBag(item.id));
      console.log(`Removed item ${item.id} from bag`);
    } catch (error) {
      console.error('Error removing item from bag:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  // Fallback values for missing properties
  const displayImage = item.image || '/placeholder-image.jpg';
  const displayCompany = item.company || item.title || 'Unknown Brand';
  const displayName = item.item_name || item.name || 'Product Name';
  const displayCurrentPrice = item.current_price || item.price || 0;
  const displayOriginalPrice = item.original_price || displayCurrentPrice;
  const displayDiscount = item.discount_percentage || 0;
  const displayReturnPeriod = item.return_period || 30;
  const displayDeliveryDate = item.delivery_date || 'Soon';

  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img 
          className="bag-item-img" 
          src={displayImage}
          alt={displayName}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>
      <div className="item-right-part">
        <div className="company">{displayCompany}</div>
        <div className="item-name">{displayName}</div>
        <div className="price-container">
          <span className="current-price">₹{displayCurrentPrice}</span>
          {displayOriginalPrice !== displayCurrentPrice && (
            <span className="original-price">₹{displayOriginalPrice}</span>
          )}
          {displayDiscount > 0 && (
            <span className="discount-percentage">
              ({displayDiscount}% OFF)
            </span>
          )}
        </div>
        <div className="return-period">
          <span className="return-period-days">{displayReturnPeriod} days</span>{" "}
          return available
        </div>
        <div className="delivery-details">
          Delivery by{" "}
          <span className="delivery-details-days">{displayDeliveryDate}</span>
        </div>
      </div>

      <div 
        className={`remove-from-cart ${isRemoving ? 'removing' : ''}`} 
        onClick={handleRemoveItem}
        style={{ 
          opacity: isRemoving ? 0.5 : 1,
          cursor: isRemoving ? 'not-allowed' : 'pointer'
        }}
      >
        <RiDeleteBin5Fill />
      </div>
    </div>
  );
};

export default BagItem;
