import restart from 'vite-plugin-restart'

export default {
  root: 'src/',
  publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
  server:
  {
    host: true, // Open to local network and display URL
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
  }, 
  build:
  {
    ourDir: '../dist',
    emptyOutDir: true,
    sourceMap: true,
  },
  plugins:
  [
    restart({ restart: [ '../static/**', ]}) // Restart server on static file change
  ]
}