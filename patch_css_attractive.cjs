const fs = require('fs');

const css = fs.readFileSync('src/index.css', 'utf-8');

// I will make the background slightly warmer and add a subtle pattern to body or just keep it clean and premium.
// Actually, I can use a more vibrant primary color and smoother shadows.
const newCss = css.replace(
  'body {\\n  background-color: var(--color-bg-main);',
  'body {\\n  background-color: var(--color-bg-main);\\n  background-image: radial-gradient(circle at 100% 0%, #f0f4f8 0%, transparent 25%), radial-gradient(circle at 0% 100%, #f0f4f8 0%, transparent 25%);\\n  background-attachment: fixed;'
);

fs.writeFileSync('src/index.css', newCss);
