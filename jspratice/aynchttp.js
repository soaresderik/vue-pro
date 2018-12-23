import addition from './src/sum';
import * from "./src/maths";

export function asyncAdd(values){
    setTimeout(() => {
        let total = addition(values);
        console.log(`Async Total: ${Total}`);
        return total;
    }, 500);
}
