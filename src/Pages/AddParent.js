import React from "react";
import { useDispatch } from "react-redux";
import Card from "../Components/Card";
import Input from "../Components/Input";
import { useFormik } from "formik";

const AddParent = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      studentName: "",
      fatherName: "",
      email: "",
      watsappNo: "",
      country: "",
      city: "",
      password: "",
    },
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      alert("Parent Added!");
    },
  });
  return (
    <Card>
      <h1 className="text-secondary text-2xl">Add Parent</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
      >
        <Input
          width="full"
          type="text"
          name="studentName"
          label="Student Name"
          onChange={formik.handleChange}
          value={formik.values.studentName}
        />
        {/* For small screen */}
        <div className="flex flex-col gap-6 md:hidden">
          <Input
            width="full"
            label="Father Name"
            name="fatherName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fatherName}
          />
          <Input
            type="text"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            width="full"
          />
        </div>
        {/* For medium screen and above */}
        <div className="hidden md:flex md:gap-6">
          <Input
            width="half"
            type="text"
            label="Father Name"
            name="fatherName"
            onChange={formik.handleChange}
            value={formik.values.fatherName}
          />
          <Input
            width="half"
            type="text"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <Input
          width="full"
          type="number"
          label="Watsapp No."
          name="watsappNo"
          onChange={formik.handleChange}
          value={formik.values.watsappNo}
        />
        <Input
          width="full"
          type="text"
          label="Country"
          name="country"
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        <Input
          width="full"
          type="text"
          label="City"
          name="city"
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        <Input
          width="full"
          type="text"
          label="Password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <input type="file" name="" id="" />
        <div>
          <button
            type="submit"
            className="flex bg-green-500 text-white rounded-lg mx-auto  px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
          >
            Add Parent
          </button>
          {/* <button
            type="submit"
            className="flex bg-green-500 text-white rounded-lg mx-auto  px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
          >
            Reset
          </button> */}
        </div>
      </form>
    </Card>
  );
};

export default AddParent;
