import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { productInputs } from "../../formSource";
import { toast } from "react-toastify";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const NewProduct = ({ title }) => {
  const [file, setFile] = useState("");
  const [flashSale, setFlashSale] = useState(false);
  const [category, setCategory] = useState("Giày bóng đá chính hãng");
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    actualPrice: "",
    brand: "",
    list_size: "",
    oldPrice: "",
    stock: "",
    title: "",
  });
  const [text_long_desc, setTextLong_desc] = useState();
  const [text_short_desc, setTextShort_desc] = useState();
  const [short_desc, setShort_desc] = useState(EditorState.createEmpty());
  const [long_desc, setLong_desc] = useState(EditorState.createEmpty());

  const onEditorStateChangeLong = function (editorState) {
    setLong_desc(editorState);
    const blocks = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    setTextLong_desc(blocks);
  };

  const onEditorStateChangeShort = function (editorState) {
    setShort_desc(editorState);
    const blocks = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    setTextShort_desc(blocks);
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const listImages = await Promise.all(
        Object.values(file).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmwl0pu3j/image/upload",
            data,
          );

          const { url } = uploadRes.data;
          return url;
        }),
      );

      const { actualPrice, brand, list_size, oldPrice, stock, title } = info;

      const listInput = [
        {
          field: "Sale",
          value: actualPrice,
        },
        {
          field: "Price",
          value: oldPrice,
        },

        {
          field: "Images",
          value: listImages,
        },
        {
          field: "Brand",
          value: brand,
        },
        {
          field: "List Size",
          value: list_size,
        },
        {
          field: "Long Desc",
          value: long_desc,
        },
        {
          field: "Old Price",
          value: oldPrice,
        },
        {
          field: "Short Desc",
          value: short_desc,
        },
        {
          field: "Stock",
          value: stock,
        },
        {
          field: "Name",
          value: title,
        },
      ];

      for (let input of listInput) {
        if (input.value === "") {
          alert(input.field + " not empty, please check again");
          return false;
        } else if (input.value.length === 0) {
          alert(input.field + " not empty, please check again");
          return false;
        }
        return true;
      }

      const sizes = `${list_size}`.split(",");
      const newPro = {
        actualPrice,
        brand,
        oldPrice,
        stock,
        title,
        list_size: sizes,
        album: listImages,
        short_desc: text_short_desc,
        long_desc: text_long_desc,
        flashSale: JSON.parse(flashSale),
        category,
      };

      await axios.post("/product/create-product", newPro);
      toast.success("Added new product");
      navigate("/product");
    } catch (err) {
      alert("Please check fields again, Empty!!! ");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className=" w-[100px] h-[100px]">
            <img
              src={
                file
                  ? URL.createObjectURL(file[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right ">
            <form>
              <div className="formInput flex justify-between">
                <label htmlFor="file">
                  Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFile(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    name={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label htmlFor="">Flash Sale</label>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={flashSale}
                  onChange={(e) => setFlashSale(e.target.value)}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </div>

              <div className="formInput">
                <label htmlFor="">Category</label>
                <select
                  className="border border-black"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Giày bóng đá chính hãng">
                    Giày bóng đá chính hãng
                  </option>
                  <option value="Áo bóng đá">Áo bóng đá</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                </select>
              </div>
            </form>

            <div className="formInput mt-4">
              <label className=" mb-3">Short description</label>
              <Editor
                editorClassName="editor-class"
                placeholder="Enter Content"
                editorState={short_desc}
                editorStyle={{
                  border: "1px solid black",
                  padding: "4px 4px 0 4px",
                }}
                toolbarStyle={{
                  border: "1px solid black",
                  padding: "4px",
                }}
                onEditorStateChange={onEditorStateChangeShort}
              />

              <div className="formInput mt-4">
                <label className=" mb-3">Long description</label>
                <Editor
                  editorClassName="editor-class"
                  placeholder="Enter Content"
                  editorState={long_desc}
                  editorStyle={{
                    border: "1px solid black",
                    padding: "4px 4px 0 4px",
                  }}
                  toolbarStyle={{
                    border: "1px solid black",
                    padding: "4px",
                  }}
                  onEditorStateChange={onEditorStateChangeLong}
                />
              </div>

              <div className="flex justify-between">
                <button className=" p-3 bg-teal-500 mt-3" onClick={handleClick}>
                  Thêm sản phẩm
                </button>
                <Link className=" p-3 bg-teal-500 mt-3" to="/product">
                  Quay lại
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
