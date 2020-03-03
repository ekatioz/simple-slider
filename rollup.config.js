import liveServer from "rollup-plugin-live-server";
import postcss from 'rollup-plugin-postcss'

module.exports = {
  input: ["src/main.js"],
  output: {
    file: 'dist/bundle.js',
    format: "esm"
  },
  plugins: [
    liveServer({
      port: 3000,
      mount: [
        ["/dist", "./dist"],
        ["/src", "./src"]
      ],
      open: true
    }) 
  ]
};
