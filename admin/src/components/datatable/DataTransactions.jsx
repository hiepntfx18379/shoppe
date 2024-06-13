import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useFetch from "../../hookCustome/fetchData";
import { Button } from "@mui/material";
import PopupOrderDetail from "./PopupOrderDetail";

const DatatableTransaction = ({ columns }) => {
  const { data, reFetch } = useFetch(`/order`);
  const [open, setOpen] = useState(false);
  const [pro, setPro] = useState("");
  const [allOrder, setAllOrder] = useState([]);

  useEffect(() => {
    setAllOrder(data);
  }, [data]);

  const handleClickView = (id) => {
    const index = data.findIndex((x) => x._id === id);
    setPro(data[index]);
    setOpen(true);
  };

  const actionBtn = {
    field: "action",
    headerName: "View",
    renderCell: (params) => {
      return (
        <Button
          onClick={() => handleClickView(params.id)}
          style={{ backgroundColor: "green", color: "white" }}
        >
          View
        </Button>
      );
    },
    width: 100,
  };

  return (
    <>
      <div className="datatable">
        <DataGrid
          className="datagrid"
          rows={allOrder}
          columns={columns.concat(actionBtn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          getRowId={(row) => row._id}
        />
      </div>
      {open ? <PopupOrderDetail pro={pro} setOpen={setOpen} /> : null}
    </>
  );
};

export default DatatableTransaction;
