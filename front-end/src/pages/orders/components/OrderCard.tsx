import { FC } from "react"
import moment from "moment"

import { OrdersItem } from "../../../models/CartItem"

const OrderCard: FC<OrdersItem> = ({
    price,
    products,
    status,
    totalQuantity,
    _id,
    createdAt
}) => {

    return (
        <div className="border p-4">
            <div>
                <span>{createdAt ? moment(createdAt).format('DD/MM/YYYY') : ""}</span>
                <div className="flex items-center justify-between" >
                    <h3 className="font-bold leading-4">{`Order No: ${_id}`}</h3>
                    <span className="bg-blue-200 px-2 py-1 rounded-md" >{status}</span>
                </div>
                <div className="flex space-x-2 items-center">
                    <h3 className="font-semibold">${price.toFixed(2)}</h3>
                </div>

                <div className="flex items-center space-x-1">
                    <span data-test="cart-item-quantity">QTY: {totalQuantity}</span>
                </div>

                <div className="flex items-center space-x-1 mt-3">
                    <div>
                        {
                            products?.length > 0 ?
                                <>
                                    {
                                        products?.map((product) => (
                                            <>
                                                <div>
                                                    <img src={product?.thumbnail} alt="product" className="h-16 border" />
                                                    <span className="text-sm" >{product?.title}</span>
                                                </div>

                                            </>
                                        ))
                                    }
                                </>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard