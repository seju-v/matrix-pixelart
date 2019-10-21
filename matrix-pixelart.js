'use-strict';

// made for .ppm files
// tested with gimp
// you'll have to scale down the resolution a lot
// and moreover, reduce the height even more to not fuck up the aspect ratio
// enjoy

let fs = require('fs');
let ppm = fs.readFileSync(process.argv[2], 'utf8');
let ppmlines = ppm.split(/\r\n|\n|\r/gm);
let width = ppmlines[2].split(" ")[0]; // in my case, the width was the first number in the third slot of the array

const startoffset = 4; // gimp
// const startoffset = 13; // magick
const endoffset = 1;

let hexstring;
for (let i = 0; i < ppmlines.length - startoffset - endoffset; i++ ) {
	if (i % 3 == 0) {
		hexstring += "#";
	}
	let pigment = '00' + Number(ppmlines[i + startoffset]).toString(16);
	hexstring += pigment.slice(-2); // padding
	pigment.delete;
	if ((i + 1) % (width * 3) == 0) {
		hexstring += " "; // separates each row
	}
}

let lines = hexstring.split(" ");
let formatted_body = '';

for (let j = 0; j < lines.length - 1; j++) {
	let line = lines[j].match(/#\w+/gm);
	for (let k = 0; k < width; k++) {
		formatted_body += '<font color="' + line[k] +'">█</font>';
	}
	formatted_body += '<br>';
}

process.stdout.write(JSON.stringify({
	'body': '[pixelart]',
	'format': 'org.matrix.custom.html',
	'formatted_body': formatted_body,
	'msgtype': 'm.text'
}))
