/**
 * 
 * @param {Object} myData - json object to be downloaded
 * @param {String} type - svg, json
 * @param {String} filename - name of initial file to be downloaded
 */
export default async function download_helper(myData, type, filename){
  let donwload_filename = filename
  let blob

  switch (type) {
    case 'json':
      let json = JSON.stringify(myData, undefined, 2);
      blob = new Blob([json], { type: 'application/json' });
      donwload_filename = (filename.endsWith('.json')) ? filename : filename + ".json"
      break
    case 'svg':
      blob = new Blob([myData], { type: 'image/svg+xml' });
      donwload_filename = (filename.endsWith('.svg')) ? filename : filename + ".svg"
      break
    default:
      blob = new Blob([myData], { type: 'application/octet-stream' });
  }
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = donwload_filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}