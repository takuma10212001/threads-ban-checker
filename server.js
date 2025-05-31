import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/check", async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ status: "異常", message: "トークンがありません" });
  }

  try {
    const apiRes = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,username`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (apiRes.status === 200) {
      res.json({ status: "正常" });
    } else {
      res.json({ status: "異常", code: apiRes.status });
    }
  } catch (err) {
    res.json({ status: "異常", error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
