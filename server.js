import axios from "axios";

export default async function handler(req, res) {

  const { url, format } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Missing url parameter"
    });
  }

  try {

    const response = await axios.get(
      "https://p.savenow.to/ajax/download.php",
      {
        params: {
          copyright: 0,
          format: format || "720",
          url: url,
          api: "dfcb6d76f26a9894jgkege8a4ab232222"
        },
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",

          "Origin": "https://y2down.cc",
          "Referer": "https://y2down.cc/",

          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",

          "Content-Type": "application/json",

          "Sec-Ch-Ua": `"Chromium";v="137", "Not/A)Brand";v="24"`,
          "Sec-Ch-Ua-Mobile": "?1",
          "Sec-Ch-Ua-Platform": `"Android"`,

          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",

          "X-Requested-With": "XMLHttpRequest",

          "Cookie":
            "loader_session=Or2NCfVIOLCcAXFF05XlzdNjBFa04V4Sl8EwOSR"
        }
      }
    );

    res.status(200).json({
      status: true,
      result: response.data
    });

  } catch (error) {

    res.status(500).json({
      status: false,
      error: error.message
    });

  }
          }
