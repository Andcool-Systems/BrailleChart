class PerlinNoise {
    private permutation: number[] = [];

    constructor() {
        this.permutation = [...Array(256).keys()];
        this.permutation.sort(() => Math.random() - 0.5);
        this.permutation = this.permutation.concat(this.permutation);
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
    }

    private grad(hash: number, x: number, y: number): number {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : x;
        return ((h & 1) ? u : -u) + ((h & 2) ? v : -v);
    }

    noise(x: number, y: number): number {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);

        const u = this.fade(x);
        const v = this.fade(y);

        const aa = this.permutation[X + this.permutation[Y]] % 16;
        const ab = this.permutation[X + this.permutation[Y + 1]] % 16;
        const ba = this.permutation[X + 1 + this.permutation[Y]] % 16;
        const bb = this.permutation[X + 1 + this.permutation[Y + 1]] % 16;

        const res = this.lerp(v,
            this.lerp(u, this.grad(aa, x, y), this.grad(ba, x - 1, y)),
            this.lerp(u, this.grad(ab, x, y - 1), this.grad(bb, x - 1, y - 1))
        );

        return (res + 1) / 2;
    }
}

const perlin = new PerlinNoise();
export function getPixelColor(x: number, y: number): number {
    const value = perlin.noise(x * 0.05, y * 0.05);
    return Math.floor(value * 500);
}