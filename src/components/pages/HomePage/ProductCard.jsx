/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete, AiFillStar } from "react-icons/ai";

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
      <div className="w-full p-4 bg-white rounded-sm border border-gray-200 text-center text-xs text-gray-600">
        No item available
      </div>
    );
  }

  // HANDLE BAD KEYS WITH LEADING SPACES
  const rawRating = item.rating || item[" rating"];
  const discount =
    item.discount_percentage ?? item[" discount_percentage"] ?? null;

  const {
    image,
    company,
    category,
    item_name,
    current_price,
    original_price,
  } = item;

  return (
    <article
      className="bg-white border border-gray-200 rounded-sm overflow-hidden
                 hover:shadow-md transition-transform duration-150 hover:-translate-y-0.5
                 flex flex-col text-left cursor-pointer"
      role="article"
      aria-label={item_name || "product"}
    >
      {/* Image section */}
      <div className="relative w-full bg-gray-50">
        <div className="w-full h-0 pb-[135%] relative overflow-hidden">
          <img
            src={image}
            alt={item_name || "product image"}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Rating pill – bottom left like Myntra */}
        {rawRating && (
          <div className="absolute bottom-2 left-2 bg-white/95 text-[11px] font-semibold text-gray-700 px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
            <span>{rawRating.stars ?? "N/A"}</span>
            <AiFillStar className="text-yellow-500 text-[12px]" />
            <span className="text-[10px] text-gray-500">
              ({rawRating.count ?? 0})
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="px-3 pt-2 pb-3 flex flex-col flex-1">
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-gray-900 truncate">
            {company}
          </div>
          <div className="text-[11px] text-gray-500 truncate">
            {category}
          </div>
          <div className="mt-1 text-[12px] text-gray-700 line-clamp-2 leading-snug">
            {item_name}
          </div>
        </div>

        {/* Price block */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-[13px] font-semibold text-gray-900">
              ₹{current_price}
            </span>
            {original_price ? (
              <span className="text-[11px] line-through text-gray-400">
                ₹{original_price}
              </span>
            ) : null}
            {discount ? (
              <span className="text-[11px] font-semibold text-[#ff905a]">
                ({discount}% OFF)
              </span>
            ) : null}
          </div>
        </div>

        {/* Add / Remove bag – Myntra-style thin button */}
        <div className="mt-2">
          {isInBag ? (
            <button
              type="button"
              onClick={handleRemove}
              className="w-full flex items-center justify-center gap-1.5 border border-gray-300 text-[11px] font-semibold py-1.5 rounded-sm
                         text-red-600 hover:border-red-500 hover:text-red-700 transition"
              aria-label={`Remove ${item_name} from bag`}
            >
              <AiFillDelete className="text-xs" />
              <span>REMOVE FROM BAG</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToBag}
              className="w-full flex items-center justify-center gap-1.5 border border-gray-300 text-[11px] font-semibold py-1.5 rounded-sm
                         text-[#ff3f6c] hover:border-[#ff3f6c] hover:text-[#ff1654] transition"
              aria-label={`Add ${item_name} to bag`}
            >
              <GrAddCircle className="text-xs" />
              <span>ADD TO BAG</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default React.memo(Homeitem, (prev, next) => {
  const prevId = prev.item?.id;
  const nextId = next.item?.id;
  if (prevId !== nextId) return false;
  if (prev.isInBag !== next.isInBag) return false;
  if (prev.item?.current_price !== next.item?.current_price) return false;
  return true;
});
