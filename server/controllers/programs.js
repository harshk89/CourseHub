import {query} from "../db.js";

export const getAllPrograms = async (req, res) => {
    if(!req.user_id) return res.status(401).json({ message: 'Unauthenticated' });
    try {
        const result = await query('SELECT * FROM programs');
        // console.log(result.rows);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProgramsByDomain = async (req, res) => {
    if(!req.user_id) return res.status(401).json({ message: 'Unauthenticated' });
    const {Domain} = req.query;
    try {
        const result = await query('SELECT * FROM programs WHERE "Domain" = $1', [Domain]);
        // console.log(result.rows);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProgramById = async (req, res) => {
    if(!req.user_id) return res.status(401).json({ message: 'Unauthenticated' });
    const Program_id = req.params.id;
    try {
        const result = await query('SELECT * FROM programs WHERE "Program_id" = $1', [Program_id]);
        // console.log(result.rows);
        
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error retrieving program:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createProgram = async (req, res) => {
    if(!req.user_id) return res.status(401).json({ message: 'Unauthenticated' });
    const {
        Name,
        Price,
        Domain,
        Program_type,
        Registration_open,
        Description,
        Placement_assurance,
        Image_url,
        University_name,
        Faculty_profile,
        Learning_hours,
        Certificate_diploma,
        Eligibility_criteria,
      } = req.body;

    try {
        const result = await query('INSERT INTO programs ("Name", "Price", "Domain", "Program_type", "Registration_open", "Description", "Placement_assurance", "Image_url", "University_name", "Faculty_profile", "Learning_hours", "Certificate_diploma", "Eligibility_criteria", "Last_modified") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_DATE) RETURNING *', [Name, Price, Domain, Program_type, Registration_open, Description, Placement_assurance, Image_url, University_name, Faculty_profile, Learning_hours, Certificate_diploma, Eligibility_criteria]);

        // console.log(result.rows);
        
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error creating program:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateProgram = async (req, res) => {
    if(!req.user_id) return res.status(401).json({ message: 'Unauthenticated' });
    const {
        Name,
        Price,
        Domain,
        Program_type,
        Registration_open,
        Description,
        Placement_assurance,
        Image_url,
        University_name,
        Faculty_profile,
        Learning_hours,
        Certificate_diploma,
        Eligibility_criteria,
        Program_id
      } = req.body;

    try {

        const checkResult = await query('SELECT * FROM programs WHERE "Program_id" = $1', [Program_id]);

        if (checkResult.rows.length === 0) {
            // no program with the specified ID is found
            res.status(404).json({ success: false, message: 'Program not found' });
            return;
        }

        const updateResult = await query('UPDATE programs SET "Name" = $1, "Price" = $2, "Domain" = $3, "Program_type" = $4, "Registration_open" = $5, "Description" = $6, "Placement_assurance" = $7, "Image_url" = $8, "University_name" = $9, "Faculty_profile" = $10, "Learning_hours" = $11, "Certificate_diploma" = $12, "Eligibility_criteria" = $13, "Last_modified" = CURRENT_DATE WHERE "Program_id" = $14 RETURNING *', [Name, Price, Domain, Program_type, Registration_open, Description, Placement_assurance, Image_url, University_name, Faculty_profile, Learning_hours, Certificate_diploma, Eligibility_criteria, Program_id]);

        const updatedProgram = updateResult.rows[0];
        // console.log("updated program: ", updatedProgram);

        res.status(200).json({ success: true, message: 'Program updated successfully', program: updatedProgram });

    } catch (error) {
        console.error('Error creating program:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteProgram = async (req, res) => {
    if(!req.user_id) return res.status(401).json({ message: 'Unauthenticated' });
    const Program_id = req.params.id;

    try {
        const checkResult = await query('SELECT * FROM programs WHERE "Program_id" = $1', [Program_id]);

        if (checkResult.rows.length === 0) {
            // no program with the specified ID is found
            res.status(404).json({ success: false, message: 'Program not found' });
            return;
        }

        // Delete the program with the specified ID
        await query('DELETE FROM programs WHERE "Program_id" = $1', [Program_id]);
        
        res.status(200).json({ success: true, message: 'Program deleted successfully' });
    } catch (error) {
        console.error('Error deleting program:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}