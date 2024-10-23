// Purpose: To define the swagger documentation for the API endpoints.

// Authentication Endpoints

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
*     Team:
*      type: object
*      properties:
*        _id:
*          type: string
*          description: The auto-generated ID of the team
*        teamName:
*          type: string
*          description: The name of the team
*          example: "Team Alpha"
*        leader:
*          type: string
*          description: The user ID of the team leader
*          example: "60c72b2f9b1e8c1a4f8e5d4d"
*        size:
*          type: number
*          description: The size of the team
*          example: 1
*        acceptedMembers:
*          type: array
*          items:
*            type: string
*            description: An array of user IDs who have accepted to join the team
*        pendingMembers:
*          type: array
*          items:
*            type: string
*            description: An array of user IDs who are pending to join the team
*        registeredEvents:
*          type: array
*          items:
*            type: string
*            description: An array of event IDs that the team has registered for
*            example: ["event1", "event2"]
*        createdAt:
*          type: string
*          format: date-time
*          description: The creation date of the team
*        updatedAt:
*          type: string
*          format: date-time
*          description: The last update date of the team
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
 *     tags: [Auth]
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
 *     tags: [Auth]
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

// teams Endpoints

/**
 * @swagger
 * /api/admin/v1/createTeam:
 *   post:
 *     summary: create team endpoint
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName: 
 *                 type: string
 *                 example: teamName
 *               leader:
 *                 type: string
 *                 example: (objectId of user from mongoDB)  
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Team created!
 *                 team:
 *                   $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       409:
 *         description: Conflict with existing entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                 msg:
 *                   type: string 
 *                   example: Team with same name already exists
 *                 team:
 *                   $ref: '#/components/schemas/Team'
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   example: can't create team as leaderId is not valid or leader is not registered 
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: server error
 */
/**
 * @swagger
 * /api/admin/v1/update/{teamId}:
 *   patch:
 *     summary: update team endpoint
 *     tags: [Teams]
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         schema: 
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName: 
 *                 type: string
 *                 example: teamName
 *            
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Updated!
 *                 team:
 *                   $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *       404:
 *         description: Conflict with existing entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                 msg:
 *                   type: string 
 *                   example: TeamId is invalid or Team Does not exist
 *                 
 *       409:
 *         description: Conflict with existing entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                 msg:
 *                   type: string 
 *                   example: Team with same name already exists
 *                 
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   example: can't create team as leaderId is not valid or leader is not registered 
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: server error
 */

/**
 * @swagger
 * /api/admin/v1/delete/{teamId}:
 *   delete:
 *     summary: update team endpoint
 *     tags: [Teams]
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: the id of the team to be deleted
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName: 
 *                 type: string
 *                 example: teamName
 *                
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Deleted!
 *                 team:
 *                   $ref: '#/components/schemas/Team'
 *       
 *       404:
 *         description: Team does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                 msg:
 *                   type: string 
 *                   example: Team does not exist, can't delete
 *                 
 *       409:
 *         description: Participated in a event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                 msg:
 *                   type: string 
 *                   example: This team is already registered for some event/events
 *                 
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: server error
 */

/**
 * @swagger
 * /api/team/v1/sendTeamInvite:
 *   post:
 *     summary: Send an invitation to join a team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName:
 *                 type: string
 *                 description: The name of the team to which the invitation is sent
 *               sendToEmail:
 *                 type: string
 *                 description: The email address of the user being invited
 *               leaderId:
 *                 type: string
 *                 description: The ID of the team leader sending the invitation
 *             required:
 *               - teamName
 *               - sendToEmail
 *               - leaderId
 *     responses:
 *       200:
 *         description: Invite sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Invite sent successfully to John Doe
 *       400:
 *         description: Bad request for missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Team name is missing
 *       404:
 *         description: Not Found for invalid team or user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Invalid team name or invalid leader ID
 *       409:
 *         description: Conflict when user is already in the team or invitation was sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User is already in the team and accepted by leader
 */

/**
 * @swagger
 * /api/team/v1/getAllInvites/{userId}:
 *   get:
 *     summary: Retrieve all team invites for a user
 *     tags: [Teams]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user for whom to retrieve pending team invites
 *     responses:
 *       200:
 *         description: All invites retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: All invites retrieved successfully
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the team
 *                       teamName:
 *                         type: string
 *                         description: The name of the team
 *                       leader:
 *                         type: string
 *                         description: The ID of the team leader
 *                       size:
 *                         type: integer
 *                         description: The maximum size of the team
 *                       acceptedMembers:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: The IDs of accepted members
 *       400:
 *         description: Bad request for missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User ID is missing
 *       404:
 *         description: Not Found when the user is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User not found with the provided user ID
 */

