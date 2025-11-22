import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadData } from "aws-amplify/storage";   
import { generateClient } from "aws-amplify/data";  



const client = generateClient();

export default function CreatePost({ user }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setError("");
  };

  const handlePublish = async () => {
    try {
      if (!file) {
        setError("Seleziona prima una foto.");
        return;
      }

      setIsPublishing(true);
      setError("");

      // 1) carico l'immagine su S3
      const fileKey = `public/${Date.now()}-${file.name}`;

      await uploadData({
        path: fileKey,
        data: file,
      }).result;

      // 2) creo il record Post nel DB Amplify
      await client.models.Post.create({
        ownerId: user.userId ?? user?.username,
        imageKey: fileKey,
        caption,
        createdAt: new Date().toISOString(),
      });

      // 3) torno alla home
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Errore nella pubblicazione del post.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
  <div className="create-post-form">
    <h3 style={{ marginBottom: "8px" }}>Crea un nuovo post</h3>

    <label className="file-input-label">
      <span>Scegli una foto</span>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </label>

    {previewUrl && (
      <div className="image-preview">
        <img src={previewUrl} alt="preview" />
      </div>
    )}

    <textarea
      className="caption-input"
      placeholder="Scrivi una descrizione..."
      value={caption}
      onChange={(e) => setCaption(e.target.value)}
    />

    {error && <p className="error-message">{error}</p>}

    <button
      className="primary-btn"
      onClick={handlePublish}
      disabled={isPublishing}
    >
      {isPublishing ? "Pubblico..." : "Pubblica"}
    </button>
  </div>
);
}
