import axios from "axios";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "Provide YouTube URL"
      });
    }

    const start = await axios.get(
      `https://p.savenow.to/ajax/download.php?copyright=0&format=720&url=${encodeURIComponent(url)}&api=dfcb6d76f26a9894jgkege8a4ab232222`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Origin": "https://y2down.cc",
          "Referer": "https://y2down.cc/"
        }
      }
    );

    const id = start.data.id;

    let downloadUrl = null;

    for (let i = 0; i < 10; i++) {
      const progress = await axios.get(
        `https://p.savenow.to/ajax/progress.php?id=${id}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Origin": "https://y2down.cc",
            "Referer": "https://y2down.cc/"
          }
        }
      );

      if (progress.data?.download_url) {
        downloadUrl = progress.data.download_url;
        break;
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    if (!downloadUrl) {
      return res.json({
        status: false,
        message: "Download not ready"
      });
    }

    res.json({
      status: true,
      url: downloadUrl
    });

  } catch (err) {
    res.json({
      status: false,
      error: err.message
    });
  }
}
