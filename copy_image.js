const fs = require('fs');
const path = require('path');

const files = [
  {
    srcs: [
      'C:\\Users\\Seongwon\\.gemini\\antigravity-ide\\brain\\1a19f3c7-fdb3-42cb-9f50-40d920da1ba2\\media__1780839568292.jpg',
      'C:\\Users\\Seongwon\\.gemini\\antigravity-ide\\brain\\1a19f3c7-fdb3-42cb-9f50-40d920da1ba2\\media__1780839342361.jpg'
    ],
    dest: 'c:\\Users\\Seongwon\\.vscode\\.vscode\\portfolio\\portfolio_final\\teamproject_fianl.jpg'
  }
];

files.forEach(file => {
  try {
    let copied = false;
    for (const src of file.srcs) {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, file.dest);
        console.log(`Successfully copied ${path.basename(src)} to ${path.basename(file.dest)}`);
        copied = true;
        break;
      }
    }
    if (!copied) {
      console.log(`No source files existed for ${path.basename(file.dest)}`);
    }
  } catch (err) {
    console.error(`Error copying ${path.basename(file.dest)}:`, err);
  }
});
