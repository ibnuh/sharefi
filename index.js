const express = require('express')
const args = require('args')
const path = require('path')
const ip = require('ip')
const qrcode = require('qrcode')

const app = express()

args.option('port', 'The port on which the app will be running', 9000).option('terminal', 'Ouput QRCode in terminal')

const flags = args.parse(process.argv)

const file = args.sub[0]
const absolutePath = path.resolve(file)
const filename = path.basename(absolutePath)
const ipAddress = ip.address()

const url = `http://${ipAddress}:${flags.port}/${filename}`
let qrBase64 = ''

if (flags.terminal) {
    qrcode.toString(url, { type: 'terminal' }, function(err, url) {
        console.log(url)
    })
} else {
    qrcode.toDataURL(url, { width: 500 }, function(err, url) {
        qrBase64 = url
    })
}

app.get(`/${filename}`, (req, res) => res.sendFile(absolutePath))
app.get('/qr', (req, res) => {
    var img = Buffer.from(qrBase64.replace(/^data:image\/png;base64,/, ''), 'base64')

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length,
    })
    res.end(img)
})

app.listen(flags.port, () => {
    console.log(`Sharing on ${url}`)
    console.log(`QRCode available on http://${ipAddress}:${flags.port}/qr`)
})
