/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOtp:
 *       type: object
 *       required:
 *         - phone
 *       properties:
 *         phone:
 *           type: string
 *           description: User Phone Number
 *     CheckOtp:
 *       type: object
 *       required:
 *         - phone
 *         - code
 *       properties:
 *         phone:
 *           type: string
 *           description: User Phone Number
 *         code:
 *           type: string
 *           description: OTP Code
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Login with OTP in this endpoint
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/SendOtp"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SendOtp"
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 */


/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: check if otp code is correct and then login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/CheckOtp"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CheckOtp"
 *     responses:
 *       200:
 *         description: OTP is Correct.
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: user logout method
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: OTP is Correct.
 */