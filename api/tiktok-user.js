import axios from "axios";

export default async function handler(req, res) {
  try {
    const { username, count = 12, cursor = 0 } = req.query;

    if (!username) {
      return res.status(400).json({
        status: false,
        message: "username required"
      });
    }

    const response = await axios({
      method: "POST",
      url: "https://www.tikwm.com/api/user/posts",
      headers: {
        "accept": "application/json, text/javascript, */*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "origin": "https://www.tikwm.com",
        "referer": "https://www.tikwm.com/",
        "x-requested-with": "XMLHttpRequest",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 11; TECNO KF6p) AppleWebKit/537.36 Chrome/137.0.0.0 Mobile Safari/537.36",

        // important
        "cookie":
          "current_language=en"
      },
      data: new URLSearchParams({
        unique_id: username,
        count: count,
        cursor: cursor
      })
    });

    const data = response.data;

    const videos = data.data.videos.map(v => ({
      id: v.video_id,
      title: v.title,
      duration: v.duration,
      cover: "https://www.tikwm.com" + v.cover,
      video: "https://www.tikwm.com" + v.play,
      video_wm: "https://www.tikwm.com" + v.wmplay,
      music: "https://www.tikwm.com" + v.music
    }));

    res.json({
      creator: "Denish",
      status: true,
      total: videos.length,
      videos
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
}
