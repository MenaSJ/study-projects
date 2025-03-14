import type { MenuItem } from "../types";

interface MenuItemProps {
  item: MenuItem;
  addItem: (item: MenuItem) => void;
}

export default function MenuItem({ item, addItem }: MenuItemProps) {
  return (
    <>
      <button
        className="border-4 rounded-sm border-teal-400 hover:cursor-pointer hover:bg-teal-200 w-full p-2 flex justify-between"
        onClick={() => addItem(item)}
      >
        <p>{item.name}</p>
        <p className="font-black">{item.price}</p>
      </button>
    </>
  );
}
