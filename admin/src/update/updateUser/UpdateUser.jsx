import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userInputs } from "../../formSource";
import useFetch from "../../hookCustome/fetchData";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const UpdateUser = ({ inputs, title }) => {
  const param = useParams();
  const { data } = useFetch(`/user/find/${param.id}`);
  const [file, setFile] = useState(data?.avatar);
  const [info, setInfo] = useState(data);
  const [role, setRole] = useState(data.role);

  const navigate = useNavigate();

  // load UI side
  useEffect(() => {
    setInfo(data);
  }, [data]);

  console.log(data);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

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
    const updateUser = {
      ...info,
    };
    if (list.length !== 0) {
      updateUser.photos = list;
    }

    await axios.patch(`/user/updateInfo/${param.id}`, updateUser);

    navigate("/user");
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
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    name={input.label}
                    value={info[input.label]}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                />
                <FormControlLabel
                  value="telesale"
                  control={<Radio />}
                  label="Telesale"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
