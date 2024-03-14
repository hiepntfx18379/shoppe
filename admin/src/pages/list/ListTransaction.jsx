import "./list.scss";
import DatatableTransaction from "../../components/datatable/DataTransactions";

const ListTransaction = ({ columns }) => {
  return <DatatableTransaction columns={columns} />;
};

export default ListTransaction;
