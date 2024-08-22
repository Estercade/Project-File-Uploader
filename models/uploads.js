const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function uploadFile(file, body, user) {
    try {
        await prisma.uploads.deleteMany();
        const newFile = await prisma.uploads.create({
            data: {
                filename: file.filename,
                originalName: file.originalname,
                description: body.fileDescription,
                size: file.size,
                path: file.path,
                uploaderId: user.id
            }
        });
        return newFile;
    } catch (err) {
        console.error(err.message);
    } finally {
        await prisma.$disconnect();
    };
}

// async function test() {
//     try {
//         const user = await prisma.users.findFirst({
//             where: {
//                 username: "username"
//             },
//             include: {
//                 uploads: true
//             }
//         });
//         console.log(user);
//     } catch (err) {
//         console.error(err.message);
//     } finally {
//         await prisma.$disconnect();
//     };
// }

// test();

module.exports = {
    uploadFile
}