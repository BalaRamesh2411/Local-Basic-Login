import React, { useEffect } from 'react';
import axios from 'axios';



const View = () => {



 
  const user_Id = localStorage.getItem("user_Id");
  const user_name = localStorage.getItem("user_name");
  

  const getUserData = async () => {
    if (!user_Id) {
      alert("User not valid");
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:5000/register/${user_Id}`);
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Welcome to Agaram acadamy</h1>
      <h2>Your are the best student in  {user_name}</h2>
    </div>
  )
}

export default View
