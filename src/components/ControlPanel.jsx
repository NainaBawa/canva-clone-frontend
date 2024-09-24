import React, { useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase"; // Import storage
import "./ControlPanel.css";

const ControlPanel = ({ addElement, setCurrentProjectId, saveProject }) => {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Upload image or video to Firebase Storage and save URL in Firestore
  const handleMediaUpload = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `media/${file.name}`); // Reference in Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: handle progress if needed
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          // Once the upload is complete, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          addElement(type, downloadURL); // Save the URL instead of Base64
        }
      );
    }
  };

  return (
    <div className="control-panel">
      <button onClick={() => addElement("text")}>Add Text</button>
      <button onClick={() => imageInputRef.current.click()}>Add Image</button>
      <input
        type="file"
        ref={imageInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => handleMediaUpload(e, "image")}
      />
      <button onClick={() => videoInputRef.current.click()}>Add Video</button>
      <input
        type="file"
        ref={videoInputRef}
        style={{ display: "none" }}
        accept="video/*"
        onChange={(e) => handleMediaUpload(e, "video")}
      />
      <button onClick={() => setCurrentProjectId(null)}>Back to Projects</button>
      <button onClick={saveProject}>Save Project</button>
    </div>
  );
};

export default ControlPanel;
