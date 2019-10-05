# **[WIP]** Sharefi

Transfer file over local network between devices from terminal

# Installation

1. Clone the repository
2. Run command against the `index.js` file

# Usage

```
$ node index.js file.zip
```

```
Usage: index.js [options] [command]

Commands:
    help     Display help
    version  Display version

Options:
    -h, --help      Output usage information
    -p, --port <n>  The port on which the app will be running (defaults to 9000)
    -t, --terminal  Ouput QRCode in terminal
    -v, --version   Output the version number
```

# Todo

-   [] Tests
-   [] Conver to executable (cli npm link)
-   [] Windows support
-   [] Browser view
-   [] Upload file through browser
-   [] Auth support

# Credits

Inspired by [sdushantha/qr-filetransfer](https://github.com/sdushantha/qr-filetransfer)

# License

MIT
