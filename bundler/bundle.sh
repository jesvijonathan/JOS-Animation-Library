#!/bin/bash
# type 'chmod +x bundle.sh' to make this file executable
# type './bundle.sh' to run this file

echo ""
echo "Rollup Started"

echo ""
echo "- Creating export directory"
if [ ! -d "./export" ]; then
    mkdir "./export"
fi

echo ""

variable_path="../dev"
npminstall=1

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

echo ""
echo "- jos.css | Minifying to jos.css"
npx rollup -c config/rollup.config_css.mjs

echo ""
echo "- jos.css | Copying to jos.full.css"
# npx rollup -c config/rollup.config_css_full.mjs
cp "$variable_path/jos.css" export/jos.debug.css

echo ""
echo "- jos.js | Copying to jos.js"
npx rollup -c config/rollup.config_dist.mjs
# cp "$variable_path/jos.js" export/jos.js

echo ""
echo "- jos.js | Copying to jos.debug.js"
cp "$variable_path/jos.js" export/jos.debug.js

echo ""
echo "- jos.js | Minifying to jos.min.js"
npx rollup -c config/rollup.config_dist_min.mjs

echo ""
echo "- Creating jos.full.js"


jsFilePath="$variable_path/jos.js"
outputFilePath="$variable_path/jos.full.js"
cp "$jsFilePath" "$outputFilePath"
echo "import \"./jos.css\";" >> "$outputFilePath"


echo ""
echo "- jos.js | Processing to jos.full.js"
# cp "$variable_path/jos.full.js" export/jos.full.js
npx rollup -c config/rollup.config_full.mjs

echo ""
echo "- jos.js | Minifying to jos.full.min.js"
npx rollup -c config/rollup.config_full_min.mjs

rm "$outputFilePath"
