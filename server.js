import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push } from "firebase/database";

const app = express();
app.use(cors());
app.use(express.json());

const firebaseConfig = {
  apiKey: "AIzaSyCj0DVSi2LKWVEIb0vVBNmBk5kwNKwwJrg",
  authDomain: "storeacounts-d0ca8.firebaseapp.com",
  databaseURL: "https://storeacounts-d0ca8-default-rtdb.firebaseio.com",
  projectId: "storeacounts-d0ca8",
  storageBucket: "storeacounts-d0ca8.firebasestorage.app",
  messagingSenderId: "822442149761",
  appId: "1:822442149761:web:bb1d97c5c5f170ddb10a80"
};

const fbApp = initializeApp(firebaseConfig);
const db = getDatabase(fbApp);

// ✅ Endpoint público para obtener publicaciones
app.get("/api/publicaciones", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "publicaciones"));
    res.json(snapshot.val() || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Endpoint para agregar (solo para panel admin)
app.post("/api/publicar", async (req, res) => {
  try {
    const data = req.body;
    await push(ref(db, "publicaciones"), data);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("✅ Servidor activo en http://localhost:3000"));
