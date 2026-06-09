import React, { useState } from "react";
import { Course } from "../types";
import { Search, Compass, BookOpen, Clock, Users, ArrowRight, CheckCircle, Flame, Star, Filter, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CoursesProps {
  courses: Course[];
  onEnrollCourse: (courseId: string) => void;
  enrolledCourses: Course[];
}

export default function Courses({ courses, onEnrollCourse, enrolledCourses }: CoursesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

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

                  {isEnrolled ? (
                    <button
                      id={`course_enroll_btn_enrolled_${c.id}`}
                      disabled
                      className="px-4 py-2 bg-stone-100 text-stone-400 border border-stone-200 rounded-lg text-xs font-bold leading-none flex items-center gap-1 cursor-not-allowed"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-700" /> Active
                    </button>
                  ) : (
                    <button
                      id={`course_enroll_btn_act_${c.id}`}
                      onClick={() => onEnrollCourse(c.id)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-stone-100 rounded-lg text-xs font-sans font-bold transition shadow-sm cursor-pointer"
                    >
                      Enroll Academy
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
