import fs from 'fs';
import { spawn } from 'child_process';

export function load_all() {
    const data = fs.readFileSync('./prediction/data.csv', 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l !== '');
    
    const data_cols = data[0].split(',').map(col => col.trim());
    const data_rows = data.slice(1,101);

    const res = data_rows.map(row => {
        const vals = row.split(',').map(v => v.trim());
        const obj = {};
        data_cols.forEach((col, idx) => {
            obj[col] = vals[idx] || null;
        });
        return obj;
    }).filter(obj => obj['Job Title']);
    return res;
};

export function search(opt) {
    return new Promise((resolve, reject) => {
        const py = spawn('python', ['./prediction/predict.py', opt]);

        let res = '';
        py.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            res += data.toString();
        });

        py.stderr.on('data', (err) => {
            console.error(err.toString());
        });

        py.on('close', (code) => {
            if (code !== 0) {
                reject(code);
            };
            try {
                resolve(JSON.parse(res));
            } catch (err) {
                reject(err);
            }
        });
    })
}