import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import TextArea from "../Components/UI/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";
import useAddApp from "../hooks/useAddApp";
import useApp from "../hooks/useApp";
import axios from "axios";
import { ChromePicker } from "react-color";
import Spinner from "../Components/UI/Spinner";

const AddApp = () => {
  const navigate = useNavigate();

  const { getApp, addApp, app } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState(false);

  const formik = useFormik({
    initialValues: {
      packageId: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      addApp(app, color);
      setShowModal(false);

      navigate("/dashboard/all-apps");
    },
  });

  useEffect(() => {
    const getColor = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.imagga.com/v2/colors", {
          params: {
            image_url: app?.icon,
          },
          headers: {
            Authorization:
              "Basic YWNjXzU1MTAyMjQzMmU4YWVhOTplMWQwOGM2ZDRkOGYxNmI4NDEzNjUwOWVjMDNkZTZmZg==",
          },
        });
        const color =
          response.data.result.colors.image_colors[0]
            .closest_palette_color_html_code;
        const colorWithoutHash = color.substring(color.indexOf("#") + 1);
        console.log(response.data.result.colors);
        // console.log(color);
        console.log(colorWithoutHash);
        setColor(colorWithoutHash);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getColor();
  }, [app]);

  // console.log(color);

  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <h1 className="text-4xl">Add App</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
          >
            <Input
              width="full"
              type="text"
              name="packageId"
              label="App ID(Play/App Store package_id)"
              onChange={formik.handleChange}
              value={formik.values.packageId}
            />

            <div>
              <button
                onClick={() => {
                  getApp(formik.values.packageId);
                  console.log(app?.icon);
                  // setImage(app.icon);
                  // getColor(app.icon);
                  // console.log(color);
                  setShowModal(true);
                  setLoading(true);
                }}
                type="button"
                className="flex bg-green-500 text-white rounded-lg mx-auto  px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
              >
                Add App
              </button>
            </div>
            <Backdrop
              title="Add App"
              show={showModal}
              onClick={() => setShowModal(false)}
            >
              {loading ? (
                <div className="pt-6 pb-8 grid place-content-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  Are you sure you want to add this App?
                  <div className="self-end mt-4">
                    <Button type={"submit"}>Yes</Button>
                  </div>
                </>
              )}
            </Backdrop>
          </form>
        </div>
      </Card>
    </>
  );
};

export default AddApp;
