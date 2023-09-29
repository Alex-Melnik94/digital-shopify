import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const ctx = await esbuild.context({
	entryPoints: ["src/index.js", "src/index.scss"],
	entryNames: '[name]',
	outdir: 'assets',
	target: 'es2017',
	sourcemap: IS_DEVELOPMENT ? 'inline' : false,
	sourcesContent: true,
	bundle: true,
	minify: true,
	plugins: [
		sassPlugin({
			cache: true,
			async transform(source) {
				const { css } = await postcss([autoprefixer]).process(source, {
					from: undefined,
					map: IS_DEVELOPMENT,
				});
				return css;
			},
		}),
	],
});

await ctx.rebuild();
if (IS_DEVELOPMENT) {
	await ctx.watch();
	console.log('WATCHING FOR FILE CHANGES!!!');
} else {
	await ctx.dispose();
	console.log('BUILD SUCCESS!!!');
}