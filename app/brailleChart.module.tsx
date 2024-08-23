import style from '@/app/style.module.css';

const BrailleChart = ({ values, height, colormatic = false, reversed }: { values: number[], height: number, colormatic?: boolean, reversed?: boolean }) => {
    const max = Math.max(...values);
    const main_height = height * 3;
    const main_values = values.map(value => Math.round(map(value, 0, max, 0, main_height)));

    const array: number[][] = Array.from({ length: main_height }, (_, y) =>
        main_values.map(x => Number(x > y))
    );
    const reversed_array = !reversed ? array.reverse() : array;
    const lines: JSX.Element[] = [];
    for (let x = 0; x < values.length; x += 2) {
        let line = [];
        for (let y = 0; y < main_height; y += 3) {
            line.push(
                <p
                    key={y}
                    className={style.line}
                    style={{
                        color: colormatic ?
                            !reversed ?
                                `rgb(${map(y, 0, main_height, 255, 0)}, ${map(y, 0, main_height, 0, 255)}, 0)` :
                                `rgb(${map(y, 0, main_height, 0, 255)}, ${map(y, 0, main_height, 255, 0)}, 0)`
                            : 'white'
                    }}>
                    {toBraille(getFragment(reversed_array, x, y))}<br />
                </p>
            );
        }
        lines.push(<p key={x} className={style.line}>{line}</p>);
    }
    return (<div className={style.parent}>{lines}</div>);
}

const getFragment = (array: number[][], offset_x: number, offset_y: number) => {
    const temp_array: number[][] = [];
    for (let y = 0; y < 3; y++) {
        const temp_subarray = [];
        for (let x = 0; x < 2; x++) {
            temp_subarray.push(array[y + offset_y][x + offset_x]);
        }
        temp_array.push(temp_subarray);
    }
    return temp_array;
}

const map = (
    val: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number) => {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const toBraille = (points: number[][]): string => {
    let bit_representation = '';
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 3; x++) {
            bit_representation += points[x][y] > 0 ? '1' : '0';

        }
    }
    const result_unicode = parseInt(bit_representation.split('').reverse().join(''), 2) + 0x2800;
    return String.fromCodePoint(result_unicode);
}

export default BrailleChart;
