const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add import
content = content.replace(
  'const AdminPanel = lazy(() => import("./components/AdminPanel"));',
  'const AdminPanel = lazy(() => import("./components/AdminPanel"));\nconst StudyMaterial = lazy(() => import("./components/StudyMaterial"));'
);

// Add route in the switch/JSX
content = content.replace(
  '{currentTab === "admin" && (',
  '{currentTab === "study-material" && (\n              <StudyMaterial />\n            )}\n            {currentTab === "admin" && ('
);

fs.writeFileSync('src/App.tsx', content);
