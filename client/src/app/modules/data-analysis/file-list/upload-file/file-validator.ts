import {FileError} from "react-dropzone";
import {bytesToString} from "../../../../../_metronic/helpers/convertor";

const maxFileSize: number = 10_000_000
const extensionsAllowed: Array<string> = ["text/csv"];

function validateFile(file: File) {
    let errors: Array<FileError> = []
    const extension = file.type
    if (file.size > maxFileSize)
        errors.push({
            code: "file-max-size",
            message: `File size larger than ${bytesToString(maxFileSize)} `
        })

    if (!extensionsAllowed.includes(extension))
        errors.push({
            code: "file-extension",
            message: `${extension} extension is not allow use ${extensionsAllowed.toString()}`
        })

    return errors.length > 0 ? errors : null
}

export {validateFile, extensionsAllowed, maxFileSize}