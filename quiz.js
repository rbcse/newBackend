import Quiz from "./quizmodel.js";
import Profile from "./profile.js";

const addQuizQuestion = async (req,res)=>{
    const {subject , subject_id , level , question , op1 , op2 , op3 , op4 , answer} = req.body;

    const newQuestion = new Quiz({subject:subject , subject_id:subject_id , level : level , question_text : question , option1 : op1 , option2 : op2 , option3 : op3 , option4 : op4 , answer: answer});

    newQuestion.save();
    console.log("Question Saved successfully");
}

const subjectMap = {
    "database" : "dbms",
    "object" : "oops",
    "computer network" : "cn",
    "operating" : "os"
};

const getSubjectAbbreviation = (subject) => {
    subject = subject.toLowerCase();
    for (const [keyword, abbreviation] of Object.entries(subjectMap)) { 
        const regex = new RegExp(`^${keyword}`, "i");
        if (regex.test(subject)) {
            return abbreviation;
        }
    }
    return subject; 
};

const displayQuizzes = async (req,res) => {
    const {subject} = req.body;
    if(subject == ""){
        return res.status(200).json({message : "Subject field cannot be empty"});
    }
    const abbreviation = getSubjectAbbreviation(subject);
    const quizzes = await Quiz.find({subject : abbreviation});
    return res.status(200).json({quizzes : quizzes});
}

const calculateScore = async (req,res)=>{
    console.log(req.rootUser);
    const user_email = req.rootUser[0].email;
    const userAnswers = req.body.selectedAnswers;
    const subject = req.body.subject;
    const getAnswers = await Quiz.find({subject : subject}).select('answer');
    const actualAnswers = [];
    for(let i=0;i<getAnswers.length;i++){
        actualAnswers.push(getAnswers[i].answer);
    }
    let score = 0;
    for(let i=0;i<actualAnswers.length;i++){
        if(actualAnswers[i] == userAnswers[i]){
            score++;
        }
    }
    const newQuizUser = new Profile({email : user_email , quizSub : subject , score : score, total : actualAnswers.length});
    newQuizUser.save();
    console.log("Saved success");
    return res.status(200).json({score : score , total : actualAnswers.length});
}

export {addQuizQuestion , displayQuizzes , calculateScore};