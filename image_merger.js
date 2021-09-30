const path = require('path')

const sizeOf = require('image-size')
const { replaceBackground } = require('backrem');

const input_dir = path.resolve(__dirname, ".\\img_inputs\\dzanga.jpg")
const output_dir = path.resolve(__dirname, ".\\img_outputs\\10.10.jpg")


function isEqualDims(imgDir1, imgDir2){
    const size1 = sizeOf(imgDir1)
    const size2 = sizeOf(imgDir2)

    return size1.width === size2.width && size1.height === size2.height
}

console.log(isEqualDims(input_dir, input_dir));

// replaceBackground(catExample, spaceExample, [200, 50, 50], 3).then(
//     (readableStream) => {
//         const writableStream = fs.createWriteStream(
//         path.resolve(__dirname, "./result/result.jpg")
//         );
    
//         readableStream.pipe(writableStream);
//     }
//     );
