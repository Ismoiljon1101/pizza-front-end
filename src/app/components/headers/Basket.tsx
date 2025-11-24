import React from "react";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Badge } from "../ui/badge";
import { ShoppingCart, Trash2, X } from "lucide-react";

interface BasketProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const history = useHistory();
    const itemsPrice = cartItems.reduce((a: number, c: CartItem) => a + c.quantity * c.price,
        0);

    const shippingCost = itemsPrice < 100 ? 5 : 0;

    const totalPrice = (itemsPrice + shippingCost).toFixed(1);

    const proceedOrderHandler = async () => {
        try {
            if (!authMember) throw new Error(Messages.error1);

            const order = new OrderService();
            await order.createOrder(cartItems);

            onDeleteAll();
            setOrderBuilder(new Date());

            //REFRESH VIA CONTEXT
            history.push("/orders");

        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button className="relative" variant="secondary" size="icon">
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full border border-background text-[11px]">
                        {cartItems.length}
                    </Badge>
                    <ShoppingCart className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 max-h-[420px] overflow-hidden p-0 sm:w-96">
                <DropdownMenuLabel>
                    <div className="flex justify-between items-center">
                        <span>Cart</span>
                        {cartItems.length > 0 && <Trash2 className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" onClick={() => onDeleteAll()} />}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cartItems.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">Cart is empty!</div>
                ) : (
                    <div className="p-2 max-h-80 overflow-y-auto space-y-1">
                        {cartItems.map((item: CartItem) => {
                            const imagePath = `${serverApi}/${item.image}`
                            return (
                                <div key={item._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                                    <div className="flex items-center space-x-2">
                                        <img src={imagePath} className="w-12 h-12 object-cover rounded-md" alt="icon" />
                                        <div>
                                            <p className="font-semibold text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">${item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemove(item)}>−</Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onAdd(item)}>+</Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(item)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                {cartItems.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="p-4 bg-muted/20">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                            <Button className="w-full mt-4" onClick={proceedOrderHandler}>Order</Button>
                        </div>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
