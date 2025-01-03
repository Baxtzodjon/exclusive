export type Order = {
    _id: string;
    userId: string;
    products: string[];
    status: 'new' | 'pending' | 'delivered';
    date: string;
}