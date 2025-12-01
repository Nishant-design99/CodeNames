# Firebase Setup Guide

Follow these steps to set up the backend for your Spymaster game.

## 1. Create a Firebase Project
1.  Go to [console.firebase.google.com](https://console.firebase.google.com/).
2.  Click **"Create a project"** (or "Add project").
3.  Enter a name (e.g., `spymaster-game`).
4.  Disable Google Analytics (not needed for this) and click **"Create project"**.
5.  Wait for it to finish and click **"Continue"**.

## 2. Create the Realtime Database
1.  In the left sidebar, expand **Build** and click **Realtime Database**.
2.  Click **"Create Database"**.
3.  Select a location (e.g., `us-central1` or `europe-west1`) and click **Next**.
4.  **IMPORTANT**: Select **"Start in test mode"**.
    *   This allows anyone with the config to read/write for 30 days.
    *   Perfect for development. We can secure it later.
5.  Click **"Enable"**.

## 3. Get Configuration Keys
1.  Click the **Project Overview** (gear icon) in the top left sidebar -> **Project settings**.
2.  Scroll down to the **"Your apps"** section.
3.  Click the **Web** icon (`</>`).
4.  Register the app:
    *   App nickname: `Spymaster Web`
    *   (Optional) Uncheck "Also set up Firebase Hosting" for now.
    *   Click **"Register app"**.
5.  You will see a code block with `const firebaseConfig = { ... }`.
6.  Keep this page open or copy these values.

## 4. Configure Your Local Project
1.  In VS Code, create a new file named `.env` in the root folder (`d:/Projects/Spymaster/.env`).
2.  Copy the content from `.env.example` into `.env`.
3.  Replace the values with the ones from your Firebase console:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=spymaster-game.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://spymaster-game-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=spymaster-game
VITE_FIREBASE_STORAGE_BUCKET=spymaster-game.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:123456...
```

## 5. Restart the App
If your development server is running, restart it (`Ctrl+C` then `npm run dev`) to load the new environment variables.
