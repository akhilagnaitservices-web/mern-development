const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const srcPath = 'd:\\\\vkss-project\\\\mern-development-vrkss-monorepo (2)\\\\mern-development\\\\frontend\\\\src';
const allFiles = walkSync(srcPath);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Remove import statements for getImageUrl
  content = content.replace(/import\s*\{\s*getImageUrl\s*\}\s*from\s*['"].*?imageHelper['"];?\s*\n?/g, '');
  
  // Replace getImageUrl(foo.bar) with foo.bar.
  content = content.replace(/getImageUrl\(([^)]+)\)/g, '$1');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
  }
});

// Delete imageHelper.js
const imageHelperPath = path.join(srcPath, 'utils', 'imageHelper.js');
if (fs.existsSync(imageHelperPath)) {
  fs.unlinkSync(imageHelperPath);
  console.log('Deleted: ' + imageHelperPath);
}
