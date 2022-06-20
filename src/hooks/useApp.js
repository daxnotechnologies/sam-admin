import { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../api/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const useApp = () => {
  const [imagePath, setImagePath] = useState("");
  const [color, setColor] = useState("");
  const [app, setApp] = useState({});
  const appsCollectionRef = collection(db, "apps");

  const getColor = async (imagePath) => {
    try {
      const response = await axios.get("https://api.imagga.com/v2/colors", {
        params: {
          image_url: { imagePath },
        },
        headers: {
          Authorization:
            "Basic YWNjXzU1MTAyMjQzMmU4YWVhOTplMWQwOGM2ZDRkOGYxNmI4NDEzNjUwOWVjMDNkZTZmZg==",
        },
      });
      const color =
        response.result.colors.background_colors[0]
          .closest_palette_color_html_code;
      console.log(color);
      setColor(color);
    } catch (error) {
      console.error(error);
    }
  };
  const getApp = (packageId) => {
    axios
      .get(" https://data.42matters.com/api/v2.0/android/apps/lookup.json", {
        params: {
          access_token: "01a5982b2b15e31919f4c43c1649a0cdc61b5a81",
          p: packageId,
        },
      })
      .then((response) => {
        const appdata = response.data;
        console.log(appdata);
        setApp(appdata);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addApp = async (values, color) => {
    await addDoc(appsCollectionRef, {
      title: values.title,
      category: values.category,
      color: color,
      description: values.description,
      downloads: values.downloads,
      icon: values.icon_72,
      rating: values.rating,
      screenshots: values.screenshots,
      developer: values.developer,
      playStoreLink: values.market_url,
      uploadedAt: serverTimestamp(),
      promo_video: values.promo_video,
      reviews: [],
      featured: false,
    });
  };

  const deleteApp = async (appId) => {
    const appDoc = doc(appsCollectionRef, appId);
    deleteDoc(appDoc);
  };

  const featureApp = async (appId, featureApp) => {
    const data = doc(appsCollectionRef, appId);
    await updateDoc(data, {
      featured: featureApp,
    });
  };

  const updateApp = async (values, appId, imagePath) => {
    const data = doc(appsCollectionRef, appId);
    await updateDoc(data, {
      title: values.title,
      category: values.category,
      rating: values.rating,
      description: values.description,
      imagePath: imagePath,
    });
  };

  const uploadappIcon = async (appIcon, appId) => {
    if (appIcon == null) return;
    const appIconRef = ref(storage, `app_images/${appId}`);
    uploadBytes(appIconRef, appIcon);
    let path = await getDownloadURL(appIconRef);
    setImagePath(path);
  };

  return {
    getApp,
    addApp,
    deleteApp,
    featureApp,
    updateApp,
    uploadappIcon,
    imagePath,
    app,
    getColor,
    color,
  };
};

export default useApp;
