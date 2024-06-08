enum EMimetype {
    IMAGE_REGEX="IMAGE_REGEX",
    MAX_SIZE="MAX_SIZE"
}

type TMimeType = {
    [EMimetype.IMAGE_REGEX]: string | RegExp;
    [EMimetype.MAX_SIZE]: number;
}

export const MimeType: TMimeType = {
    [EMimetype.IMAGE_REGEX]: /(jpg|jpeg|png|webp)$/,
    [EMimetype.MAX_SIZE]: 1000
}