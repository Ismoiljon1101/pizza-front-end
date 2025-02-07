import { SyntheticEvent, useEffect, useState } from "react";
import {Dispatch} from "@reduxjs/toolkit";
import TabContext  from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Box, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquery } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css"
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";


const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data))
});
export default function OrdersPage() {
  const {setPausedOrders, setProcessOrders, setFinishedOrders} = actionDispatch(useDispatch());

  const history = useHistory();
  const { orderBuilder, authMember } = useGlobals()
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquery>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  })

  useEffect(() => {
    const order = new OrderService();

    order.getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
    .then(data => setPausedOrders(data))
    .catch((err) => {
      console.log(err)
    });

    order.getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
    .then(data => setProcessOrders(data))
    .catch((err) => {
      console.log(err)
    });

    order.getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
    .then(data => setFinishedOrders(data))
    .catch((err) => {
      console.log(err)
    });
  }, [orderInquiry, orderBuilder])

  /**Handlers**/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if(!authMember) history.push("/");
    return (
      <div className={"order-page"}>
        <Container  className="order-container">
          <Stack className="order-left" >
            <TabContext value={value}>
              <Box className={"order-new-frame"}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                    className={"table_list"}>
                    <Tab label="Paused Orders" value={"1"} />
                    <Tab label="Process Orders" value={"2"} />
                    <Tab label="Finished Orders" value={"3"}  />
                  </Tabs>
                </Box>
              </Box>
              <Stack>
                <PausedOrders  setValue={setValue}/>
                <ProcessOrders setValue={setValue}/>
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>
          <Stack  className="order-right">
            <Box className={"order-info-box"}>
              <Box className={"member-box"}>
                <div className="order-user-img">
                  <img 
                    src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` 
                    : "/icons/default-user.svg"}
                    className={"order-user-avatar"}
                    alt=""
                  />
                  <div className="order-user-icon-box">
                  <img 
                      src={authMember?.memberType === MemberType.RESTAURANT 
                        ? "/icons/restaurant.svg"
                        :"/icons/user-badge.svg"}
                      className={"order-user-prof-img"}
                      alt=""
                      style={{fill:"#ffff"}}
                    />
                </div>
                </div>
                <div className={"order-user-name"}>{authMember?.memberNick}</div>
                <div className={"order-user-prof"}>{authMember?.memberType}</div>
              </Box>
              <Box className={"liner"}></Box>
              <Box className={"order-user-address"}>
                <div style={{display:"flex"}}> <LocationOnIcon /></div>
                <span> {authMember?.memberAddress ? authMember?.memberAddress :  "No Address"}</span>
              </Box>
            </Box>
            <Box className={"order-info-box"}>
              <Box className={"payment-box"}>
                <Box>
                  <input type="text"  placeholder="Card number : 5243 4090 2002 7495"/>
                  <div  className="card-child-box">
                  <input type="text" placeholder="07/24"/>
                  <input type="text"  placeholder="CVV:010"/>
                  </div>
                  <input type="text" placeholder="Oyxon Kambaralieva" />
                </Box>
                <Box className={"card-type"}>
                  <img src={"/icons/paypal-card.svg"} alt="" />
                  <img src="/icons/master-card.svg" alt="" />
                  <img src={"/icons/western-card.svg"} alt="" />
                  <img src={"/icons/visa-card.svg"} alt="" />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </div>
    ) 
    
  }