import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { backendURL } from "../App";
import ProductForm from "../components/ProductForm";

const Add = ({ token }) => {
  return (
    <div className="">
      <ProductForm formTitle={"Add Product"} />
    </div>
  );
};

export default Add;
