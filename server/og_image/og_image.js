const exec = require('child_process').exec;

const json_path = "/home/recog/json_dump/prod/match_current.json";
const img_path = "/home/recog/recognition/ui/website/dist/img/";

const index_template = "/home/recog/recognition/ui/website/dist/index_template.html";
const gallery_path = "/home/recog/recognition/ui/website/dist/gallery/";
const details_path = "/home/recog/recognition/ui/website/dist/details/";

const rx = /Z_\d+_(.*?)_/g;

var fs = require('fs');
var json = JSON.parse(fs.readFileSync(json_path, 'utf8'));

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

json.forEach(function(item) {

  var reuters_filename = item.input.img.split('/').pop().replace("_2_", "_3_").replace("JPG", "jpg");
  var tate_filename = item.output[0].img.split('/').pop();

  var arr = rx.exec(reuters_filename);
  console.log(reuters_filename);
  console.log(rx.exec(reuters_filename));
  var itemId = arr[1];

  var cmd = "convert " + img_path + "reuters/og_image/" + reuters_filename + " " + img_path + "tate/og_image/" + tate_filename + " +append " + img_path + "og_image/" + itemId + ".jpg";
  console.log(cmd);
  exec(cmd);

  fs.readFile(index_template, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    gallery_file = gallery_path + itemId + '.html';

    if(!fileExists(gallery_file)) {
      var result_gallery = data.replace(/__PATH__/g, 'gallery').replace(/__ITEMID__/g, itemId);
      fs.writeFile(gallery_file, result_gallery, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    }

    details_file = details_path + itemId + '.html';
    if(!fileExists(details_file)) {
      var result_details = data.replace(/__PATH__/g, 'details').replace(/__ITEMID__/g, itemId);
      fs.writeFile(details_file, result_details, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    }
  });
});
