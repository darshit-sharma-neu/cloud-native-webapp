const { getByEmail } = require("../services/user.service");
const { uploadToS3, deleteImage } = require("../utils/uploadToS3");
const { ProfileImage } = require("../models/profileImage.model");

/**
 * Upload Images to S3
 *
 */
async function create(filePath, fileName, userEmail) {
    // get user
    const user = await getByEmail(userEmail);
    if (!user) {
        throw new Error("User not found");
    }
    // check if user already has a profile image
    const profileImageExsisting = await ProfileImage.findOne({
        where: {
            user_id: user.id,
        },
    });

    if (!profileImageExsisting) {
        const { fileUrl } = await uploadToS3(filePath, fileName, user.id);
        // save info in db
        if (fileUrl) {
            const profileImage = ProfileImage.build({
                file_name: fileName,
                url: fileUrl,
                user_id: user.id,
            });

            await profileImage.save();
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
    const user = await getByEmail(email);
    const profileImage = await ProfileImage.findOne({
        where: {
            user_id: user.id,
        },
    });
    if(!profileImage){
        return {
            response: null,
        };
    }
    return {
        user: user,
        response: profileImage.toJSON(),
    };
}

async function deleteImageByUserEmail(email) {
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
