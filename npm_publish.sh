#!/bin/bash

temp_dir=.temp_publish_dir
version_type=micro

# update version
case $1 in
    minor|major)
    version_type=$1
esac

result=$(node scripts/update_package_version.js "$version_type")
old_version=$(echo "$result" | cut -f1 -d ',')
new_version=$(echo "$result" | cut -f2 -d ',')

# prepare directory
rm -rf "$temp_dir"
mkdir -p "$temp_dir"

# Copy things
rsync -am --stats src/* --exclude=server "$temp_dir"
rsync -am --stats src/server --exclude=node_modules "$temp_dir"

# publish
pushd "$temp_dir"
#npm publish

# finalize
if [ $? == 0 ]; then
    popd
    git add . && git c "version: ${new_version}" && git p
    echo "Successfully published new version: '${new_version}'"
else
    echo "Failed to publish and set version back to '${old_version}'"
    node ../scripts/set_package_version.js "$old_version"
fi