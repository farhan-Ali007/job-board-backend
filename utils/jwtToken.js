export const sendToken = (user, statusCode, res, message) => {
    const token = user.getToken();

    const options = {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
    };
   
    const responseData = {
        success: true,
        message,
        user,
        token,
    };

    // Send the response with the combined data
    res.status(statusCode).cookie("token", token, options).json(responseData);
};