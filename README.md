# Publishing Your PWA to the Google Play Store

This guide will walk you through packaging your Progressive Web App (PWA) into an Android App Bundle (`.aab`) ready for the Google Play Store. We will use the **Trusted Web Activity (TWA)** standard, which allows your web app to run in a full-screen Chrome browser instance, providing a native look and feel.

The official tool for this process is **Bubblewrap**, a command-line utility from Google.

---

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
1.  **Node.js and npm:** [Download Node.js](https://nodejs.org/)
2.  **Java Development Kit (JDK):** Version 8 or later. [Download JDK](https://www.oracle.com/java/technologies/downloads/)
3.  **Android Studio:** You need the Android SDK, which comes with Android Studio. [Download Android Studio](https://developer.android.com/studio)
4.  **Bubblewrap CLI:** Install it globally via npm:
    ```bash
    npm install -g @bubblewrap/cli
    ```

---

### Step 1: Host Your Web App (The No-Domain Solution)

Your PWA must be hosted on a live server accessible via **HTTPS**. You don't need to buy a domain; you can use a free service like **Netlify**.

1.  **Sign Up for Netlify:**
    *   Go to [netlify.com](https://www.netlify.com/) and sign up for a free account.

2.  **Prepare Your Project Folder:**
    *   Make sure all your files (`index.html`, `manifest.json`, `service-worker.js`, `components/`, etc.) are in a single folder on your computer.

3.  **Deploy Your Site:**
    *   Log in to your Netlify account.
    *   Go to the "Sites" page.
    *   Drag and drop your entire project folder onto the deployment area on the page.
    *   Netlify will automatically build and deploy your site in seconds.

4.  **Get Your URL:**
    *   Once deployed, Netlify will assign you a free URL, like `https_//_unique-name-12345.netlify.app`.
    *   This is your app's public URL. You can customize the "unique-name" part in `Site settings > Domain management`.
    *   Keep this URL handy. This is the URL you will use for the rest of this guide.

---

### Step 2: Prepare App Icons

For the best experience on Android, you need PNG versions of your app icon. The `manifest.json` has been updated to reference `icon-192.png` and `icon-512.png`.

*   Create these two PNG files from your `icon.svg` and place them in the root directory of your project folder before you deploy to Netlify.

---

### Step 3: Configure Digital Asset Links

To prove you own the website and to enable the full-screen TWA (without the browser address bar), you must set up a Digital Asset Links file.

1.  **Get Your SHA-256 Fingerprint:**
    You will get your app's signing key fingerprint from the **Google Play Console** after you upload your app for the first time. Go to your app's `Setup > App integrity` section to find the "SHA-256 certificate fingerprint" under the "App signing key certificate" tab.

2.  **Update `assetlinks.json`:**
    Open the `.well-known/assetlinks.json` file and replace the placeholder values:
    *   `com.your.package_name`: This will be the unique package name for your app (e.g., `app.samtasts.android`). You will define this in the next step.
    *   `YOUR_SHA256_FINGERPRINT`: Paste the SHA-256 fingerprint you copied from the Play Console here.

3.  **Deploy the updated file:**
    *   After updating `assetlinks.json`, re-deploy your project folder to Netlify by dragging and dropping it again. This will ensure the live site has the correct verification file.
    *   Verify it's working by navigating to `https://your-site-name.netlify.app/.well-known/assetlinks.json`.

---

### Step 4: Generate the Android App with Bubblewrap

Now, let's use Bubblewrap to generate the Android project files.

1.  **Initialize the project:**
    Open your terminal and run the `init` command, pointing to your live `manifest.json` on Netlify:
    ```bash
    bubblewrap init --manifest https://your-site-name.netlify.app/manifest.json
    ```
    *(Replace `your-site-name.netlify.app` with your actual Netlify URL.)*

2.  **Answer the prompts:**
    Bubblewrap will ask you a series of questions. Pay close attention to:
    *   **Application ID (package name):** Choose a unique ID, like `app.samtasts.android`. Make sure this matches what you used in `assetlinks.json`.
    *   **Signing key creation:** Bubblewrap will help you create a new keystore to sign your app. **Safely back up the password and the generated `keystore.jks` file! You will need it for all future app updates.**

3.  **Build the Android App Bundle:**
    Once initialization is complete, run the build command:
    ```bash
    bubblewrap build
    ```

---

### Step 5: Publish to the Google Play Store

The build command will generate an `app-release.aab` file. This is the **Android App Bundle** you will upload to the Play Store.

1.  Go to the [Google Play Console](https://play.google.com/console).
2.  Create a new app, fill out the store listing details (description, screenshots, etc.).
3.  Go to the "Production" tab (or "Closed testing" for a test run) and create a new release.
4.  Upload the `app-release.aab` file.
5.  Review the release summary and roll it out!

You've successfully packaged your PWA for the Play Store!