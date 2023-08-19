[![Codacy Badge](https://app.codacy.com/project/badge/Grade/7842944ada6b4c7ebb4f9dc83ed6a654)](https://app.codacy.com/gh/django-files/web-extension/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Test](https://github.com/django-files/web-extension/actions/workflows/test.yaml/badge.svg)](https://github.com/django-files/web-extension/actions/workflows/test.yaml)
# Django Files Chrome Extension

Upload Files Directly from Google Chrome or FireFox Web Browser to [Django Files](https://github.com/django-files/django-files)

_Work in Progress_

## Table of Contents

*   [Features](#features)
*   [Chrome Install](#chrome-install)
*   [FireFox Install](#firefox-install)
*   [Configure](#configure)
*   [Known Issues](#known-issues)

## Features

-   View Recent Uploads on Popup
-   Right Click to Upload any Image, Video, or Audio
-   Right Click to Shorten any URL

## Chrome Install

1.  Download the latest release: https://github.com/django-files/web-extension/releases/latest/download/chrome.zip
1.  Unzip the archive, place the folder where it must remain and note its location for later.
1.  Open Chrome, click the `3 dots` in the top right, click `Extensions`, click `Manage Extensions`.
1.  In the top right, click `Developer Mode` then on the top left click `Load unpacked`.
1.  Navigate to the folder you extracted in step #3 then click `Select Folder`.

The addon should now be installed and running in Chrome. 

## FireFox Install

This **does not** work on Release FireFox! You must use ESR, Development, or Nightly.  
Recommended, FireFox Extended Support Release: https://www.mozilla.org/en-CA/firefox/all/#product-desktop-esr  

1.  Download the latest release: https://github.com/django-files/web-extension/releases/latest/download/firefox.zip
1.  Open `about:config` search for `xpinstall.signatures.required` and set to `false`.
1.  Open `about:addons` and drag the zip file to the page or choose Install from File from the Settings Wheel.

The addon should now be installed and running in FireFox.


## Configure

1.  Click the `Puzzle Piece` in the top right corner, find `Django Files` and click the `Pin` icon.
1.  Click on the `Django Files icon` and click on `Open Options`.
1.  Log in to your Django Files instance, and select `Copy URL` from the menu in the top right.
1.  Go back to the Django Files Options tab and paste the `URL` into the URL box.
1.  Repeat #3 and #4 for Auth Token and then click `Save Settings`!

The addon should now be configured to work with your Django Files instance.

Now clicking the `Django Files icon` should show your most recent uploads.  
You can also right-click on any Image, Video, Audio, or URL upload to Django Files or Shorten URL.  

## Known Issues

### Chrome

-   After uploading a file or creating a short url, the url is not always copied to the clipboard.

### FireFox

-   Notifications are not showing up after you upload a file or create a short url.
-   A green dot appears on popup icon on page loads that says `Permission needed` on mouseover.
