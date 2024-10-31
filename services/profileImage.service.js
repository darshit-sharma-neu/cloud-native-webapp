const { getByEmail } = require("../services/user.service");
const { uploadToS3, deleteImage } = require("../utils/uploadToS3");
const { ProfileImage } = require("../models/profileImage.model");
const { statsdClient } = require("../utils/statsd");

/**
 * Upload Images to S3
 *
 */
async function create(filePath, fileName, userEmail) {
    const startTime = Date.now();
    const user = await getByEmail(userEmail);
    if (!user) {
        throw new Error("User not found");
    }

    const profileImageExsisting = await ProfileImage.findOne({
        where: {
            user_id: user.id,
        },
    });

    if (!profileImageExsisting) {
        const { fileUrl } = await uploadToS3(filePath, fileName, user.id);

        if (fileUrl) {
            const profileImage = ProfileImage.build({
                file_name: fileName,
                url: fileUrl,
                user_id: user.id,
            });

            await profileImage.save();
            statsdClient.timing("db.profileImages.create", Date.now() - startTime);
            return {
                profileImage: profileImage.toJSON(),
            };
        }
    } else {
        return {
            profileImage: null,
        };
    }
}

async function getByUserEmail(email) {
    const startTime = Date.now();
    const user = await getByEmail(email);
    const profileImage = await ProfileImage.findOne({
        where: {
            user_id: user.id,
        },
    });
    if (!profileImage) {
        return {
            response: null,
        };
    }
    statsdClient.timing("db.profileImages.getByUserEmail", Date.now() - startTime);
    return {
        user: user,
        response: profileImage.toJSON(),
    };
}

async function deleteImageByUserEmail(email) {
    const startTime = Date.now();
    const user = await getByEmail(email);

    const profileImage = await ProfileImage.findOne({
        where: {
            user_id: user.id,
        },
    });

    if (!profileImage) {
        return {
            imageNotFound: true,
        };
    }
    const deleteStatus = await deleteImage(
        `${user.id}/${profileImage.file_name}`
    );
    if (deleteStatus) {
        await profileImage.destroy();
        statsdClient.timing("db.profileImages.destroy", Date.now() - startTime);
        return {};
    } else {
        return {
            deleteFailed: true,
        };
    }
}

module.exports = {
    create,
    getByUserEmail,
    deleteImageByUserEmail,
};
