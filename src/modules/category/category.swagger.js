/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *           description: Name of Category
 *         slug:
 *           type: string
 *           description: Slug of Category
 *         icon:
 *           type: string
 *           description: Icon of Category
 *         parent:
 *           type: string
 *           description: Parent of Category
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create New Category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/CreateCategory"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateCategory"
 *     responses:
 *       200:
 *         description: Category Created Successfully.
 */


/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get Categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Categories Fetched Successfully.
 */
