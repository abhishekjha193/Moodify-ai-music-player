# 🎧 Moodify – Real Time Emotion Aware Music Player

Moodify is a **real-time emotion-aware music player** that uses your **webcam to detect facial expressions** and automatically plays music based on your mood.
It leverages **MediaPipe facial landmark detection** and **React** to analyze emotions directly in the browser and create a personalized listening experience.

---

## ✨ Features

* 🎥 **Real-Time Facial Emotion Detection**
* 🧠 **AI-based Emotion Classification**
* 🎵 **Automatic Mood-Based Music Playback**
* ⚡ **Real-Time Browser Processing**
* 😊 Detects emotions such as:

  * Happy
  * Sad
  * Surprised
  * Neutral

---

## 🛠 Tech Stack

| Technology | Purpose                        |
| ---------- | ------------------------------ |
| React      | Frontend UI                    |
| MediaPipe  | Facial landmark detection      |
| JavaScript | Emotion classification logic   |
| Web APIs   | Webcam access & media playback |
| HTML / CSS | UI design                      |

---

## 🧠 How It Works

1. The application **accesses the user's webcam** using browser APIs.
2. **MediaPipe Face Landmarker** detects **468 facial landmarks** in real time.
3. Facial expressions are analyzed using **blendshape scores**.
4. A **classification algorithm** determines the user's emotion.
5. Based on the detected mood, **Moodify automatically plays matching music**.

---

## 🎯 Emotion → Music Mapping

| Emotion   | Music Type      |
| --------- | --------------- |
| Happy     | Upbeat / Pop    |
| Sad       | Calm / Acoustic |
| Surprised | Energetic       |
| Neutral   | Chill / Lo-fi   |

---

## 📸 Screenshots
<img width="1146" height="516" alt="image" src="https://github.com/user-attachments/assets/c38a43e1-2c94-4434-b2a1-2a179ee91bcf" />
<img width="1506" height="830" alt="image" src="https://github.com/user-attachments/assets/0bc093ba-a8fd-4f54-b3e2-9181d9b3d68f" />

```
/screenshots/mood-detection.png
/screenshots/music-player.png
```

---

## 🚀 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/moodify-emotion-music-player.git
```

Navigate to the project folder:

```bash
cd moodify-emotion-music-player
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The app will run at:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
moodify/
│
├── Backend/
│   │
│   ├── src/
│   │   ├── config/                 # DB + Redis config
│   │   │   ├── db.js
│   │   │   └── redis.js
│   │   │
│   │   ├── controllers/            # Request handling logic
│   │   │   ├── auth.controller.js
│   │   │   └── song.controller.js
│   │   │
│   │   ├── middleware/             # Middlewares
│   │   │   ├── auth.middleware.js
│   │   │   └── upload.middleware.js
│   │   │
│   │   ├── models/                 # MongoDB schemas
│   │   │   ├── user.model.js
│   │   │   └── song.model.js
│   │   │
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.routes.js
│   │   │   └── song.routes.js
│   │   │
│   │   ├── services/               # External services (ImageKit)
│   │   │   └── imagekit.service.js
│   │   │
│   │   ├── utils/                  # Helper functions
│   │   │   └── token.js
│   │
│   ├── app.js                      # Express app config
│   ├── server.js                   # Server start
│   ├── package.json
│   └── .env
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/             # UI components
│   │   │   ├── Player.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SongCard.jsx
│   │   │
│   │   ├── pages/                  # Screens
│   │   │   ├── Home.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── context/                # Global state
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/               # API calls
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │
│   ├── package.json
│
├── README.md
└── .gitignore

```

---

## 🔮 Future Improvements

* 🎧 Integration with **Spotify API**
* 🤖 More advanced **emotion classification models**
* 📊 Mood analytics dashboard
* 🎶 Personalized music recommendations

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Abhishek Jha**

If you like this project, don't forget to ⭐ the repository!
