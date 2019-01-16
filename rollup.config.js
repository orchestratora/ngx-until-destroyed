import typescript from 'rollup-plugin-typescript';

const sharedConfig = {
  input: 'src/public_api.ts',
  external: ['rxjs', 'rxjs/operators'],
};

export default [
  {
    ...sharedConfig,
    plugins: [typescript({ target: 'es5', module: 'es2015' })],
    output: [
      {
        file: 'dist/bundles/umd.js',
        format: 'umd',
        name: 'ngx.untilDestroyed',
        globals: { rxjs: 'rxjs', 'rxjs/operators': 'rxjs' },
      },
      { file: 'dist/bundles/esm5.js', format: 'esm' },
    ],
  },
  {
    ...sharedConfig,
    plugins: [typescript({ target: 'es2015', module: 'es2015' })],
    output: { file: 'dist/bundles/esm2015.js', format: 'esm' },
  },
];
