const loadInfo = (data) => `
    <h3>Người đặt hàng</h3>
    <div>Hi ${data.order.buyer.name}</div> 
    <div>Phone: ${data.order.buyer.phone}</div> 

     <h3>Người nhận hàng</h3>
    <div>Hi ${data.order.buyer.receiver.name}</div>
    <div>Phone: ${data.order.buyer.receiver.phone}</div>
    <div>Address: ${data.order.buyer.receiver.detail} ${
  data.order.buyer.receiver.address
}</div>

    <table border="1" style="text-align: center;">
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Size</th>
        <th>Quantity</th>
      </tr>
      ${data.products.map((value) => {
        return `<tr>
        <td><img width="80" height="80" src="${value.img}" /></td>
        <td>${value.name}</td>
        <td>${value.size}</td>
        <td><span>${value.quantity}</span></td>
      </tr>`;
      })}
      
      
    </table>
    <h2>Total: <span>${new Intl.NumberFormat("en-DE").format(
      data.order.total,
    )} VND </span> </h2>
    <h2>Payment Method: <span>${
      data.order.payment_method === "cod"
        ? "Thanh toán khi nhận hàng"
        : "Thanh toán bằng thẻ"
    } </span> </h2>
    <h2>Trạng thái: <span>${
      data.order.status ? " Đã thanh toán" : "Chưa thanh toán"
    } </span> </h2>
    <h1>Thanks</h1>
`;

module.exports = loadInfo;
