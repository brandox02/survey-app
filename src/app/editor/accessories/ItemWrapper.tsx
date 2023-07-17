import { ItemWrapper } from "../types";

const ItemWrapper = ({ onClick, children, isSelected, ...restProps }: ItemWrapper) => (
   <div
      onClick={onClick}
      className={`bg-white border-2 my-2 ${isSelected ? "border-emerald-400" : 'hover:border-orange-200 border-gray-200'}`}
      {...restProps}
   >
      {children}
   </div>
)

export default ItemWrapper;