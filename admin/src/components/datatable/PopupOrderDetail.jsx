import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import PopupOrderRow from "./PopupOrderRow";

const PopupOrderDetail = ({ pro, setOpen }) => {
  return (
    <div className={`w-11/12 mx-auto flex bg-[#f5f5f5] py-10`}>
      <div className="w-[100%]">
        <div className="bg-[#fff]">
          {pro ? (
            <div className="fixed w-full h-screen  top-0 left-0  bg-[#00000030] z-40 scr flex items-center justify-center">
              <div className="w-[85%] top-[30px] 800px:w-[60%] overflow-y-auto h-[80vh] 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
                <RxCross1
                  size={30}
                  className="absolute right-3 top-3 z-50"
                  onClick={() => setOpen(false)}
                />
                <div className="grid grid-flow-col relative justify-stretch w-full 800px:flex">
                  <div className=" p-5 mt-1 ">
                    <div className="text-left ">
                      <div className="text-xl font-extrabold">
                        Infomation Order
                      </div>

                      <div className=" font-medium mt-4  text-xl">
                        Id bill: {pro._id}
                      </div>

                      <div className=" font-medium mt-2  text-xl">
                        Id user: {pro.id_user}
                      </div>

                      <div className=" font-medium mt-2  text-xl">
                        Name user: {pro.name}
                      </div>

                      <div className=" font-medium mt-2  text-xl">
                        email: {pro.email}
                      </div>

                      <div className=" font-medium mt-2  text-xl">
                        Phone number: {pro.phone}
                      </div>

                      <div className=" font-medium mt-2  text-xl">
                        Address: {pro.address}
                      </div>
                      <div className=" font-medium mt-2  text-xl">
                        Delivery: {pro.delivery}
                      </div>
                      <div className=" font-medium mt-2  text-xl">
                        Status: {pro.status}
                      </div>
                      <div className=" font-medium mt-2  mb-4 text-xl">
                        Date order: {pro.createdAt}
                      </div>
                      <div className="text-xl font-extrabold">
                        Total:{" "}
                        {new Intl.NumberFormat("en-DE").format(pro.totalPrice)}{" "}
                        VND
                      </div>
                    </div>
                  </div>

                  <div className=" p-5 mt-1 ">
                    <table className="table-auto w-[100%] text-center">
                      <thead className="bg-gray-200 tracking-widest">
                        <tr>
                          <th>NAME</th>
                          <th>IMAGE</th>
                          <th>PRICE</th>
                          <th>QUANTITY</th>
                          <th>TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pro.products.map((item, id) => {
                          return <PopupOrderRow item={item} key={id} />;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PopupOrderDetail;
