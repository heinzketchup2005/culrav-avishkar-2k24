// swaggerDocs/swaggerDocs.js
/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       properties:
*         name:
*           type: string
*         email:
*           type: string
*         password:
*           type: string
*         isOtherCollege:
*           type: boolean
*       required:
*         - name
*         - email
*         - password
*         - isOtherCollege
*       oneOf:
*         - properties:
*             isOtherCollege:
*               enum: [false]
*         - properties:
*             isOtherCollege:
*               enum: [true]
*             phoneNo:
*               type: string
*             collegeName:
*               type: string
*           required:
*             - phoneNo
*             - collegeName
*/

/**
 * @swagger
 * /api/auth/v1/login:
 *   post:
 *     summary: Login endpoint
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       400:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *        description: server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: server error 
 */

/**
 * @swagger
 * /api/auth/v1/register:
 *   post:
 *     summary: register endpoint
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       400:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *        description: server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: server error 
 */

/**
 * @swagger
 * /api/auth/v1/verify:
 *   post:
 *     summary: email Verification endPoint
 *     tags: [verify]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message: 
 *                   type: string
 *                   example: Email verified
 *       400:
 *         description: verification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token 
 *       500:
 *        description: server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: server error    
 */

/**
 * @swagger
 * /api/auth/v1/sendForgotPasswordToken:
 *   post:
 *     summary: forgot password token sending endPoint
 *     tags: [send_forgot_Password_Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message: 
 *                   type: string
 *                   example: token send to email
 *       400:
 *         description: verification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: token not send to email   
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: server error
 */

/**
 * @swagger
 * /api/auth/v1/forgotPasswordVerification:
 *   post:
 *     summary: forgot password token verification endPoint
 *     tags: [forgot_Password_Token_verification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message: 
 *                   type: string
 *                   example: password send to email
 *       400:
 *         description: verification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: password not send to email   
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: server error
 */