import React, { useState, useEffect } from "react";
import { Buddy } from "./buddy";
import conversationData from "@/constants/buddyDialogues.json";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { GetUserEnrolledModule } from "@/apis/skillTracking/moduleTracking/moduleTracking.services";
import { frontendGraph, backendGraph } from "@/constants/knowledgeGraph";
import { expandSkills, recommendNextModule } from "@/utils/skillsHelper";

export const BuddyConversation = () => {
  const [buddyPose, setBuddyPose] = useState("waving");
  const [conversationStep, setConversationStep] = useState("welcome");
  const [domain, setDomain] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showChat, setShowChat] = useState(true);

  const { id: domainId } = useParams();
  const { data, isLoading, isError } = GetUserEnrolledModule(domainId);
  const modules = data?.modules || [];

  // Auto-detect domain
  useEffect(() => {
    if (!isLoading && !isError && modules.length > 0 && !domain) {
      const domainTitle = modules[0].careerDomainTitle.toLowerCase();
      const normalized =
        domainTitle.includes("frontend")
          ? "frontend"
          : domainTitle.includes("backend")
          ? "backend"
          : null;

      if (normalized && conversationData[normalized]) {
        setDomain(normalized);
        setConversationStep("welcome");
      } else {
        setConversationStep("domain_select");
      }
    }
  }, [modules, isLoading, isError, domain]);

  const handleChoice = (choice) => {
    if (conversationStep === "welcome") {
      setBuddyPose("waving");
      setConversationStep("start");
      return;
    }

    if (conversationStep === "domain_select") {
      const chosenDomain = choice.toLowerCase();
      if (conversationData[chosenDomain]) {
        setDomain(chosenDomain);
        setBuddyPose("waving");
        setConversationStep("welcome");
      }
      return;
    }

    if (conversationStep === "start") {
      setBuddyPose(choice.includes("Newbie") ? "explaining" : "standing");
      setConversationStep(choice.includes("Newbie") ? "newbie" : "experienced");
      return;
    }

    if (conversationStep === "newbie") {
      setBuddyPose("explainingBook");
      setConversationStep("module_intro");
      return;
    }

    if (conversationStep === "experienced") {
      setConversationStep("askSkills");
      return;
    }

    if (conversationStep === "askSkills") {
      const newSkills = choice.toLowerCase().includes("none")
        ? ["None"]
        : [...selectedSkills, choice];

      setSelectedSkills(newSkills);
      setBuddyPose("thumbsUp");
      setConversationStep("skill_response");
    }
  };

  const getStepData = () => {
    if (isLoading) return { message: "⏳ Loading your modules..." };
    if (isError) return { message: "⚠️ Couldn't fetch modules." };

    if (!domain) return { message: "Please choose a domain to start." };
    const domainData = conversationData[domain];
    const graph = domain === "frontend" ? frontendGraph : backendGraph;
    const moduleOrder = modules.map((m) => m.title);

    switch (conversationStep) {
      case "welcome":
        return domainData.welcome;
      case "start":
        return domainData.intro.start;
      case "newbie":
        return domainData.newbie;
      case "module_intro":
        return {
          message: "We have multiple modules for you:",
          options: domainData.newbie.modules || [],
        };
      case "experienced":
      case "askSkills":
        return domainData.experienced.askSkills;
      case "skill_response": {
        // Expand all dependencies
        const expandedSkills = expandSkills(selectedSkills, graph);

        // Recommend next module
        const nextModuleTitle = recommendNextModule(expandedSkills, moduleOrder);
        if (!nextModuleTitle) {
          return { message: "🎉 You already know everything here!" };
        }

        const nextModule = modules.find((m) => m.title === nextModuleTitle);
        return {
          message: `Based on what you know, I recommend starting with **${nextModule.title}**:\n${nextModule.description || ""}`,
          options: ["Next"],
        };
      }
      default:
        return { message: "🤔 Hmm, I’m not sure what to say here." };
    }
  };

  const { message, options = [] } = getStepData();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="flex flex-col items-end gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Chat bubble */}
            <motion.div
              key={conversationStep + domain}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/90 backdrop-blur-lg p-5 rounded-2xl shadow-xl border border-blue-200"
              style={{ maxWidth: "360px", minWidth: "280px" }}
            >
              <p className="text-gray-800 leading-relaxed text-sm font-medium whitespace-pre-line">
                {message}
              </p>
              {options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {options.map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChoice(opt)}
                      className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm"
                      style={{ backgroundColor: "#E07A5F" }}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/90 rotate-45 border-r border-b border-blue-200"></div>
            </motion.div>

            {/* Buddy mascot */}
            <motion.div
              key={buddyPose}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48"
            >
              <div className="absolute w-full h-full bg-blue-100 rounded-full blur-2xl opacity-40"></div>
              <Buddy pose={buddyPose} alt="Buddy Mascot" size="large" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setShowChat(!showChat)}
        whileTap={{ scale: 0.85, rotate: -15 }}
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-xl transition-all"
        style={{
          backgroundColor: showChat ? "#E07A5F" : "#5A9BD4",
          color: "white",
        }}
        title={showChat ? "Put Buddy to sleep" : "Wake up Buddy"}
      >
        {showChat ? "😴" : "💬"}
      </motion.button>
    </div>
  );
};
