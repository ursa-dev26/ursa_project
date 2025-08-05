import bcrypt from "bcrypt";

export const hashPWD = async (password) => {
    try {
        const pwd = await bcrypt.hash(password, 10)

        return pwd

    } catch (error) {
        console.log(error);

    }

};



export const isValidPassword = async (password, pwdHash) => {
    try {
        const isSame = await bcrypt.compare(password, pwdHash)
        return isSame
    } catch (error) {
        console.log(error);

    }
};

