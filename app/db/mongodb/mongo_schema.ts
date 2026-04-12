import mongoose from "mongoose";

/* =========================
   SUB-SCHEMAS (if needed)
========================= */

// USERS
const users_schema = new mongoose.Schema({
   //  id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    dateJoined: { type: Date },

    problemIds: { type: [String], default: [] },
    setIds: { type: [String], default: [] },
    tutorialIds: { type: [String], default: [] },

    userProblemId: String
});

// SETS
const set_schema = new mongoose.Schema({
   //  id: { type: String, required: true },
    name: { type: String, required: true },
    authorId: { type: String, required: true },
    problemIds: { type: [String], default: [] }
});

// PROBLEM DESCRIPTIONS
const problem_description_schema = new mongoose.Schema({
   //  id: { type: String, required: true },
    problemId: { type: String, unique: true },
    title: String,
    content: String,
});

// PROBLEM VISUALS
const problem_visuals_schema = new mongoose.Schema({
   //  id: { type: String, required: true },
    problemId: { type: String, unique: true },
    code_text: { type: String, default: "" },
    code_steps: { type: String, default: "[]" },
    input_array: { type: String, default: "[]" }
});

// PROBLEMS
const problem_schema = new mongoose.Schema({
   //  id: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    difficulty: { type: String, default: "Easy" },
    video_link: String,

    visuals: {type: problem_visuals_schema, default: {}},
    description: {type: problem_description_schema, default: {}},

    authorId: { type: String, required: true },
    setId: { type: String, required: true },

    hints: { type: [String], default: [] },
});

// USER PROBLEM (to track user progress on problems)
const user_problem_schema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    problemIds: { type: [String], default: [] }
});

// TUTORIALS
const tutorials_schema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, default: "algorithm" },
    authorId: { type: String, required: true },

    subtopicIds: { type: [String], default: [] }
});

// ALGOVISUALS
const algovisuals_schema = new mongoose.Schema({
   //  id: { type: String, required: true },

    subtopicId: String,

    code_text: { type: String, default: "" },
    code_steps: { type: String, default: "[]" },
    input_array: { type: String, default: "[]" }
});

// TOPICS
const topics_schema = new mongoose.Schema({
   //  id: { type: String, required: true },
    title: String,
    content: String,

    subtopicId: { type: String},

    commentIds: { type: [String], default: [] }
});

// SUBTOPICS
const subtopic_schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    difficulty: { type: String, default: "Easy" },
    external_video: String,

    topics: {type: topics_schema, default: {}},
    algovisuals: {type: algovisuals_schema, default: {}},

    tutorialId: { type: String, required: true },
});

// COMMENTS
const comments_schema = new mongoose.Schema({
   //  id: { type: String },

    username: { type: String, required: true },
    message: { type: String, required: true },
    time: Date,

    topicId: { type: String, required: true }
});

// EXPORTING MODELS
export const Users = mongoose.models["Users"] || mongoose.model("Users", users_schema);
export const Set = mongoose.models["Set"] || mongoose.model("Set", set_schema);
export const Problem = mongoose.models["Problem"] || mongoose.model("Problem", problem_schema);
// export const ProblemDescription = mongoose.models["ProblemDescription"] || mongoose.model("ProblemDescription", problem_description_schema);
// export const ProblemVisuals = mongoose.models["ProblemVisuals"] || mongoose.model("ProblemVisuals", problem_visuals_schema);
export const UserProblem = mongoose.models["UserProblem"] || mongoose.model("UserProblem", user_problem_schema);
export const Tutorials = mongoose.models["Tutorials"] || mongoose.model("Tutorials", tutorials_schema);
// export const Algovisuals = mongoose.models["Algovisuals"] || mongoose.model("Algovisuals", algovisuals_schema);
// export const Topics = mongoose.models["Topics"] || mongoose.model("Topics", topics_schema);
export const Subtopic = mongoose.models["Subtopic"] || mongoose.model("Subtopic", subtopic_schema);
export const Comments = mongoose.models["Comments"] || mongoose.model("Comments", comments_schema);