declare -a files=(".env.local" ".env")

echo $PWD

for file in ${files[@]}; do
    if [ -f "${file}" ]; then
        cp ${file} .ddev/.env.local
        echo -e "\033[0;32m${file} was copied to .ddev/.env.local"
        exit 0
    else
        echo -e "\033[1;33m${file} not found in project"
    fi
done

exit 0
