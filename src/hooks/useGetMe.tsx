import { setUserData } from "@/redux/slice/userSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetMe = () => {
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/me");
      dispatch(setUserData(res.data.user));
    } catch (error) {
      console.log(`Error while getting user data : ${error}`);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return <div></div>;
};

export default useGetMe;
