const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

css = css.replace('--color-lightyellow-50: #fffff2;', '--color-lightyellow-50: #ffffff;');
css = css.replace('--color-lightyellow-100: #fefdd8;', '--color-lightyellow-100: #fffbea;');
css = css.replace('--color-lightyellow-200: #fefbae;', '--color-lightyellow-200: #fef08a;');
css = css.replace('--color-lightyellow-300: #fbf477;', '--color-lightyellow-300: #fde047;');
css = css.replace('--color-lightyellow-400: #f7e641;', '--color-lightyellow-400: #facc15;');
css = css.replace('--color-lightyellow-500: #ebd01f;', '--color-lightyellow-500: #eab308;');

css = css.replace('--color-gold-50: #fdfaf3;', '--color-gold-50: #fffdf5;');
css = css.replace('--color-gold-100: #faf1df;', '--color-gold-100: #fff9e1;');
css = css.replace('--color-gold-200: #f4e1be;', '--color-gold-200: #fff0c2;');
css = css.replace('--color-gold-300: #ebd08d;', '--color-gold-300: #ffe193;');
css = css.replace('--color-gold-400: #dcb35c;', '--color-gold-400: #ffd059;');
css = css.replace('--color-gold-500: #c5a059;', '--color-gold-500: #fbbf24;');
css = css.replace('--color-gold-600: #b0813f;', '--color-gold-600: #f59e0b;');
css = css.replace('--color-gold-700: #936033;', '--color-gold-700: #d97706;');

fs.writeFileSync('src/index.css', css);
