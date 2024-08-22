const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUserbyUsername(query) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                username: query
            }
        });
        return user;
    } catch (err) {
        console.error(err.message);
    } finally {
        await prisma.$disconnect();
    };
}

async function getUserForDeserialization(user_id) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                username: true,
                role: true
            }
        });
        return user;
    } catch (err) {
        console.error(err.message);
    } finally {
        await prisma.$disconnect();
    };
}

async function createUser(newUsername, newPassword) {
    try {
        const user = await prisma.users.create({
            data: {
                username: newUsername,
                password: newPassword
            }
        });
        return user;
    } catch (err) {
        console.error(err.message);
    } finally {
        await prisma.$disconnect();
    };
}

module.exports = {
    getUserbyUsername,
    getUserForDeserialization,
    createUser,
}