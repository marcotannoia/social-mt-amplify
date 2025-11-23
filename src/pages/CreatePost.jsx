import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadData } from "aws-amplify/storage";   
import { generateClient } from "aws-amplify/data";  



const client = generateClient();

export default function CreatePost({ user }) {
  const [file, setFile] = useState(null); //quale file è stato selezionato, inizialmente nessuno
  const [previewUrl, setPreviewUrl] = useState(""); //serve per mostrare l'anteprima dell'immagine selezionata
  const [caption, setCaption] = useState(""); // in pratica la didascalia del post, inizialmente vuota
  const [isPublishing, setIsPublishing] = useState(false); // serve per disabilitare il pulsante durante la pubblicazione, in pratica mentre pubblico il bottone scompare
  const [error, setError] = useState(""); // per mostrare eventuali errori all'utente

  const navigate = useNavigate(); // funzione standard che velociza la navigazione tra pagine

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

      setIsPublishing(true); //immagine selezionata, inizio pubblicazione
      setError("");

      // 1) carico l'immagine su S3
      const fileKey = `public/${Date.now()}-${file.name}`;

      await uploadData({ // fa capire come vengono memorizzati su S3 i file
        path: fileKey,
        data: file,
      }).result;

      // 2) creo il record Post nel DB Amplify
      await client.models.Post.create({
        ownerId: user.userId ?? user?.username, // ? serve per mandare a schermo un UNDEFINED qualora non esista userId
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
