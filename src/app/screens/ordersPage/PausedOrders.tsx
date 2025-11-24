import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { T } from "../../../lib/types/common";
import { Button } from "../../components/ui/button";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /**Handlers**/
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm("Do you want to proceed with payment?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="space-y-6">
      {pausedOrders?.map((order: Order) => (
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

            <div className="flex flex-wrap justify-end gap-3">
              <Button
                variant="outline"
                value={order._id}
                onClick={deleteOrderHandler}
              >
                Cancel
              </Button>
              <Button value={order._id} onClick={processOrderHandler}>
                Payment
              </Button>
            </div>
          </div>
        </article>
      ))}

      {!pausedOrders ||
        (pausedOrders.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-muted-foreground/40 p-10 text-center text-muted-foreground">
            <img
              src={"/icons/noimage-list.svg"}
              alt="empty"
              className="h-40 w-40"
            />
            <p>No paused orders available.</p>
          </div>
        ))}
    </div>
  );
}

