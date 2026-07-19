const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add subscribedExamDates state
const statePattern = /const \[subscribedExams, setSubscribedExams\] = useState<string\[\]>\(\(\) => \{[^}]*\}\);\s*/;
const newStates = `const [subscribedExamDates, setSubscribedExamDates] = useState<Record<string, string>>(() => {
    const cached = localStorage.getItem("sankalp_subscribed_exam_dates");
    return cached ? JSON.parse(cached) : {};
  });

  useEffect(() => {
    localStorage.setItem("sankalp_subscribed_exam_dates", JSON.stringify(subscribedExamDates));
  }, [subscribedExamDates]);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkNotifications = () => {
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      const now = new Date();

      // Check userStats.examDate
      const allDates = { ...subscribedExamDates };
      if (userStats.examDate) {
        allDates["Target_Exam"] = userStats.examDate;
      }

      Object.entries(allDates).forEach(([key, dateStr]) => {
        if (!dateStr) return;
        const examDate = new Date(dateStr);
        const timeDiff = examDate.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 3600);
        
        const notificationKey = \`notified_\${key}_\${dateStr}\`;
        const hasNotified = localStorage.getItem(notificationKey);
        
        // Alert if within 24 hours
        if (hoursDiff > 0 && hoursDiff <= 24 && !hasNotified) {
          const title = key === "Target_Exam" ? "Target Exam Reminder" : \`Upcoming Exam: \${key}\`;
          new Notification(title, {
            body: \`Your exam is scheduled in less than 24 hours on \${dateStr}!\`,
            icon: logoImg
          });
          localStorage.setItem(notificationKey, "true");
        }
      });
    };

    checkNotifications();
    const intervalId = setInterval(checkNotifications, 3600000); // Check every hour
    return () => clearInterval(intervalId);
  }, [userStats.examDate, subscribedExamDates]);
`;

content = content.replace(statePattern, match => match + newStates);

if (!content.includes('subscribedExamDates')) {
  console.log("Failed to inject subscribedExamDates");
}

// Now we need to pass subscribedExamDates and setSubscribedExamDates to SovereignExams
const examsRegex = /<SovereignExams([^>]*)\/>/;
content = content.replace(examsRegex, (match, p1) => {
  return `<SovereignExams${p1}
                subscribedExamDates={subscribedExamDates}
                onSetExamDate={(examCode, date) => setSubscribedExamDates(prev => ({ ...prev, [examCode]: date }))}
              />`;
});

fs.writeFileSync('src/App.tsx', content);
console.log("Patched App.tsx");
