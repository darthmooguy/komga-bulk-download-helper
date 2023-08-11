# Komga bulk download helper

---

### New menus in ui:

-   "Download book links" button besides the "Download" button for series and read lists.

Clicking on the "Download book links" button will download a text file containing links for every book in the series or read list.

The contents of the file will look like this:

```plaintext
http://komga.example.com/api/v1/books/0D7V05JFYVZTM/file
http://komga.example.com/api/v1/books/0D7V05JFYVZTP/file
http://komga.example.com/api/v1/books/0D7V05JG2VK96/file
http://komga.example.com/api/v1/books/0D7V05JG2VK9B/file
```

You can then use this file with `wget` for example, or paste it's contents in JDownloader.

### Installation

Requires tampermonkey or any other supported userscript manager.

-   Build or download the latest version from release page
-   Import the file into script manager
-   Set `@include` to the komga server url you want to download from. (You can add more than one `@include` for multiple servers)
