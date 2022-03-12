
import fs from "fs";
import errorConsole from "../logger/errorConsole";

// const TOKEN = process.env.DROPBOX_TOKEN


const { google } = require('googleapis');
const path = require('path');


const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04uYAwkv43TBZCgYIARAAGAQSNwF-L9IrAnHmvgstPvTcOnLbtgx_q_z0cNdwhz2UmyjsOkpihtoh3oCkyJSc7gG0KvgBLNlM7Zc';

const oauth2Client = new google.auth.OAuth2(
  "702696747893-2t09l1ieh4nk65iq3b894cf0sierb3bl.apps.googleusercontent.com",
  "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",
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const filePath = path.join(__dirname, "..", 'a.jpg');

export function uploadFileDrive(filePath: string, fileName: string) {
  return new Promise<string | boolean>(async (resolve, reject)=> {
    try {
      const response = await drive.files.create({
        requestBody: {
          originalFilename: true,
          parents: ["18KEvGRRf8Lp3W09CDHSGQOvjV_WLUoST"],
          name: fileName, //This can be name of your choice
          mimeType: 'text/markdown',
        },
        media: {
          mimeType: 'application/octet-stream',
          // body: "content",
          body: fs.createReadStream(filePath),
        },
      });
  
      let fileID = response.data.id
      if(fileID){
         resolve(fileID)
      } else {
        resolve(false)
      }
      
      // let data: any = await generatePublicUrl(fileID)
      // resolve(data.webContentLink)
      
    } catch (error) {
      errorConsole(error)
      resolve(false)
    }
  })
}


function generatePublicUrl(fileID: string) {
  return new Promise(async (resolve, reject)=>{
    try {
      await drive.permissions.create({
        fileId: fileID,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      
      /*
      webViewLink: View the file in browser
      webContentLink: Direct download link
      */
      const result = await drive.files.get({
        fileId: fileID,
        // fields: 'webViewLink, webContentLink',
        fields: 'webContentLink',
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  })
}


export function listFiles() {
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      files.map((file) => {
        (async function (){
          let doc = await deleteDriveFile(file.id)
          console.log(doc)
        }())
      });
    } else {
      console.log('No files found.');
    }
  });
}


export async function deleteDriveFile(fileId) {
  try {
    const response = await drive.files.delete({
      fileId: fileId
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

//
// export function getFileMeta(filePath: string){
//   return new Promise(async (resolve, reject)=>{
//     try{
//
//       let r = await axios.post("https://api.dropboxapi.com/2/files/get_metadata", {
//         path: "/" + filePath,
//         "include_media_info": false,
//         "include_deleted": false,
//         "include_has_explicit_shared_members": false
//       }, {
//         headers: {
//           'Authorization': `Bearer ${TOKEN}`,
//         }
//       })
//       resolve(r.data)
//
//     } catch (ex){
//       reject(ex)
//     }
//
//   })
//
// }
//
// export function getFiles(dirPath){
//   return new Promise<any[]>(async (resolve, reject)=>{
//     try{
//       let r : any = await axios.post("https://api.dropboxapi.com/2/files/list_folder", {
//         path: dirPath,
//         "recursive": false,
//         "include_media_info": false,
//         "include_deleted": false,
//         "include_has_explicit_shared_members": false
//       }, {
//         headers: {
//           'Authorization': `Bearer ${TOKEN}`,
//         }
//       })
//       if(r.status === 200) {
//         if(r.data){
//           resolve(r.data.entries)
//         } else {
//           resolve(null)
//         }
//       } else {
//         resolve(null)
//       }
//
//     } catch (ex){
//       errorConsole(ex)
//       reject(ex)
//     }
//
//   })
//
// }

//
// export function deleteFile(filePath){
//   return new Promise(async (resolve, reject)=>{
//     try{
//       let r = await axios.post("https://api.dropboxapi.com/2/files/delete_v2", {
//         path: "/" + filePath
//       },{
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization': `Bearer ${TOKEN}`
//         }
//       })
//       resolve(r.data.metadata)
//     } catch (ex){
//       errorConsole(ex)
//       reject(ex)
//     }
//
//   })
// }
//
// export function uploadFile2(filePath: string, fileName: string){
//   return new Promise(async (resolve, reject)=>{
//     try{
//       fs.readFile(filePath, 'utf8', function (err, data) {
//         const reqq = https.request('https://content.dropboxapi.com/2/files/upload', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${TOKEN}`,
//             'Dropbox-API-Arg': JSON.stringify({
//               'path': `/Apps/markdown-static/${fileName}`,
//               'mode': 'overwrite',
//               'autorename': true,
//               'mute': false,
//               'strict_conflict': false
//             }),
//             'Content-Type': 'application/octet-stream',
//           }
//         }, (response) => {
//           console.log("statusCode: ", response.statusCode);
//           console.log("headers: ", response.headers);
//
//           response.on('data', function(d) {
//             process.stdout.write(d);
//             // res.send(d)
//           });
//         });
//
//         reqq.write(data);
//         reqq.end();
//       });
//
//     } catch (ex){
//       reject(ex)
//     }
//
//   })
//
// }
//
// export function updateFile(fileContent: string, filePath: string){
//   return new Promise(async (resolve, reject)=>{
//     try{
//       let mdFileContent = fileContent
//
//       const Readable = require("stream").Readable;
//       let stream = new Readable()
//       stream.push(mdFileContent)
//       stream.push(null)
//       stream.on("data", (chunk)=>{
//         const reqq = https.request('https://content.dropboxapi.com/2/files/upload', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${TOKEN}`,
//             'Dropbox-API-Arg': JSON.stringify({
//               'path': '/' + filePath,
//               'mode': 'overwrite', // force
//               'autorename': true,
//               'mute': false,
//               'strict_conflict': false
//             }),
//             'Content-Type': 'application/octet-stream',
//           }
//         }, (response) => {
//           if(response.statusCode === 200){
//             response.on('data', function(d) {
//               resolve(d.toString())
//             });
//             response.on("error", ()=>{
//               reject(new Error("File upload fail"))
//             })
//           } else {
//             reject(new Error("File upload fail"))
//           }
//         });
//
//         reqq.write(chunk);
//         reqq.end();
//       })
//     } catch (ex){
//       reject(ex)
//     }
//
//   })
//
// }
//
// export function downloadFile(filePath: string){
//
//   return new Promise(async (resolve, reject)=>{
//     try{
//       // get file content
//       let r = await axios.get("https://content.dropboxapi.com/2/files/download", {
//         headers:{
//           "Authorization": `Bearer ${TOKEN}`,
//           // "Authorization": "Bearer Al_mcvNg--wAAAAAAAAAAf6ashy8WmJ-pheH6SYQJxwSMT3Bu789WUQBGQe_46xE",
//
//           "Dropbox-API-Arg": JSON.stringify({
//             "path": "/" + filePath
//           })
//         }
//       })
//       resolve(r.data)
//
//     } catch (ex){
//       errorConsole(ex)
//       reject(ex)
//     }
//
//   })
//
// }
