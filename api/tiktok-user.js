export default async function handler(req, res) {
  try {
    const { username, count = 12, cursor = 0 } = req.query;

    if (!username) {
      return res.status(400).json({
        status: false,
        message: "username required"
      });
    }

    const response = await fetch("https://www.tikwm.com/api/user/posts", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "accept": "application/json, text/javascript, */*",
        "x-requested-with": "XMLHttpRequest",
        "origin": "https://www.tikwm.com",
        "referer": "https://www.tikwm.com/",
        "user-agent": "Mozilla/5.0"
      },
      body: new URLSearchParams({
        unique_id: username,
        count: count,
        cursor: cursor
      })
    });

    const data = await response.json();

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

  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    });
  }
      }
