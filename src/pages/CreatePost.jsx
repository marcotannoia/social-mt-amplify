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

      const { data: allPosts } = await client.models.Post.list({ limit: 10000 });
      const nextPostNumber = (allPosts?.items?.length || 0) + 1;
      const fileExtension = file.name.split('.').pop();
      const fileKey = `public/post-${nextPostNumber}.${fileExtension}`;

      await uploadData({
        path: fileKey,
        data: file,
      }).result;

      await client.models.Post.create({
        ownerId: user.userId ?? user?.username,
        imageKey: fileKey,
        caption,
        createdAt: new Date().toISOString(),
      });

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
      {/* Input File Nascosto + Label Stilizzata */}
      <label className="file-input-label">
        <span style={{ fontSize: "20px", marginRight: "8px" }}>📸</span>
        <span>Scegli una foto dalla galleria</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }} // NASCONDE IL BRUTTO INPUT DI DEFAULT
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
        {isPublishing ? "Pubblicazione in corso..." : "Pubblica Post"}
      </button>
    </div>
  );
}