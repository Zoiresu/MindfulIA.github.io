import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for GitHub Pages deployment
  // For a user/org page (e.g., username.github.io), use '/'
  // For a project page (e.g., username.github.io/repo-name), use '/repo-name/'
  base: '/Mindfull-IA/',
  
  // Public directory configuration
  publicDir: 'public',
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Minify for production
    minify: 'esbuild',
    
    rollupOptions: {
      input: {
        main: './index.html',
        nosotros: './nosotros.html',
        blog: './blog.html',
        faqs: './faqs.html',
        reviews: './reviews.html',
        login: './login.html',
        register: './register.html'
      }
    }
  }
})