/**
 * @swagger
 * /api/team/v1/getMembersOfATeam/{teamId}:
 *   get:
 *     summary: Retrieve members of a specific team
 *     tags: [Teams]
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the team for which to retrieve members
 *     responses:
 *       200:
 *         description: Members fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Fetched successfully!
 *                 acceptedMembers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the accepted member
 *                       
 *                 pendingMembers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the pending member
 *                       
 *                 allMembers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the member
 *                       
 *       400:
 *         description: Bad request for missing team ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Team ID is missing
 *       404:
 *         description: Not Found when the team is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Team not found
 *       500:
 *         description: server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Team not found
 */

/**
 * @swagger
 * /api/team/v1/leaveTeam:
 *   post:
 *     summary: Leave a team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who wants to leave the team
 *               teamId:
 *                 type: string
 *                 description: The ID of the team to leave
 *     responses:
 *       200:
 *         description: Successfully left the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Successfully left the team
 *       400:
 *         description: Bad request for missing parameters or constraints
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Team ID is missing, can't leave this team
 *       404:
 *         description: Not Found for invalid userId or teamId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User not found, not authorized to leave this team
 */

/**
 * @swagger
 * /api/team/v1/acceptInvite:
 *   post:
 *     summary: Accept a team invite
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user accepting the invite
 *               teamId:
 *                 type: string
 *                 description: The ID of the team to accept the invite for
 *     responses:
 *       200:
 *         description: Invite accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Invite accepted!
 *       400:
 *         description: Bad request for missing parameters or constraints
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User ID is missing
 *       403:
 *         description: Forbidden for not paying the fee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: First pay the fee to accept the invite
 *       404:
 *         description: Not Found for invalid userId or teamId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User does not exist
 */

/**
 * @swagger
 * /api/team/v1/rejectInvite:
 *   post:
 *     summary: Reject a team invite
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user rejecting the invite
 *               teamId:
 *                 type: string
 *                 description: The ID of the team to reject the invite for
 *     responses:
 *       200:
 *         description: Invite rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Invite rejected!
 *       400:
 *         description: Bad request for missing parameters or constraints
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User ID is missing
 *       404:
 *         description: Not Found for invalid userId or teamId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User does not exist
 */

/**
 * @swagger
 * /api/team/v1/participatingTeamsOfAUser/{userId}:
 *   get:
 *     summary: Get all teams a user is participating in
 *     tags: [Teams]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the user whose participating teams are to be fetched
 *     responses:
 *       200:
 *         description: Successfully fetched participating teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Fetched successfully!
 *                 totalTeams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       description: The ID of the team
 *       400:
 *         description: Bad request for missing userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User ID is missing
 *       404:
 *         description: Not Found for invalid userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User does not exist
 */

/**
 * @swagger
 * /api/user/v1/userProfile:
 *   post:
 *     summary: Get user profile by email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user whose profile is to be fetched
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Fetched Successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request for missing email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Email is missing
 *       404:
 *         description: Not Found for non-existing user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User does not exist
 */

/**
 * @swagger
 * /api/user/v1/updateResume:
 *   post:
 *     summary: Update the resume link for a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user whose resume link is to be updated
 *                 example: user@example.com
 *               resumeLink:
 *                 type: string
 *                 description: The new resume link for the user
 *                 example: http://example.com/resume.pdf
 *     responses:
 *       200:
 *         description: Successfully updated the resume link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Resume updated successfully!
 *                 user:
 *                   type: object
 *                   properties:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request for missing email or resume link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Email is missing
 *       404:
 *         description: Not Found for non-existing user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User does not exist
 */


/**
 * @swagger
 * /api/team/v1/kickAMember:
 *   post:
 *     summary: Kick a member from a team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leaderId:
 *                 type: string
 *                 description: The ID of the team leader
 *                 example: 60b8d4d5f9b1e24a7c8e4d5b
 *               teamId:
 *                 type: string
 *                 description: The ID of the team
 *                 example: 60b8d4d5f9b1e24a7c8e4d5c
 *               userTobeKickedId:
 *                 type: string
 *                 description: The ID of the user to be kicked
 *                 example: 60b8d4d5f9b1e24a7c8e4d5d
 *     responses:
 *       200:
 *         description: Successfully kicked the user from the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: User kicked out successfully!
 *       400:
 *         description: Bad request for missing leaderId, teamId, or userTobeKickedId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: leaderId missing
 *       403:
 *         description: you are not authorized to kick the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: You are not authorized to kick this user
 *       404:
 *         description: Not Found for non-existing user, leader, or team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: User does not exist
 */
