
/**
 * Simple markdown renderer utility
 * Converts markdown syntax to HTML
 */
export const renderMarkdown = (markdown: string | undefined): string => {
  if (!markdown) return '';
  
  // Simple markdown parsing
  let html = markdown
    // Headers
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\_(.+?)\_/g, '<em>$1</em>')
    // Lists
    .replace(/^\- (.+)$/gm, '<li class="mb-2">$1</li>')
    // Convert consecutive list items into a list
    .replace(/(<li.+<\/li>\n)+/g, '<ul class="list-disc pl-6 mb-6 text-white/80">$&</ul>')
    // Paragraphs
    .replace(/^(?!(<h|<ul|<li|\s*$))(.*$)/gm, '<p class="text-white/80 mb-4">$1</p>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-t border-white/10" />');
    
  return html;
};
