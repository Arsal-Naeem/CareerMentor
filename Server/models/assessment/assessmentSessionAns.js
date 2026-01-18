import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";


const AssessmentSessionAns = sequelize.define("assessmentsessionans", {
  sessionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'assessmentsession', // Assuming the assessment session model is named 'assessmentSessions'
      key: 'sessionId',
    },
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'assessmentquestion', // Assuming the assessment question model is named 'assessmentQuestions'
      key: 'id',
    },
  },
  optionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'assessmentOptions', // Assuming the assessment options model is named 'assessmentOptions'
      key: 'id',
    },
  },
},
{
  freezeTableName: true, // Prevents Sequelize from pluralizing the table name
});

export default AssessmentSessionAns;