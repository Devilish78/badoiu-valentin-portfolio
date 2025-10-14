# Badoiu Valentin Portfolio Website

A pixel-faithful recreation of a modern portfolio website featuring advanced animations and responsive design.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Advanced Animations**: GPU-accelerated animations with precise timing
- **Performance Optimized**: Lighthouse-optimized for excellent performance scores
- **Accessibility**: WCAG AA compliant with keyboard navigation and reduced motion support
- **Modern Tech Stack**: Vanilla HTML/CSS/JS with no external dependencies

## 🎨 Animation Details

This website implements specific animation behaviors matching the original design:

### Hero Animations
- **Background Scale**: Initial scale(1.08) to scale(1) over 1.6s with ease-out timing
- **Text Entrance**: Staggered character animation with 40ms delay between characters
- **Parallax Effect**: Subtle background movement (0 → -6% translateY) on scroll

### Scroll-Triggered Reveals
- **Stagger Timing**: 80ms delay between items in groups
- **Movement**: translateY(16px → 0) with opacity fade-in
- **Duration**: 550ms with cubic-bezier(0.22, 0.9, 0.34, 1) easing
- **Trigger**: IntersectionObserver with 10% threshold

### Color Transitions
- **Background Changes**: 750ms transitions with cubic-bezier(0.22, 0.9, 0.34, 1)
- **Hover Effects**: Smooth color and transform transitions
- **Link Animations**: Border-bottom reveals with matching timing

### Performance Features
- **GPU Acceleration**: Uses transform and opacity for animations
- **Lazy Loading**: Non-critical images load on demand
- **Reduced Motion**: Respects user's motion preferences
- **Optimized Rendering**: Will-change properties for smooth animations

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet with animation variables
├── js/
│   └── animations.js       # Animation logic and interactions
├── assets/
│   ├── images/            # Project images and graphics
│   └── icons/             # Icon files
└── README.md              # This file
```

## 🛠️ How to Run Locally

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Or serve** with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
4. **Visit** `http://localhost:8000` in your browser

## 📝 Customization

### Adding Your Own Content

1. **Replace project information** in `index.html`:
   - Update project titles and descriptions
   - Change project links
   - Modify testimonials

2. **Update contact details**:
   - Email link: `mailto:badoiu.valentin@gmail.com`
   - Social links: Bio.link, Facebook, etc.

3. **Add your images** to `assets/images/`:
   - Hero background image
   - Project screenshots
   - Profile photo
   - Company logos

### Modifying Animations

Animation timing is controlled by CSS variables in `:root` selector:

```css
:root {
  /* Hero Animation Timing */
  --hero-duration: 1.6s;
  --hero-char-stagger: 40ms;
  
  /* Scroll Reveal Timing */
  --reveal-stagger: 80ms;
  --reveal-duration: 550ms;
  --reveal-easing: cubic-bezier(0.22, 0.9, 0.34, 1);
  
  /* Transition Timing */
  --transition-duration: 750ms;
  --transition-easing: cubic-bezier(0.22, 0.9, 0.34, 1);
}
```

### Color Customization

Update the color palette by modifying these CSS variables:

```css
:root {
  --color-primary: #0f0f0f;
  --color-accent: #3b82f6;
  --color-bg-primary: #ffffff;
  /* ... more colors */
}
```

## 🌐 Deployment

### Netlify
1. Drag and drop the entire project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your Git repository for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### GitHub Pages
1. Push code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

## 🔧 Technical Notes

### Browser Support
- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **JavaScript features**: IntersectionObserver, CSS Custom Properties
- **CSS features**: CSS Grid, Flexbox, CSS Variables, CSS Animations

### Performance Optimizations
- **Critical CSS**: Inline critical styles for faster first paint
- **Font Loading**: Preload web fonts with `font-display: swap`
- **Image Optimization**: Use WebP format where possible
- **Lazy Loading**: Non-critical images load on scroll
- **GPU Layers**: Transform and opacity for smooth animations

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: ARIA labels and proper text alternatives
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Color Contrast**: WCAG AA compliant color combinations

## 📊 Animation Parameter Reference

| Animation | Duration | Easing | Delay/Stagger |
|-----------|----------|--------|---------------|
| Hero Background | 1600ms | ease-out | - |
| Hero Text | 800ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) | 200ms between lines |
| Character Typing | - | - | 40ms per character |
| Scroll Reveals | 550ms | cubic-bezier(0.22, 0.9, 0.34, 1) | 80ms between items |
| Background Transitions | 750ms | cubic-bezier(0.22, 0.9, 0.34, 1) | - |
| Hover Effects | 300ms | ease-out | - |

## 🆘 Troubleshooting

### Animations Not Working
1. Check browser console for JavaScript errors
2. Ensure all CSS and JS files are properly linked
3. Verify browser supports required features
4. Check if user has reduced motion enabled

### Performance Issues
1. Reduce number of animated elements
2. Use `will-change` property sparingly
3. Optimize images (WebP, proper sizing)
4. Consider using `transform` instead of changing layout properties

### Layout Issues
1. Check CSS Grid and Flexbox support
2. Verify viewport meta tag is present
3. Test on different screen sizes
4. Validate HTML and CSS

## 📄 License

This project is for portfolio use by Badoiu Valentin. Please respect copyright and usage rights for any assets or content used.

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, please contact [badoiu.valentin@gmail.com](mailto:badoiu.valentin@gmail.com).

---

**Built with ❤️ by Badoiu Valentin**  
*Creative Developer & Digital Artist*