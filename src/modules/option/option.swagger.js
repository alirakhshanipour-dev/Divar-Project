/**
 * @swagger
 * tags:
 *   name: Option
 *   description: Option Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOption:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - category
 *         - type
 *       properties:
 *         title:
 *           type: string
 *           description: title of option
 *         key:
 *           type: string
 *           description: key of option
 *         category:
 *           type: string
 *           description: category of option
 *         type:
 *           type: string
 *           description: type of option
 *           enum:
 *              -   number
 *              -   string
 *              -   boolean
 *              -   array
 *         enum:
 *            type: array
 *            items:
 *                type: string
 */

/**
 * @swagger
 * /option:
 *   post:
 *     summary: Create New Option
 *     tags:
 *       - Option
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/CreateOption"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateOption"
 *     responses:
 *       200:
 *         description: Option Created Successfully.
 */


/**
 * @swagger
 * /option/{categoryId}:
 *   get:
 *     summary: Get Options Of Categories
 *     tags:
 *       - Option
 *     parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *          
 *     responses:
 *       200:
 *         description: Categories Fetched Successfully.
 */
