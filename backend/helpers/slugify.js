import slugify from "slugify";

const createSlug = (text) => {
    return slugify(text, {
        lower: true,
        strict: true
    });
};

export default createSlug;