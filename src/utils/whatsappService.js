export const sendOrderToAdmin = (orderData) => {
    const adminPhone = import.meta.env.VITE_ADMIN_PHONE;
    const itemsList = orderData.items.map(i => `${i.name} (x${i.qty}) - $${i.price * i.qty}`).join('%0A');

    const message = `*NEW ORDER ALERT*%0A%0A` +
        `*Customer:* ${orderData.customerName}%0A` +
        `*Phone:* ${orderData.phone}%0A` +
        `*Address:* ${orderData.address}%0A%0A` +
        `*Items:*%0A${itemsList}%0A%0A` +
        `*Total:* $${orderData.total}%0A%0A` +
        `_Please check the dashboard for details._`;

    window.location.href = `https://wa.me/${adminPhone}?text=${message}`;
};