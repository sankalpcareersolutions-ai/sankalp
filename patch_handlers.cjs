const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const handlers = `
  const handleDownloadStudySchedule = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = [15, 23, 42]; 
    const accentColor = [212, 175, 55]; 

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, "F");
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(0, 40, 210, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SANKALP CAREER SOLUTIONS", 15, 18);
    
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    doc.text("STUDY SCHEDULE TEMPLATE", 15, 25);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text("Weekly Study Planner", 15, 60);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    let y = 75;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach((day, i) => {
       doc.setFont("helvetica", "bold");
       doc.text(day, 15, y);
       doc.setFont("helvetica", "normal");
       doc.setDrawColor(200, 200, 200);
       doc.line(15, y + 2, 195, y + 2);
       
       doc.text("Morning (06:00 - 09:00): ___________________________", 15, y + 10);
       doc.text("Afternoon (14:00 - 17:00): ___________________________", 15, y + 18);
       doc.text("Evening (19:00 - 22:00): ___________________________", 15, y + 26);
       
       y += 40;
       
       if (y > 270 && i < days.length - 1) {
          doc.addPage();
          y = 30;
       }
    });

    doc.save("Sankalp_Study_Schedule.pdf");
  };

  const handleDownloadFitnessPlan = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = [15, 23, 42]; 
    const accentColor = [212, 175, 55]; 

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, "F");
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(0, 40, 210, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SANKALP CAREER SOLUTIONS", 15, 18);
    
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    doc.text("PHYSICAL FITNESS PLAN", 15, 25);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text("Tactical Fitness Routine for Defence & Police Services", 15, 60);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    doc.text("Endurance Training:", 15, 75);
    doc.text("- 2.4 km run in 10 minutes (3 times a week)", 20, 82);
    doc.text("- Swimming: 50 meters unassisted", 20, 89);
    
    doc.text("Strength & Conditioning:", 15, 105);
    doc.text("- Push-ups: 40 repetitions in 1 minute", 20, 112);
    doc.text("- Sit-ups: 40 repetitions in 1 minute", 20, 119);
    doc.text("- Chin-ups: Minimum 6-8 repetitions", 20, 126);
    
    doc.text("Flexibility & Agility:", 15, 142);
    doc.text("- 100-meter sprint in under 15 seconds", 20, 149);
    doc.text("- High jump (1.2 meters) & Long jump (3.6 meters)", 20, 156);
    
    doc.text("Dietary Guidelines:", 15, 172);
    doc.text("- High protein intake (1.5g per kg of body weight)", 20, 179);
    doc.text("- Hydration: Minimum 3-4 liters of water daily", 20, 186);

    doc.save("Sankalp_Fitness_Plan.pdf");
  };
`;

code = code.replace(
  /const getOverviewText = \(\) => \{/,
  handlers + '\n  const getOverviewText = () => {'
);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
