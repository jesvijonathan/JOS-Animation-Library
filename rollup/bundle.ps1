# type `./bundle.ps1` to run

cd ./rollup

echo ""
echo "Rollup Started"

echo ""
echo "- Creating export directory"
if (!(Test-Path -Path "./export")) {
    New-Item -Path "./export" -ItemType Directory
}

$basePath = "../dev"
$npminstall = 1


if ($npminstall){
    echo ""
    echo "- Installing npm packages -------------------"
    echo ""
    $packages = @(
    "rollup",
    "@rollup/plugin-terser",
    "rollup-plugin-postcss",
    "@rollup/plugin-node-resolve",
    "@rollup/plugin-commonjs",
    "rollup-plugin-sourcemaps"
)
function IsPackageInstalled($packageName) {
    return (npm list $packageName -g) -or (npm list $packageName)
}
function InstallPackage($packageName) {
    Write-Host "Installing $packageName..."
    npm install -g $packageName
}
$packages | ForEach-Object {
    if (!(IsPackageInstalled $_)) {
        InstallPackage $_
    } else {
        Write-Host "$_ is already installed."
    }
}
}
else{
    echo "- Skipping npm Installation"
}

echo ""
echo "- Cleaning export directory"
rm export/*.*

echo ""
echo "- jos.css | Minifying to jos.css"
rollup -c config/rollup.config_css.mjs

echo ""
echo "- jos.css | Copying to jos.full.css"
# rollup -c config/rollup.config_css_full.mjs
cp "$basePath/jos.css" export/jos.debug.css

echo ""
echo "- jos.js | Copying to jos.js"
rollup -c config/rollup.config_dist.mjs
# cp "$basePath/jos.js" export/jos.js

echo ""
echo "- jos.js | Copying to jos.debug.js"
cp "$basePath/jos.js" export/jos.debug.js

echo ""
echo "- jos.js | Minifying to jos.min.js"
rollup -c config/rollup.config_dist_min.mjs

echo ""
echo "- Creating jos.full.js"
$jsFilePath = "$basePath/jos.js"
$outputFilePath = "$basePath/jos.full.js"
$jsContent = Get-Content -Path $jsFilePath -Raw
$newContent = "import `"./jos.css`"`r`n" + $jsContent
$newContent | Set-Content -Path $outputFilePath

echo ""
echo "- jos.js | Processing to jos.full.js"
# cp "$basePath/jos.full.js" export/jos.full.js
rollup -c config/rollup.config_full.mjs

echo ""
echo "- jos.js | Minifying to jos.full.min.js"
rollup -c config/rollup.config_full_min.mjs

rm "$basePath/jos.full.js"
