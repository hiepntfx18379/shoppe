import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

import { ordersColumns } from "../../datatablesource";
import ListTransaction from "../list/ListTransaction";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hookCustome/fetchData";

const Home = () => {
  const [checked, setChecked] = useState(0);
  const [notChecked, setNotChecked] = useState(0);
  const [incomeChecked, setIncomeChecked] = useState(0);
  const [incomeNotChecked, setIncomeNotChecked] = useState(0);

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get("/order");
      const allOrders = await res.data;

      let checked = allOrders.filter((x) => x.status === true);
      let notChecked = allOrders.filter((x) => x.status === false);
      let incomeChecked = checked?.reduce((total, acc) => total + acc.total, 0);
      let incomeNotChecked = notChecked?.reduce(
        (total, acc) => total + acc.total,
        0,
      );

      setChecked(checked.length);
      setNotChecked(notChecked.length);
      setIncomeChecked(incomeChecked);
      setIncomeNotChecked(incomeNotChecked);
    };

    getOrders();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget title="Đã thanh toán" user={checked} count={incomeChecked} />
          <Widget
            notPay={true}
            title="Chưa thanh toán"
            user={notChecked}
            count={incomeNotChecked}
          />
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">All Transactions</div>
          <ListTransaction columns={ordersColumns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
