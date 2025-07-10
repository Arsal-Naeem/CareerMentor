import UserCareerDomain from "../models/skilltracking/userCareerDomain.js";
import CareerDomain from "../models/skilltracking/careerDomain.js";

// Enroll or switch user's career domain
export const enrollCareerDomain = async (req, res) => {
  try {
    const { careerDomainId } = req.body;
    const userId = req.userId;
    if (!careerDomainId) return res.status(400).json({ success: false, message: "careerDomainId required" });
    const domain = await CareerDomain.findByPk(careerDomainId);
    if (!domain) return res.status(404).json({ success: false, message: "Career domain not found" });
    // Only one domain per user
    let userDomain = await UserCareerDomain.findOne({ where: { userId } });
    if (userDomain) {
      userDomain.careerDomainId = careerDomainId;
      userDomain.enrolledAt = new Date();
      await userDomain.save();
    } else {
      userDomain = await UserCareerDomain.create({ userId, careerDomainId });
    }
    res.json({ success: true, userCareerDomain: userDomain });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Get the current career domain for the user
export const getCurrentCareerDomain = async (req, res) => {
  try {
    const userId = req.userId;
    const userDomain = await UserCareerDomain.findOne({
      where: { userId },
      include: [{ model: CareerDomain }],
    });
    if (!userDomain) {
      return res.status(404).json({ success: false, message: "User is not enrolled in any career domain" });
    }
    res.json({ success: true, careerDomain: userDomain.careerDomain });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
