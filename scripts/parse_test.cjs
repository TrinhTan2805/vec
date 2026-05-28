const fs = require('fs');

const srcFile = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\danhsachmanhinh.md';
let content = fs.readFileSync(srcFile, 'utf8');
let lines = content.split('\n');

let hierarchy = [];
let l1Counter = 0;
let l2Counter = 0;
let screenCounter = 0;

let currentL1 = null;
let currentL2 = null;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.startsWith('## ')) {
        l1Counter++;
        l2Counter = 0;
        currentL1 = { title: line.replace('## ', ''), l2: [], standaloneScreens: [] };
        hierarchy.push(currentL1);
        currentL2 = null;
    } else if (line.startsWith('### ')) {
        l2Counter++;
        currentL2 = { title: line.replace('### ', ''), screens: [] };
        if (currentL1) {
            currentL1.l2.push(currentL2);
        } else {
            // fallback
        }
    } else if (line.startsWith('|') && !line.includes('**STT**') && !line.includes('| :---')) {
        let cols = line.split('|').map(s => s.trim());
        if (cols.length >= 6 && cols[4] && cols[5]) { // Code and Name
            let code = cols[4];
            let name = cols[5];
            let process = cols[7]; // optional
            
            let screenObj = { code, name, process };
            screenCounter++;
            
            if (currentL2) {
                currentL2.screens.push(screenObj);
            } else if (currentL1) {
                currentL1.standaloneScreens.push(screenObj);
            }
        }
    }
}

console.log("Total Screens Parsed:", screenCounter);
console.log("Modules (L1):", hierarchy.length);
console.log("Module 1 Name:", hierarchy[0].title);
console.log("Module 1 Screens:", hierarchy[0].standaloneScreens.length);
console.log("Module 2 Name:", hierarchy[1].title, "| Groups inside:", hierarchy[1].l2.length);

// Just print total screens inside hierarchy to verify
let counted = 0;
hierarchy.forEach(l1 => {
    counted += l1.standaloneScreens.length;
    l1.l2.forEach(l2 => {
        counted += l2.screens.length;
    });
});
console.log("Counted via hierarchy:", counted);

