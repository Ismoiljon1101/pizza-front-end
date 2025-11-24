import { useEffect, useMemo, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquery } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = useMemo(
    () => actionDispatch(dispatch),
    [dispatch]
  );

  const history = useHistory();
  const { orderBuilder, authMember } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquery>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => {
        console.log(err);
      });

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => {
        console.log(err);
      });

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => {
        console.log(err);
      });
  }, [orderInquiry, orderBuilder, setPausedOrders, setProcessOrders, setFinishedOrders]);

  if (!authMember) {
    history.push("/");
    return null;
  }

  return (
    <div className="relative min-h-screen pt-2 md:pt-20 pb-16">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <section className="container mx-auto px-4">
        <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold">
                Order Management
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
                My Orders
              </h1>
            </div>

            <Tabs value={value} onValueChange={setValue}>
              <div className="w-full overflow-x-auto">
                <TabsList className="mb-6 inline-flex min-w-full justify-start gap-2 bg-transparent">
                  <TabsTrigger
                    value="1"
                    className="data-[state=active]:glass-panel data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-white/10 transition-all rounded-xl px-6 py-3"
                  >
                    Paused Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="2"
                    className="data-[state=active]:glass-panel data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-white/10 transition-all rounded-xl px-6 py-3"
                  >
                    Process Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="3"
                    className="data-[state=active]:glass-panel data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-white/10 transition-all rounded-xl px-6 py-3"
                  >
                    Finished Orders
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="mt-6 space-y-6">
                <TabsContent value="1">
                  <PausedOrders setValue={setValue} />
                </TabsContent>
                <TabsContent value="2">
                  <ProcessOrders setValue={setValue} />
                </TabsContent>
                <TabsContent value="3">
                  <FinishedOrders />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
