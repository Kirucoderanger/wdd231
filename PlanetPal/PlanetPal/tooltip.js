class FancyImageTooltip {
  constructor(selector = '.card img', preferredPosition = 'right') {
    this.selector = selector;
    this.preferredPosition = preferredPosition;
    this.tooltip = this.createTooltip();
    this.init();
  }

  createTooltip() {
    const div = document.createElement('div');
    div.id = 'image-tooltip';
    div.className = 'tooltip-image';
    document.body.appendChild(div);
    return div;
  }

  init() {
    document.querySelectorAll(this.selector).forEach(img => {
      const parent = img.closest('.card') || img;

      parent.addEventListener('mouseenter', () => {
        this.tooltip.innerHTML = `<img src="${img.src}" alt="Preview" />`;

        setTimeout(() => {
          const rect = parent.getBoundingClientRect();
          const tooltipWidth = this.tooltip.offsetWidth;
          const tooltipHeight = this.tooltip.offsetHeight;

          let left, top, position = this.preferredPosition;

          const fitsRight = rect.right + tooltipWidth + 10 < window.innerWidth;
          const fitsLeft = rect.left - tooltipWidth - 10 > 0;
          const fitsTop = rect.top - tooltipHeight - 10 > 0;
          const fitsBottom = rect.bottom + tooltipHeight + 10 < window.innerHeight;

          // Priority positioning with fallback
          switch (this.preferredPosition) {
            case 'left':
              if (fitsLeft) {
                left = rect.left - tooltipWidth - 10;
                top = rect.top + rect.height / 2 - tooltipHeight / 2;
                break;
              }
            case 'right':
              if (fitsRight) {
                left = rect.right + 10;
                top = rect.top + rect.height / 2 - tooltipHeight / 2;
                break;
              }
            case 'top':
              if (fitsTop) {
                left = rect.left + rect.width / 2 - tooltipWidth / 2;
                top = rect.top - tooltipHeight - 10;
                break;
              }
            case 'bottom':
              if (fitsBottom) {
                left = rect.left + rect.width / 2 - tooltipWidth / 2;
                top = rect.bottom + 10;
                break;
              }
            default:
              // fallback to right or below
              left = fitsRight ? rect.right + 10 : rect.left - tooltipWidth - 10;
              top = rect.top + rect.height / 2 - tooltipHeight / 2;
          }

          // Scroll offsets
          left += window.scrollX;
          top += window.scrollY;

          // Edge guards
          left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));
          top = Math.max(10, Math.min(top, window.innerHeight - tooltipHeight - 10));

          this.tooltip.style.left = `${left}px`;
          this.tooltip.style.top = `${top}px`;
          this.tooltip.classList.add('visible');
        }, 10);
      });

      parent.addEventListener('mouseleave', () => {
        this.tooltip.classList.remove('visible');
        this.tooltip.innerHTML = '';
      });
    });
  }
}
