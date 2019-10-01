const express = require('express')
const args = require('args')
const path = require('path')
const ip = require('ip')
const qrcode = require('qrcode')

args.option('port', 'The port on which the app will be running', 9000).option('terminal', 'Ouput QRCode in terminal')
const flags = args.parse(process.argv)

const file = args.sub[0]
const absolutePath = path.resolve(file)
const filename = path.basename(absolutePath)
const ipAddress = ip.address()

const url = `http://${ipAddress}:${flags.port}`
const shareUrl = `${url}/${filename}`

if (flags.terminal) {
    qrcode.toString(shareUrl, { type: 'terminal' }, (err, url) => {
        console.log(url)
    })
}

let qr = ''
qrcode.toDataURL(shareUrl, { width: 500 }, (err, url) => {
    qr = url
})

const app = express()
app.get(`/${filename}`, (req, res) => res.sendFile(absolutePath))
app.get('/qr', (req, res) => {
    let img = Buffer.from(qr.replace(/^data:image\/png;base64,/, ''), 'base64')
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length,
    })
    res.end(img)
})

app.listen(flags.port, () => {
    console.log(`Sharing on ${shareUrl}`)
    console.log(`QRCode available on ${url}/qr`)
})
