import zlib from 'zlib';
import axios from 'axios';
import fs from 'fs';
import { AxiosResponse } from 'axios';
import { Readable } from 'stream';
import sax, { QualifiedTag, SAXStream } from 'sax';

export async function downloadFile(url: string, filePath: string): Promise<void> {
  const response: AxiosResponse<Buffer> = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
      'accept-encoding': 'gzip,deflate',
    },
  })

  return new Promise<void>((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath)
    const inputStream = new Readable({
      read() {
        this.push(response.data)
        this.push(null)
      },
    })

    const gunzip = zlib.createGunzip();
    inputStream.pipe(gunzip).pipe(writeStream)

    gunzip.on('error', (error) => {
      console.error('Error during gunzip:', error)
      reject(error)
    })

    writeStream.on('finish', () => {
      resolve();
    })

    writeStream.on('error', (error) => {
      console.error('Error writing to file:', error)
      reject(error)
    })
  })
}

export function convertXmlToJson(xmlPath: string): Promise<any> {
  const saxStream = sax.createStream(true)
  let jsonData: any = {}

  let currentElement: any = null
  let currentText: string = ''

  saxStream.on('opentag', (node: QualifiedTag) => {
    currentElement = {}
  })

  saxStream.on('text', (text: string) => {
    currentText = text.trim()
  })

  saxStream.on('closetag', (node: QualifiedTag) => {
    currentElement[node.name] = currentText

    currentText = ''

    if (node.name === 'Prices') {
      jsonData = currentElement
    }
  })

  saxStream.on('end', () => {
    console.log('Parsing complete!')
  })

  saxStream.on('error', (err: Error) => {
    console.error('Error parsing XML:', err)
  })

  const stream = fs.createReadStream(xmlPath, { encoding: 'utf8' })

  stream.pipe(saxStream)

  return new Promise((resolve, reject) => {
    stream.on('end', () => {
      resolve(jsonData)
    })

    stream.on('error', (err) => {
      reject(err)
    })
  })
}
