# MediaSave Pro

A responsive, static GitHub Pages website for downloading direct media-file URLs that the visitor owns or is authorized to save.

## Features
- Premium dark purple responsive design
- Dark/light theme toggle (preference saved in browser local storage)
- Local download history (file name and time only; stays in the visitor's browser)
- SEO title, description, robots.txt and sitemap.xml
- Privacy Policy and Contact pages
- Direct media-file URL download helper

## Important limitations and lawful use
This project does **not** extract videos from Instagram, Facebook, or YouTube post/reel URLs; bypass DRM, login walls, or access controls; or circumvent platform restrictions. Use official platform download/export features where available and download only content you own or have permission to save.

The browser must be able to fetch the direct media URL. Many file hosts block cross-origin browser requests (CORS); those links will fail. This static site does not include a server-side proxy.

## Before publishing
1. Replace `YOUR-USERNAME` in the canonical URL in `index.html` and the URLs in `sitemap.xml` with your GitHub username.
2. Replace `YOUR-EMAIL@example.com` in `contact.html` with an email address you control.
3. Update the date in `privacy.html` if you revise the policy later.
4. Check that the privacy policy accurately describes any services or analytics you add in the future.

## Publish free with GitHub Pages (mobile)
1. Download and extract the ZIP on your phone.
2. Sign in at https://github.com and create a new repository named `mediasave-pro`.
3. Choose **Public**, then create the repository.
4. Open the repository, tap **Add file → Upload files**.
5. Upload the contents of the extracted `MediaSave-Pro` folder (upload files and folders while keeping the `assets` folder structure). Do not upload the ZIP itself as the only repository file.
6. Tap **Commit changes**.
7. Open **Settings → Pages**.
8. Under **Build and deployment**, choose **Deploy from a branch**.
9. Select branch `main` and folder `/(root)`, then save.
10. Wait for GitHub Pages to publish. Your website URL will look like `https://YOUR-USERNAME.github.io/mediasave-pro/`.

## Test
Open the published URL. Try a direct media file URL from a host that explicitly permits browser access and cross-origin requests. Test the theme toggle, download history, privacy and contact pages.

## Note
GitHub Pages hosts static files only. It does not run PHP, Python, Node servers, or private download-proxy APIs.
