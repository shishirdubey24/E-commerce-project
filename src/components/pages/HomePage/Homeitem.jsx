/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

/**
 * Tailwind-based responsive product card.
 * Replaces old CSS classes with Tailwind utility classes so the card is
 * responsive (mobile -> stacked, desktop -> compact card).
 *
 * - Image keeps aspect ratio and uses object-cover on wide images.
 * - Company / category / name uses truncation to avoid overflow.
 * - Price area lays out nicely on small screens and inline on larger screens.
 * - Add/Remove buttons are full-width on mobile and compact on desktop.
 */

const Homeitem = ({ item, isInBag }) => {
  const dispatch = useDispatch();

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  if (!item) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-sm text-center text-sm text-gray-600">
        No item available
      </div>
    );
  }

  const {
    image,
    rating,
    company,
    category,
    item_name,
    current_price,
    original_price,
    discount_percentage,
  } = item;

  return (
    <article
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-1
                 flex flex-col md:flex-col items-stretch text-left"
      role="article"
      aria-label={item_name || "product"}
    >
      {/* Image */}
      <div className="w-full relative">
        <div className="w-full h-0 pb-[133%] md:pb-[125%] lg:pb-[100%] relative overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={item_name || "product image"}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain md:object-cover"
          />
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 px-2 py-1 rounded-md shadow-sm">
          {rating?.stars ?? "N/A"} ⭐
          <span className="ml-2 text-[11px] text-gray-600">({rating?.count ?? 0})</span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-800 truncate">{company}</div>
            <div className="text-xs text-gray-500 truncate">{category}</div>
            <div className="mt-2 text-sm text-gray-700 font-medium truncate">{item_name}</div>
          </div>
        </div>

        {/* Price block */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-base md:text-lg font-bold text-gray-900">₹{current_price}</span>
            {original_price ? (
              <span className="text-xs md:text-sm line-through text-gray-400">₹{original_price}</span>
            ) : null}
            {discount_percentage ? (
              <span className="text-xs md:text-sm text-amber-500 font-medium">({discount_percentage}% OFF)</span>
            ) : null}
          </div>

          {/* Buttons on desktop are inline; on mobile they become full width below (see second button) */}
          <div className="hidden md:flex items-center gap-2">
            {isInBag ? (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
                aria-label={`Remove ${item_name} from bag`}
              >
                <AiFillDelete className="text-lg" />
                Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToBag}
                className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition"
                aria-label={`Add ${item_name} to bag`}
              >
                <GrAddCircle className="text-lg" />
                Add to bag
              </button>
            )}
          </div>
        </div>

        {/* Mobile full-width button */}
        <div className="mt-4 md:hidden">
          {isInBag ? (
            <button
              type="button"
              onClick={handleRemove}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
              aria-label={`Remove ${item_name} from bag`}
            >
              <AiFillDelete />
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToBag}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition"
              aria-label={`Add ${item_name} to bag`}
            >
              <GrAddCircle />
              Add to bag
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

/**
 * Memoization: compare by id and isInBag and current_price (to reflect price change)
 * Guard for missing item or missing id.
 */
export default React.memo(Homeitem, (prev, next) => {
  const prevId = prev.item?.id;
  const nextId = next.item?.id;
  if (prevId !== nextId) return false;
  if (prev.isInBag !== next.isInBag) return false;
  // also check price in case price changes
  if (prev.item?.current_price !== next.item?.current_price) return false;
  return true;
});
