import React, { useState } from "react";
import { Course } from "../types";
import { 
  Search, Compass, BookOpen, Clock, Users, ArrowRight, CheckCircle, 
  Flame, Star, Filter, ShieldCheck, ChevronDown, ChevronUp, 
  Trophy, HelpCircle, RefreshCw, Shield, Award, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { quizTopics, QuizQuestion, QuizTopic } from "../data/quizData";

interface CoursesProps {
  courses: Course[];
  onEnrollCourse: (courseId: string) => void;
  enrolledCourses: Course[];
}

export default function Courses({ courses, onEnrollCourse, enrolledCourses }: CoursesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  // Quiz States
  const [activeTab, setActiveTab] = useState<"catalog" | "quizzes">("catalog");
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const categories = ["All", "Defence Services", "Paramilitary", "Scientific / R&D", "Civilian Jobs"];

  const filteredCourses = courses.filter((c) => {
    return selectedCategory === "All" || c.category === selectedCategory;
  });

  const toggleSyllabus = (courseId: string) => {
    if (expandedSyllabusId === courseId) {
      setExpandedSyllabusId(null);
    } else {
      setExpandedSyllabusId(courseId);
    }
  };

  // Quiz helper functions
  const startQuiz = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setUserAnswers([]);
    setIsQuizFinished(false);
    setQuizScore(0);
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIdx !== null) return; // already answered
    setSelectedOptionIdx(idx);
    const correctIdx = selectedTopic!.questions[currentQuestionIdx].correctAnswer;
    const isCorrect = idx === correctIdx;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setUserAnswers(prev => [...prev, idx]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < selectedTopic!.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    if (selectedTopic) {
      startQuiz(selectedTopic);
    }
  };

  const handleExitQuiz = () => {
    setSelectedTopic(null);
    setSelectedOptionIdx(null);
    setIsQuizFinished(false);
  };

  return (
    <div className="space-y-8" id="courses_tab_root">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1c251d] to-[#2d3a2e] rounded-2xl p-8 border border-emerald-800/10 text-stone-100 shadow relative overflow-hidden" id="courses_banner">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:25px_25px] opacity-10"></div>
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase bg-[#c5a059]/10 px-2.5 py-0.5 rounded border border-[#c5a059]/30 font-bold">
            Tactical Training Academy
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold font-sans text-stone-100 uppercase tracking-tight">
            Specialized Skills For National Security
          </h1>
          <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
            Level up your core technical and physical aptitude. Master the specific engineering blueprints required
            by national labs and command requirements governing Indian defense mechanisms.
          </p>
        </div>
      </div>

      {/* Section Tab Switcher */}
      <div className="flex border-b border-stone-200 gap-6 pb-2" id="courses_section_switcher">
        <button
          id="tab_btn_catalog"
          onClick={() => setActiveTab("catalog")}
          className={`pb-2 font-sans font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === "catalog"
              ? "border-emerald-800 text-emerald-800"
              : "border-transparent text-stone-400 hover:text-stone-700"
          }`}
        >
          <BookOpen className="w-4 h-4" /> Training Academy Catalog
        </button>
        <button
          id="tab_btn_quizzes"
          onClick={() => {
            setActiveTab("quizzes");
            setSelectedTopic(null);
            setSelectedOptionIdx(null);
            setIsQuizFinished(false);
          }}
          className={`pb-2 font-sans font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === "quizzes"
              ? "border-emerald-800 text-emerald-800"
              : "border-transparent text-stone-400 hover:text-stone-700"
          }`}
        >
          <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> Tactical Quiz Arena
        </button>
      </div>

      {activeTab === "catalog" ? (
        <>
          {/* Categories Filter Rail */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4" id="courses_filter_rail">
            <span className="text-xs font-mono font-bold text-stone-500 uppercase flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-800" /> Syllabus Focus:
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {categories.map((cat) => (
                <button
                  id={`course_filter_btn_${cat.replace(/\s+/g, '_')}`}
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-sans font-medium rounded-lg border transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-800 border-emerald-700 text-stone-100 shadow-sm"
                      : "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="courses_deck_grid">
            {filteredCourses.map((c) => {
              const isEnrolled = enrolledCourses.some((item) => item.id === c.id);
              const isExpanded = expandedSyllabusId === c.id;

              return (
                <motion.div
                  id={`course_card_${c.id}`}
                  key={c.id}
                  layout="position"
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Course Header Illustration */}
                    <div className="h-40 w-full relative overflow-hidden bg-emerald-950">
                      <img
                        referrerPolicy="no-referrer"
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
                      <span className="absolute top-3 left-3 text-[9px] font-mono font-bold tracking-widest text-[#c5a059] bg-stone-900/80 px-2 py-0.5 rounded border border-[#c5a059]/30 uppercase">
                        {c.difficulty}
                      </span>
                      <span className="absolute bottom-3 right-3 text-[10px] text-stone-200 font-sans font-semibold bg-emerald-900/90 px-2 py-0.5 rounded">
                        {c.duration} • {c.lessons} Lectures
                      </span>
                    </div>

                    {/* Course Details Box */}
                    <div className="p-5 space-y-3">
                      <p className="text-[10px] font-mono font-bold text-emerald-800 tracking-wider uppercase">
                        {c.category}
                      </p>
                      <h3 className="font-bold text-stone-900 text-sm md:text-base leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-[10px] text-stone-400 font-mono">
                        {c.provider}
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed font-sans">
                        {c.description}
                      </p>
                    </div>
                  </div>

                  {/* Syllabus Dropdown Controller */}
                  <div className="px-5 pb-5 space-y-4">
                    <button
                      id={`course_syllabus_toggle_${c.id}`}
                      onClick={() => toggleSyllabus(c.id)}
                      className="w-full py-1.5 border border-stone-150 rounded text-[11px] font-semibold text-stone-605 bg-stone-50/50 hover:bg-stone-55 hover:text-emerald-800 flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          Hide Training Modules <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          Expand Training Modules ({c.syllabus.length}) <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {/* Expanded Syllabus Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-2 border-t border-dashed border-stone-200 pt-3"
                        >
                          <h4 className="text-[10px] font-mono font-extrabold uppercase text-stone-400">Tactical Syllabus Coursework:</h4>
                          <ul className="space-y-1.5">
                            {c.syllabus.map((lesson, idx) => (
                              <li key={idx} className="text-[11px] text-stone-600 flex items-start gap-1.5 leading-normal">
                                <span className="text-[9px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-1 py-0.2 rounded mt-0.5">
                                  #{idx + 1}
                                </span>
                                <span>{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer enrollment row */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
                      <div className="text-left font-mono">
                        <p className="text-[8.5px] text-stone-400">Total Enrolled</p>
                        <p className="text-[11px] text-stone-600 font-bold">{c.studentsCount} Students</p>
                      </div>

                      
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      ) : (
        /* Tactical Quiz Arena */
        <div className="space-y-6" id="tactical_quiz_arena_root">
          {selectedTopic === null ? (
            /* Topic Selection State */
            <div className="space-y-6" id="quiz_selection_container">
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg md:text-xl font-extrabold text-stone-900 uppercase tracking-tight flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500 animate-pulse" /> Domain Evaluation Arena
                </h2>
                <p className="text-xs text-stone-500">
                  Select an assessment category to measure your tactical aptitude, cognitive parameters, or technological concepts. Instant objective feedback provided.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizTopics.map((topic) => {
                  let TopicIcon = ShieldCheck;
                  let iconColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
                  if (topic.id === "scientific_reasoning") {
                    TopicIcon = Compass;
                    iconColor = "text-blue-700 bg-blue-50 border-blue-200";
                  } else if (topic.id === "strategic_awareness") {
                    TopicIcon = Shield;
                    iconColor = "text-amber-700 bg-amber-50 border-amber-200";
                  }

                  return (
                    <div 
                      key={topic.id}
                      id={`quiz_topic_card_${topic.id}`}
                      className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition duration-300"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl border ${iconColor}`}>
                            <TopicIcon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase text-stone-400 bg-stone-50 border border-stone-100 px-2.5 py-0.5 rounded">
                            {topic.duration}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-stone-900 text-sm md:text-base leading-snug">
                            {topic.title}
                          </h3>
                          <p className="text-xs text-stone-500 leading-relaxed">
                            {topic.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-semibold text-stone-400">
                          {topic.totalQuestions} Questions
                        </span>
                        <button
                          id={`btn_start_quiz_${topic.id}`}
                          onClick={() => startQuiz(topic)}
                          className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          Launch Test <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : !isQuizFinished ? (
            /* Active Quiz State */
            (() => {
              const currentQuestion = selectedTopic.questions[currentQuestionIdx];
              const percentage = (currentQuestionIdx / selectedTopic.totalQuestions) * 100;
              const optionLetters = ["A", "B", "C", "D"];

              return (
                <div className="bg-white rounded-xl border border-stone-200 p-6 md:p-8 space-y-6 shadow-sm" id="active_quiz_panel">
                  {/* Top bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-3">
                      <button
                        id="btn_back_to_topics"
                        onClick={handleExitQuiz}
                        className="text-stone-500 hover:text-stone-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition cursor-pointer"
                      >
                        ← Abort
                      </button>
                      <span className="text-stone-300">|</span>
                      <span className="text-xs font-mono font-bold text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        {selectedTopic.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-400">
                      Question {currentQuestionIdx + 1} of {selectedTopic.totalQuestions}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-800 h-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  {/* Question Area */}
                  <div className="space-y-4">
                    {currentQuestion.olqTrait && (
                      <span className="text-[9px] font-mono tracking-wider font-extrabold text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/30 uppercase">
                        Evaluating Trait: {currentQuestion.olqTrait}
                      </span>
                    )}
                    {currentQuestion.category && (
                      <span className="text-[9px] font-mono tracking-wider font-extrabold text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/30 uppercase">
                        Focus Domain: {currentQuestion.category}
                      </span>
                    )}
                    <h3 className="text-sm md:text-base font-extrabold text-stone-900 leading-snug">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      const isCorrect = idx === currentQuestion.correctAnswer;
                      const hasAnswered = selectedOptionIdx !== null;

                      let optionStyle = "bg-stone-50/50 hover:bg-stone-100 border-stone-200 text-stone-700";
                      let iconBadge = null;

                      if (hasAnswered) {
                        if (isCorrect) {
                          optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold";
                          iconBadge = <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />;
                        } else if (isSelected) {
                          optionStyle = "bg-red-50 border-red-300 text-red-900 font-semibold";
                          iconBadge = <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />;
                        } else {
                          optionStyle = "bg-stone-55 opacity-55 border-stone-100 text-stone-400";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          id={`quiz_option_btn_${idx}`}
                          disabled={hasAnswered}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm transition flex items-center justify-between gap-4 cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                              isSelected 
                                ? "bg-stone-900 text-white" 
                                : hasAnswered && isCorrect
                                  ? "bg-emerald-700 text-white"
                                  : "bg-stone-200 text-stone-700"
                            }`}>
                              {optionLetters[idx]}
                            </span>
                            <span>{option}</span>
                          </div>
                          {iconBadge}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback / Explanatory Area */}
                  <AnimatePresence>
                    {selectedOptionIdx !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="bg-[#faf8f5] border border-stone-200/80 rounded-xl p-5 space-y-3"
                        id="quiz_feedback_panel"
                      >
                        <div className="flex items-center gap-2 border-b border-stone-200/50 pb-2">
                          <Award className="w-4 h-4 text-[#c5a059]" />
                          <h4 className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-[#c5a059]">
                            Command Evaluation Rationale
                          </h4>
                        </div>
                        
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {currentQuestion.explanation}
                        </p>

                        <div className="pt-2 flex justify-end">
                          <button
                            id="btn_next_question"
                            onClick={handleNextQuestion}
                            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-lg text-xs font-sans font-bold flex items-center gap-1 shadow-sm transition cursor-pointer"
                          >
                            {currentQuestionIdx + 1 === selectedTopic.totalQuestions ? "View Evaluation Report" : "Next Engagement"} <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })()
          ) : (
            /* Quiz Summary State */
            (() => {
              const scorePercentage = Math.round((quizScore / selectedTopic.totalQuestions) * 100);
              
              // Performance evaluation
              let gradeTitle = "RECRUIT TRAINEE";
              let gradeClass = "text-stone-600 bg-stone-50 border-stone-200";
              let gradeDesc = "Solid effort, but foundational concepts need reinforcement. Review the detailed explanations below to improve.";
              
              if (scorePercentage === 100) {
                gradeTitle = "SOVEREIGN COMMANDER";
                gradeClass = "text-emerald-800 bg-emerald-50 border-emerald-200";
                gradeDesc = "Flawless demonstration of tactical awareness, leadership psychology, and mental stamina. Your analytical baseline is exceptional.";
              } else if (scorePercentage >= 80) {
                gradeTitle = "TACTICAL LEADER";
                gradeClass = "text-blue-800 bg-blue-50 border-blue-200";
                gradeDesc = "Excellent core comprehension. Highly aligned with strategic entry requirements. Refine edge cases for a perfect score.";
              } else if (scorePercentage >= 60) {
                gradeTitle = "ASPIRANT CADET";
                gradeClass = "text-amber-800 bg-amber-50 border-amber-200";
                gradeDesc = "Competent baseline, but requires deeper preparation in specific core areas. Focus on weak domains.";
              }

              return (
                <div className="space-y-6" id="quiz_summary_panel">
                  {/* Hero Card */}
                  <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-xl border border-stone-800 p-8 text-center space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:25px_25px] opacity-10"></div>
                    
                    <div className="inline-flex p-4 bg-emerald-950/80 rounded-full border border-emerald-800/40 mb-2 relative z-10">
                      <Trophy className="w-10 h-10 text-[#c5a059]" />
                    </div>

                    <div className="space-y-1 relative z-10">
                      <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans">
                        Assessment Finalized
                      </h2>
                      <p className="text-xs text-stone-400">
                        Evaluation results compiled against national standards.
                      </p>
                    </div>

                    {/* Large Score Indicator */}
                    <div className="text-4xl md:text-5xl font-black text-stone-100 font-sans tracking-tight relative z-10 py-2">
                      {quizScore} <span className="text-xl text-stone-500 font-normal">/ {selectedTopic.totalQuestions}</span>
                    </div>

                    <div className="inline-block relative z-10">
                      <span className={`text-[10px] font-mono font-black uppercase tracking-widest border px-3 py-1 rounded-full ${gradeClass}`}>
                        🎖️ {gradeTitle}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed relative z-10">
                      {gradeDesc}
                    </p>

                    <div className="pt-4 flex flex-wrap gap-3 justify-center relative z-10">
                      <button
                        id="btn_retry_quiz"
                        onClick={handleResetQuiz}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-stone-100 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Re-evaluate Domain
                      </button>
                      <button
                        id="btn_another_quiz"
                        onClick={handleExitQuiz}
                        className="px-4 py-2 bg-stone-850 hover:bg-stone-800 text-stone-300 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 border border-stone-700 transition cursor-pointer"
                      >
                        Try Another Topic
                      </button>
                    </div>
                  </div>

                  {/* Detailed Question Review */}
                  <div className="bg-white rounded-xl border border-stone-200 p-6 md:p-8 space-y-6">
                    <h3 className="font-bold text-stone-900 text-sm md:text-base leading-none border-b border-stone-100 pb-3 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-stone-500" /> Review Board & Key Lessons
                    </h3>

                    <div className="divide-y divide-stone-100 space-y-6">
                      {selectedTopic.questions.map((question, qIdx) => {
                        const userAnswerIdx = userAnswers[qIdx];
                        const isCorrect = userAnswerIdx === question.correctAnswer;

                        return (
                          <div key={question.id} className="pt-6 first:pt-0 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono font-bold uppercase text-stone-400">
                                  Question {qIdx + 1}
                                </span>
                                <h4 className="font-semibold text-stone-900 text-xs md:text-sm leading-normal">
                                  {question.question}
                                </h4>
                              </div>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                                isCorrect 
                                  ? "text-emerald-700 bg-emerald-50 border border-emerald-100" 
                                  : "text-red-700 bg-red-50 border border-red-100"
                              }`}>
                                {isCorrect ? "Correct" : "Incorrect"}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                                <p className="text-[9px] font-mono uppercase text-stone-400 font-bold mb-1">Your Response:</p>
                                <p className="text-stone-700">{question.options[userAnswerIdx] !== undefined ? question.options[userAnswerIdx] : "No Answer"}</p>
                              </div>
                              <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                                <p className="text-[9px] font-mono uppercase text-emerald-800 font-bold mb-1">Correct Rationale:</p>
                                <p className="text-emerald-900 font-medium">{question.options[question.correctAnswer]}</p>
                              </div>
                            </div>

                            <div className="bg-[#faf8f5] p-4 rounded-lg border border-stone-150 text-xs text-stone-600 leading-relaxed">
                              <span className="font-semibold text-[#c5a059] uppercase text-[9px] font-mono tracking-wider block mb-1">Expert Insight:</span>
                              {question.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}
