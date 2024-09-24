import React, { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import "./ControlPanel.css";

const ControlPanel = ({ addElement, setCurrentProjectId, saveProject, isSaving }) => {
  const [loading, setLoading] = useState(false); // Loading state for file uploads
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Upload image or video to Firebase Storage and save URL in Firestore
  const handleMediaUpload = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true); // Show loading spinner
      const storageRef = ref(storage, `media/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle upload progress
        },
        (error) => {
          console.error("Upload failed:", error);
          setLoading(false); // Hide loading spinner on error
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          addElement(type, downloadURL); // Save the URL in the project
          setLoading(false); // Hide loading spinner after upload
        }
      );
    }
  };

  return (
    <div className="control-panel">
      {(loading || isSaving) && (
        <div className="loading-overlay">
          {loading && <p>Uploading...</p>}
          {isSaving && <p>Saving Project...</p>}
        </div>
      )}
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
