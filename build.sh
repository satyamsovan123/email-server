app_name=$1
environment=$2
technology=$3
increment_version_type=$4

build_string="Building $app_name $technology app for $environment environment."
length=${#build_string}

dashes=""

for (( i = 0; i < length; i++ )); do
    dashes="$dashes-"
done

echo $dashes
echo $build_string
echo $dashes

VERSION_FILE="VERSION"

read_version() {
    source "$VERSION_FILE"
    VERSION="$MAJOR.$MINOR"
}

write_version() {
    echo "MAJOR=$MAJOR" > "$VERSION_FILE"
    echo "MINOR=$MINOR" >> "$VERSION_FILE"
}

increment_major() {
    read_version
    MAJOR=$((MAJOR + 1))
    write_version
}

increment_minor() {
    read_version
    MINOR=$((MINOR + 1))
    write_version
}

if [[ "$increment_version_type" == "minor" ]]; then
    increment_minor
elif [[ "$increment_version_type" == "major" ]]; then
    increment_major
fi

echo $dashes
echo "Updated to version $MAJOR.$MINOR"
echo $dashes