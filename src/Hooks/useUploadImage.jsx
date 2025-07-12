import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";
import { useState } from "react";

export const useUploadImage = () => {
  const [urlImage, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadImage = (imageName) => {
    const storageRef = ref(storage, `imagens/${imageName.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageName);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        alert(error);
        console.log(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(url);
      }
    );

    return { urlImage, progress };
  };
  return { uploadImage };
};
