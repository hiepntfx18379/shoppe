import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "../../hookCustome/fetchData";
import axios from "axios";
import { Button } from "@mui/material";
import ProductDetail from "./ProductDetail";
import ConfirmPassword from "./ConfirmPassword";
import { toast } from "react-toastify";

const Datatable = ({ columns }) => {
  const location = useLocation();
  let path = location.pathname.split("/")[1];
  const { data, reFetch } = useFetch(`${path}`);
  const [listData, setListData] = useState();
  const [text, setText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [idDetail, setIdDetail] = useState(null);
  const [enterPassToChangeRole, setEnterPassToChangeRole] = useState(false);
  const [idConfirm, setIdConfirm] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (path === "user") {
      setListData(data);
      if (text !== "") {
        setListData(
          data.filter(
            (x) =>
              x.name.toLowerCase().includes(text) ||
              x.phone.toLowerCase().includes(text),
          ),
        );
      }
    } else if (path === "product") {
      setListData(data);
      if (text !== "") {
        setListData(data.filter((x) => x.title.toLowerCase().includes(text)));
      }
    }
  }, [text, data, path]);

  // both
  const handleDelete = async () => {
    if (
      window.confirm(
        `Do u want delete ${
          selectedRows.length === 1
            ? selectedRows.length + " item"
            : selectedRows.length + " items"
        } ?`,
      )
    ) {
      await Promise.all(
        selectedRows.map(
          async (itemID) =>
            await axios.delete(`${path}/deleteOneOrMany/${itemID}`),
        ),
      );

      setListData(reFetch());
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm(`Do u want delete all ${path}s ?`)) {
      await axios.delete(`${path}/deleteAll`);
      setListData(reFetch());
    }
  };

  // end both

  //product
  const handleDetail = (id) => {
    setIdDetail(id);
    setOpenDetail(!openDetail);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button className="cellAction">
              <Link
                to={`/${path}/update/${params.row._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Update</div>
              </Link>
            </Button>
            <Button
              className="cellAction"
              onClick={() => handleDetail(params.row._id)}
            >
              <div className="viewButton">View</div>
            </Button>
          </>
        );
      },
    },
  ];
  // end product

  // user
  const changeRole = (user) => {
    if (
      window.confirm(
        `Do you want change from ${
          user.role === "admin" ? "admin to user" : "user to admin"
        }`,
      )
    ) {
      setIdConfirm(user._id);
      setEnterPassToChangeRole(true);
    }
  };

  const toggle = [
    {
      field: "action",
      headerName: "Admin/User",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button
              title="Click to change role"
              className={
                params.row.role === "admin"
                  ? " bg-red-600 text-black py-2 px-4 rounded-md"
                  : " bg-gray-400 text-white py-2 px-4 rounded-md"
              }
              onClick={() => changeRole(params.row)}
            >
              Change
            </button>
          </>
        );
      },
    },
  ];

  const handleConfirm = useCallback(async () => {
    try {
      const change = await axios.post(`/user/confirmPass/${idConfirm}`, {
        password,
      });
      toast.success(change.data.message);

      setEnterPassToChangeRole(false);
      setPassword("");
      setListData(reFetch());
    } catch (e) {
      toast.error("Password is wrong, Please again");
      setEnterPassToChangeRole(false);
      setPassword("");
    }
  }, [idConfirm, password, reFetch]);

  // end user

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div style={{ border: "1px" }}>
          Search {path}:{" "}
          <input
            className="border border-black focus mt-2 "
            type="text"
            value={text}
            placeholder={path === "user" ? "name/phone number" : "name"}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <div
            className={` ${
              selectedRows.length === data.length
                ? "cursor-pointer bg-[#FF0000] border rounded-md"
                : "cursor-not-allowed"
            }`}
          >
            <Button
              onClick={() => handleDeleteAll()}
              disabled={selectedRows.length === data.length ? false : true}
            >
              Delete All
            </Button>
          </div>
          <div
            className={` ${
              selectedRows.length > 0 && selectedRows.length < data.length
                ? "cursor-pointer bg-[#FF0000] border rounded-md"
                : "cursor-not-allowed"
            }`}
          >
            <Button
              onClick={() => handleDelete(selectedRows)}
              disabled={
                selectedRows.length > 0 && selectedRows.length < data.length
                  ? false
                  : true
              }
            >
              Delete
            </Button>
          </div>
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>
      </div>
      {listData ? (
        <>
          <DataGrid
            className="datagrid"
            rows={listData}
            columns={
              path === "product"
                ? columns.concat(actionColumn)
                : columns.concat(toggle)
            }
            pageSize={9}
            rowsPerPageOptions={[9]}
            isRowSelectable={(params) => params.row.role !== "admin"}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              setSelectedRows(ids);
            }}
            getRowId={(row) => row._id}
          />
          {openDetail && (
            <>
              <ProductDetail
                setOpen={setOpenDetail}
                open={openDetail}
                idPro={idDetail}
              />
            </>
          )}
          {enterPassToChangeRole && (
            <div>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className=" w-[500px] border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className=" text-base font-semibold flex items-center justify-between gap-2">
                        <span>Vui lòng nhập mật khẩu tài khoản</span>
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex flex-col gap-2">
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Nhập mật khẩu"
                        className=" border outline-none py-2 px-2"
                      />
                    </div>
                    {/*footer*/}
                    <div className=" justify-between flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        onClick={() => setEnterPassToChangeRole(false)}
                        className="border border-[#757575] px-4 py-2 hover:text-black hover:bg-[#ee4d2d]"
                      >
                        Quay lại
                      </button>
                      <button
                        onClick={() => handleConfirm()}
                        className="border border-[#757575] px-4 py-2 text-black bg-[#ee4d2d]"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </div>
          )}
        </>
      ) : (
        []
      )}
    </div>
  );
};

export default Datatable;
