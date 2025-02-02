const filterItems = async (req, res, next) => {
    try {
        const { studentClass, minenrollmentYear, maxenrollmentYear } = req.query;
        const filter = {};

        if (studentClass) filter.class = studentClass; // Corrected `class` to `studentClass` to avoid reserved keyword conflict

        if (minenrollmentYear || maxenrollmentYear) {
            filter.enrollmentYear = {};
            if (minenrollmentYear) {
                filter.enrollmentYear.$gte = Number(minenrollmentYear);
            }
            if (maxenrollmentYear) {
                filter.enrollmentYear.$lte = Number(maxenrollmentYear);
            }
        }

        req.filter = filter;
        next();
    } catch (err) {
        res.status(500).json({ message: "Filtering error", error: err.message });
    }
};

export default filterItems;
