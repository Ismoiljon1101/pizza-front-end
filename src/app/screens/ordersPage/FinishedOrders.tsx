import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <div className="space-y-6">
      {finishedOrders?.map((order: Order) => (
        <article
          key={order._id}
          className="rounded-3xl border bg-card p-6 shadow-sm"
        >
          <div className="space-y-4">
            {order?.orderItems?.map((item: OrderItem) => {
              const product: Product = order.productData.filter(
                (ele: Product) => item.productId === ele._id
              )[0];
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-2xl bg-muted/40 p-4"
                >
                  <img
                    src={imagePath}
                    alt={product.productName}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-lg font-semibold">{product.productName}</p>
                    <div className="text-sm text-muted-foreground">
                      ${item.itemPrice} × {item.itemQuantity}
                    </div>
                  </div>
                  <p className="text-lg font-semibold">
                    ${item.itemQuantity * item.itemPrice}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-muted/30 p-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Product price:</span>
                <span>${order.orderTotal - order.orderDelivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Delivery:</span>
                <span>${order.orderDelivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Total:</span>
                <span>${order.orderTotal}</span>
              </div>
            </div>
          </div>
        </article>
      ))}

      {!finishedOrders ||
        (finishedOrders.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-muted-foreground/40 p-10 text-center text-muted-foreground">
            <img
              src={"/icons/noimage-list.svg"}
              alt="empty"
              className="h-40 w-40"
            />
            <p>No finished orders available.</p>
          </div>
        ))}
    </div>
  );
}

