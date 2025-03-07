export interface Order {
    id?: number;
    userId: number;
    orderDate: Date;
    addressId: number;
    shippingTypeId: number;
    paymentTypeId: number;
    stateId: number;
}