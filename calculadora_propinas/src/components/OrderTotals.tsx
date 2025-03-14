import { useMemo } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  placeOrder: () => void
};

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {
  const subtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order],
  );
  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-2xl font-black">Totales y Propina:</h2>
        <p>
          Subtotal a pagar: {""}
          <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
        </p>

        <p>
          Propina: {""}
          <span className="font-bold">${tipAmount}</span>
        </p>

        <p>
          Total a pagar: {""}
          <span className="font-bold">${totalAmount}</span>
        </p>
      </div>

      <button
        className="w-full bg-black text-white p-3 uppercase cursor-pointer font-bold mt-10 disabled:cursor-default disabled:opacity-10"
        disabled={totalAmount === 0}
        onClick={placeOrder}
      >
        Guardar Orden
      </button>
    </>
  );
}
