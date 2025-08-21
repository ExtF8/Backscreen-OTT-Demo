# Backscreen OTT Demo

A simple OTT-style video browsing and playback application built with **Expo Router**, designed to run on **Android TV emulator**. Users can browse a catalog of movies, view details, and play videos using an intuitive interface.

## Setup & Run on Android TV Emulator

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
    npx expo start
    ```

3. Create and start an Android TV Emulator

    1. Open Android Studio → Device Manager

    2. Create a new virtual device:

    3. Choose TV → Android TV (1080p)

    4. Select a system image (API 36 recommended, with Google APIs)

    5. Start the emulator.

## Libraries Used

expo-router
Provides file-based routing, simplifying navigation between screens.

expo-video
For native video playback. Used to stream .mp4 and .m3u8 videos.

@testing-library/react-native
Used to test components as users would interact with them.

jest-expo
Jest configuration for Expo apps, allowing smooth test setup.

## Running Tests

Run all tests

```bash
npm test
```

Run a single test file

```bash
npm test __tests__/HomeScreen.test.tsx
```

## Known Limitations and TODOs

- D-pad focus handling in grid layout is incomplete

- Focus indicators need better styling for TV navigation

- Basic error handling in video playback

- No transitions or animations between screens

- No persistent state (e.g., watch history or favorites)
