import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import OrderCard from "./components/OrderCard"
import { allOrders } from "../../redux/features/cartSlice";
import { TOrderListDefaut } from "../../models/CartSlice";

const Orders = () => {
    const dispatch = useAppDispatch()

    const orderList = useAppSelector(state => state.cartReducer.orders);
    const loggedUser = useAppSelector(state => state.authReducer.loggedUser);

    useEffect(() => {
        let payload: TOrderListDefaut = {
            skip: 0,
            limit: 10,
            sort: 'createdAt',
            sortType: 'desc',
            userId: loggedUser?._id
        }

        dispatch(allOrders(payload))
    }, [dispatch])

    return (
        <>
            <div className="container px-10 my-8" >
                <h1 className="text-2xl" >Orders History</h1>

                <div className="mt-6 space-y-2">
                    {orderList?.length > 0 ? (
                        orderList.map((item) => <OrderCard key={item._id} {...item} />)
                    ) : (
                        <div className="flex flex-col justify-center items-center p-4">
                            <img src="/emptyCart.jpg" alt="empty" className="w-40" />
                            <p className="text-center text-xl my-2">No have orders</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Orders