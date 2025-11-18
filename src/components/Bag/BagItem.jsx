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
      console.error("Error removing item from bag:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  // Fallback values for missing properties
  const displayImage = item?.image || "/placeholder-image.jpg";
  const displayCompany = item?.company || item?.title || "Unknown Brand";
  const displayName = item?.item_name || item?.name || "Product Name";
  const displayCurrentPrice = item?.current_price || item?.price || 0;
  const displayOriginalPrice = item?.original_price ?? displayCurrentPrice;
  const displayDiscount = item?.discount_percentage || 0;
  const displayReturnPeriod = item?.return_period || 30;
  const displayDeliveryDate = item?.delivery_date || "Soon";

  return (
    <article
      className="bag-item-container relative w-full bg-white rounded-lg border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-start md:items-stretch"
      aria-label={displayName}
    >
      {/* Image column */}
      <div className="item-left-part flex-shrink-0 w-full md:w-[140px] lg:w-[160px] bg-gray-50 rounded-md overflow-hidden">
        <div className="w-full h-44 md:h-full flex items-center justify-center bg-white">
          <img
            src={displayImage}
            alt={displayName}
            className="w-full h-full object-contain"
            loading="lazy"
            draggable={false}
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>
      </div>

      {/* Info column */}
      <div className="item-right-part flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-gray-500">{displayCompany}</div>
            <div className="mt-1 text-sm font-medium text-gray-800 truncate">{displayName}</div>
          </div>

          {/* Remove icon on desktop */}
          <div className="hidden md:flex items-start">
            <button
              type="button"
              onClick={handleRemoveItem}
              disabled={isRemoving}
              aria-label={`Remove ${displayName} from bag`}
              className={`remove-from-cart inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:bg-gray-100 transition
                ${isRemoving ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
            >
              <RiDeleteBin5Fill className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Price and meta */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-bold text-gray-900">₹{displayCurrentPrice}</span>

            {displayOriginalPrice !== displayCurrentPrice && (
              <span className="text-sm line-through text-gray-400">₹{displayOriginalPrice}</span>
            )}

            {displayDiscount > 0 && (
              <span className="text-sm text-amber-500 font-medium">({displayDiscount}% OFF)</span>
            )}
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{displayReturnPeriod} days</span>{" "}
            return available
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          Delivery by <span className="text-green-600 font-medium">{displayDeliveryDate}</span>
        </div>

        {/* Mobile remove button */}
        <div className="mt-4 md:hidden">
          <button
            type="button"
            onClick={handleRemoveItem}
            disabled={isRemoving}
            aria-label={`Remove ${displayName} from bag`}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold
              ${isRemoving ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"}`}
          >
            <RiDeleteBin5Fill className="h-5 w-5" />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

export default BagItem;
