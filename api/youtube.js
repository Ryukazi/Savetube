import axios from "axios";

export default async function handler(req, res) {

  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Missing YouTube URL"
    });
  }

  try {

    const ts = Date.now();

    const payload = new URLSearchParams({
      sf_url: url,
      _ts: ts,
      _tsc: 0,
      _s: "a280aae60766fe685c3b8e80af7ac0bd3a7a95a21d3e199b5b74f1930193e1fe"
    });

    const response = await axios.post(
      "https://ytb.rip/api/convert",
      payload,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "origin": "https://ytb.rip",
          "referer": "https://ytb.rip/en8/",
          "user-agent": "Mozilla/5.0"
        }
      }
    );

    const data = response.data;

    return res.json({
      status: true,
      creator: "Denish Tharu",
      result: data
    });

  } catch (error) {

    return res.status(500).json({
      status: false,
      error: error.message
    });

  }

}
