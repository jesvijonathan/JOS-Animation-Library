const fs = require("fs");
const path = require("path");

const cssPath = path.resolve(__dirname, "../dist/jos.css");
// const jsPath = path.resolve(__dirname, "../dist/jos.js");

// Read the contents of the CSS and JS files
const cssContent = fs.readFileSync(cssPath, "utf8");
// const jsContent = fs.readFileSync(jsPath, "utf8");

// Generate the HTML code for the CSS and JS
const cssHTML = `<link rel="stylesheet" href="data:text/css;base64,${Buffer.from(
  cssContent
).toString("base64")}" />`;
// const jsHTML = `<script>${jsContent}</script>`;

// Write the HTML code to a file
const indexPath = path.resolve(__dirname, "../index.html");
const indexContent = fs.readFileSync(indexPath, "utf8");

// Insert the CSS and JS code before the closing </head> tag
const updatedContent = indexContent.replace("</head>", `${cssHTML}\n</head>`);
// Insert the JS initialization code before the closing </body> tag
// const finalContent = updatedContent.replace("</body>", `${jsHTML}\n</body>`);

// Write the updated HTML content back to the file
fs.writeFileSync(indexPath, finalContent, "utf8");
