const exec = require('child_process').exec;

const json_path = "/home/recog/json_dump/match_current.json";
const img_path = "/home/recog/recognition/ui/website/dist/img/";
const rx = /Z_\d+_(.*?)_/g;

var fs = require('fs');
var json = JSON.parse(fs.readFileSync(json_path, 'utf8'));

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
});
