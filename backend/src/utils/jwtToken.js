export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJwtToken();
    const cookieName = user.role === 'Admin' ? 'AdminToken' : 'PatientToken';

    res.status(statusCode)
       .cookie(cookieName, token, {
           expires: new Date(
               Date.now() + 7 * 24 * 60 * 60 * 1000 // Set cookie to 7 days
           ),
           httpOnly: true,
           secure: process.env.NODE_ENV === 'production', // Secure only in production
           sameSite: 'strict', // Prevent CSRF attacks
       })
       .json({
           success: true,
           message,
           user,
           token, // Optional: Frontend can also access token via JSON response
       });
};
