import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productInputs } from "../../formSource";
import useFetch from "../../hookCustome/fetchData";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { toast } from "react-toastify";

const UpdateProduct = ({ title }) => {
  const param = useParams();
  const { data } = useFetch(`/product/find/${param.id}`);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState(data);
  const navigate = useNavigate();
  const [text_long_desc, setTextLong_desc] = useState(data.long_desc);
  const [text_short_desc, setTextShort_desc] = useState(data.short_desc);
  const [short_desc, setShort_desc] = useState(EditorState.createEmpty());
  const [long_desc, setLong_desc] = useState(EditorState.createEmpty());
  const [flashSale, setFlashSale] = useState(false);

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

  // get data from db -> display UI
  const htmlToDraftBlocks = (html) => {
    const blocksFromHtml = htmlToDraft(html || "<p></p>");
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap,
    );
    const editorState = EditorState.createWithContent(contentState);

    return editorState;
  };

  // load UI side
  useEffect(() => {
    setInfo(data);
    setLong_desc(htmlToDraftBlocks(data.long_desc));
    setShort_desc(htmlToDraftBlocks(data.short_desc));
    setTextShort_desc(data.short_desc);
    setTextLong_desc(data.long_desc);
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
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
      const sizes = `${list_size}`.split(",");
      let list_imgs = [];
      if (list.length === 0) {
        list_imgs = [...info.album];
      } else {
        list_imgs = [...list];
      }

      const updateProduct = {
        actualPrice,
        brand,
        oldPrice,
        stock,
        title,
        list_size: sizes,
        album: list_imgs,
        short_desc: text_short_desc,
        long_desc: text_long_desc,
      };

      const res = await axios.patch(
        `/product/update/${param.id}`,
        updateProduct,
      );
      if (res.data.status) {
        toast.success(res.data.message);
      } else {
        alert(toast.response.data.message);
      }
      navigate("/product");
    } catch (err) {
      alert(err.response.data.message);
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file[0])
                  : info.length !== 0
                  ? info.album[0]
                  : null
              }
              alt=""
            />
          </div>

          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFile(e.target.files)}
                  style={{ display: "none" }}
                  required
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    name={input.id}
                    value={info[input.id]}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}

              {/* <div className="formInput">
                <label>List Sizes</label>
                <input
                  onChange={handleChange}
                  name="list_size"
                  value={info.list_size}
                  type="text"
                  placeholder="39,40,40.5,41,42,..."
                  required
                />
              </div> */}

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
                  Cập nhật
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

export default UpdateProduct;
