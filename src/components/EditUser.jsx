import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    getUserById();
  },[]);

  const updateUser = async(e)=>{e.preventDefault();

    try {
        await axios.patch(`http://localhost:5000/users/${id}`,{
            name,
            email,
            gender
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
  }

  const getUserById = async ()=>{
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
  }


  return (

    
    <div className="columns mt-5 is-centered">
      
      <div className="column is-half">
        <Link to={`/`} className="button is-small is-warning mb-4">Kembali</Link>
        <form  onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="email"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="" value={gender} onChange={(e)=> setGender(e.target.value)} id="">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
