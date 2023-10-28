#!/bin/bash
# type 'chmod +x bundle.sh' to make this file executable
# type './bundle.sh' to run this file

variable_path="../dev"
npminstall=0

echo ""
echo "Rollup Started"


echo ""
echo "- Creating export directory"
if [ ! -d "./export" ]; then
    mkdir "./export"
fi
if [ ! -d "./original" ]; then
    mkdir "./original"
fi


echo ""

packages=("rollup" "@rollup/plugin-terser" "rollup-plugin-postcss" "@rollup/plugin-node-resolve" "@rollup/plugin-commonjs" "rollup-plugin-sourcemaps")

if [ "$npminstall" -eq 1 ]; then
    echo "- Installing npm packages -------------------"
    echo ""
    
    function IsPackageInstalled() {
        npm list -g "$1" || npm list "$1"
    }

    function InstallPackage() {
        echo "Installing $1..."
        npm install -g "$1"
    }

    for package in "${packages[@]}"; do
        if ! IsPackageInstalled "$package"; then
            InstallPackage "$package"
        else
            echo "$package is already installed."
        fi
    done
else
    echo "- Skipping npm Installation"
fi


echo ""
echo "- Cleaning export directory"
rm export/*.*
rm original/*.*


echo ""
echo "- Copying Orignal files"

# cp "$variable_path/jos.css" original/jos.css
cp "$variable_path/jos.css" original/jos_tmp.css
cp "$variable_path/jos.js" original/jos_tmp.js
# cp "$variable_path/jos.min.css" original/jos.min.css
cp "$variable_path/jos.min.css" original/jos_tmp.min.css
cp "$variable_path/jos.min.js" original/jos_tmp.min.js


echo ""
echo "- jos.css | Copying to jos.debug.css"
cp "original/jos_tmp.css" export/jos.debug.css

echo ""
echo "- jos.css | Minifying to jos.css"
npx rollup -c config/rollup.config_css.mjs

echo ""
echo "- jos.min.css | Minifying to jos.min.css"
npx rollup -c config/rollup.config_css_min.mjs



echo ""
echo "- jos.js | Copying to jos.debug.js"
cp "original/jos_tmp.js" export/jos.debug.js


echo ""
echo "- Adding css auto import to jos.js"
jsFilePath="original/jos_tmp.js"
outputFilePath="original/jos.js"
outputFilePath2="original/jos.min.js"
cp "$jsFilePath" "$outputFilePath2"
echo "import \"./jos.min.css\";" >> "$outputFilePath2"
cp "$jsFilePath" "$outputFilePath"
echo "import \"./jos.css\";" >> "$outputFilePath"

echo ""
echo "- jos.js | Minifying to jos.js"
npx rollup -c config/rollup.config_js.mjs
cp "original/jos_tmp.min.js" export/jos.js

mv "original/jos.js" export/jos.js
mv "original/jos.css" export/jos.css

mv "original/jos_tmp.js" original/jos.js
mv "original/jos_tmp.css" original/jos.css

echo ""
echo "- jos.min.js | Minifying to jos.min.js"
# cp "original/jos.js" original/jos.min.js
npx rollup -c config/rollup.config_js_min.mjs
cp "original/jos_tmp.min.js" export/jos.min.js

mv "original/jos.min.js" export/jos.min.js
mv "original/jos.min.css" export/jos.min.css

mv "original/jos_tmp.min.js" original/jos.min.js
mv "original/jos_tmp.min.css" original/jos.min.css

# mv "original/jos.min.css" export/jos.css
# mv "original/jos.min.js" export/jos.js




# echo ""
# echo "- jos.js | Processing to jos.full.js"
# # cp "$variable_path/jos.full.js" export/jos.full.js
# npx rollup -c config/rollup.config_full.mjs

# echo ""
# echo "- jos.js | Minifying to jos.full.min.js"
# npx rollup -c config/rollup.config_full_min.mjs

# rm "$outputFilePath"
