import { formatCurrency } from "../helpers";
import { MenuItem, OrderItem } from "../types";
type OrderContentsProps = {
  order: OrderItem[];
  removeItem: (id: MenuItem["id"]) => void;
};

export default function OrderContents({
  order,
  removeItem,
}: OrderContentsProps) {
  return (
    <div>
      <h2 className="text-4xl font-black">Consumo</h2>
      <div className="space-y-3 mt-10">
        {
          order.map((item) => (
            <div
              className="flex justify-between items-center border-t py-5 border-gray-200 last-of-type:border-b"
              key={item.id}
            >
              <div>
                <p className="text-lg">
                  {item.name} - {formatCurrency(item.price)}
                </p>
                <p className="font-black">
                  Cantidad: {item.quantity} -{" "}
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-600 w-8 h-8 rounded-full text-white font-white cursor-pointer"
              >
                X
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
