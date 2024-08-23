const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function uploadFile(file, uploadResult, body, user) {
    try {
        const newFile = await prisma.uploads.create({
            data: {
                filename: `${uploadResult.public_id}.${uploadResult.format}`,
                description: body.fileDescription,
                size: uploadResult.bytes,
                uploaderId: user.id,
                url: uploadResult.secure_url
            }
        });
        return newFile;
    } catch (err) {
        console.error(err.message);
    } finally {
        await prisma.$disconnect();
    };
}

async function getFilesByUserId(user_id) {
    try {
        const files = await prisma.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                uploads: true
            }
        });
        return files.uploads;
    } catch (err) {
        console.error(err.message);
    } finally {
        await prisma.$disconnect();
    };
}

module.exports = {
    uploadFile,
    getFilesByUserId,
}