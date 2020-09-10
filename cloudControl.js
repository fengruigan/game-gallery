const fs = require('fs'),
      path = require('path'),
      {Storage} = require('@google-cloud/storage')
    //   config = require('./config')

async function connectCloud() {
    // const gc = new Storage({
    //     credentials: config.credentials,
    //     projectId: config.projectId
    // });
    const gc = new Storage({
        keyFilename: path.join(__dirname, "handy-bonbon-288604-8ff6e1dc52bc.json"),
        projectId: "handy-bonbon-288604"
    })

    try {
        gc.getBuckets()
        console.log('Connected to Google Cloud')
    } catch {
        throw Error('Not connected to Google Cloud')
    }
}

async function listFiles(bucketName="indie-gallery"){
    // const gc = new Storage({
    //     credentials: config.credentials,
    //     projectId: config.projectId
    // });
    const gc = new Storage({
        keyFilename: path.join(__dirname, "handy-bonbon-288604-8ff6e1dc52bc.json"),
        projectId: "handy-bonbon-288604"
    })

    const [files] = await gc.bucket(bucketName).getFiles();

    files.forEach(file => {
        console.log(file.name);
    });
}

async function uploadFile(bucketName='indie-gallery' ,filename) {
    // const gc = new Storage({
    //     credentials: config.credentials,
    //     projectId: config.projectId
    // });
    const gc = new Storage({
        keyFilename: path.join(__dirname, "handy-bonbon-288604-8ff6e1dc52bc.json"),
        projectId: "handy-bonbon-288604"
    })
    // Uploads a local file to the bucket
    await gc.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });
  
    console.log(`${filename} uploaded to ${bucketName}.`);
}

async function uploadDirectory(bucketName="indie-gallery", directoryPath) {
    // const gc = new Storage({
    //     credentials: config.credentials,
    //     projectId: config.projectId
    // });
    const gc = new Storage({
        keyFilename: path.join(__dirname, "handy-bonbon-288604-8ff6e1dc52bc.json"),
        projectId: "handy-bonbon-288604"
    })
    const fileList = []

    // get the list of files from the specified directory
    let dirCtr = 1;
    let itemCtr = 0;
    const pathDirName = path.dirname(directoryPath);

    getFiles(directoryPath);

    function getFiles(directory) {
      fs.readdir(directory, (err, items) => {
        dirCtr--;
        itemCtr += items.length;
        items.forEach(item => {
          const fullPath = path.join(directory, item);
          fs.stat(fullPath, (err, stat) => {
            itemCtr--;
            if (stat.isFile()) {
              fileList.push(fullPath);
            } else if (stat.isDirectory()) {
              dirCtr++;
              getFiles(fullPath);
            }
            if (dirCtr === 0 && itemCtr === 0) {
              onComplete();
            }
          });
        });
      });
    }

    async function onComplete() {
      const resp = await Promise.all(
        fileList.map(filePath => {
          let destination = path.relative(pathDirName, filePath);
          // If running on Windows
          if (process.platform === 'win32') {
            destination = destination.replace(/\\/g, '/');
          }
          return gc
            .bucket(bucketName)
            .upload(filePath, {destination})
            .then(
              uploadResp => ({fileName: destination, status: uploadResp[0]}),
              err => ({fileName: destination, response: err})
            );
        })
      );

      const successfulUploads =
        fileList.length - resp.filter(r => r.status instanceof Error).length;
      console.log(
        `${successfulUploads} files uploaded to ${bucketName} successfully.`
      );
    }
}

async function deleteFile(bucketName='indie-gallery', filename) {
    // const gc = new Storage({
    //     credentials: config.credentials,
    //     projectId: config.projectId
    // });
    const gc = new Storage({
        keyFilename: path.join(__dirname, "handy-bonbon-288604-8ff6e1dc52bc.json"),
        projectId: "handy-bonbon-288604"
    })
    // Deletes the file from the bucket
    await gc.bucket(bucketName).file(filename).delete();

    console.log(`gs://${bucketName}/${filename} deleted.`);
  }

module.exports = {
    connectCloud, listFiles, uploadFile, uploadDirectory, deleteFile
}

async function listDirectory(bucketName='indie-gallery', directory) {

}