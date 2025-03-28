
/**
 * Enhanced markdown renderer utility
 * Converts markdown syntax to HTML with support for advanced elements
 */
export const renderMarkdown = (markdown: string | undefined): string => {
  if (!markdown) return '';
  
  // Process code blocks first (```code```)
  let html = markdown.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, language, code) => {
    const langClass = language ? ` language-${language}` : '';
    return `<pre class="bg-black/50 p-4 rounded-md my-6 overflow-x-auto"><code class="text-orange-400${langClass}">${code.trim()}</code></pre>`;
  });
  
  // Process tables
  html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
    // Check if this is a header separator row (| --- | --- |)
    if (content.match(/^\s*[-:]+\s*(\|\s*[-:]+\s*)+$/)) {
      return match; // Keep separator rows for processing
    }
    
    // Convert table row content to cells
    const cells = content
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '');
      
    return `<tr>${cells.map(cell => `<td class="border border-white/10 px-4 py-2">${cell}</td>`).join('')}</tr>`;
  });
  
  // Convert table separator rows and combine with content rows
  html = html.replace(/(\|.+\|\n)+\|([-:\s|]+)\|\n(\|.+\|\n)+/g, (match) => {
    const rows = match.split('\n').filter(row => row.trim() !== '');
    
    // Find the header separator row
    const headerIndex = rows.findIndex(row => row.match(/\|\s*[-:]+\s*\|/));
    
    if (headerIndex === -1) {
      // No proper table format found
      return match;
    }
    
    // Get header rows and body rows
    const headerRows = rows.slice(0, headerIndex);
    const bodyRows = rows.slice(headerIndex + 1);
    
    // Convert header rows to th elements
    const headerHtml = headerRows.join('\n').replace(/\|(.+)\|/g, (m, content) => {
      const cells = content
        .split('|')
        .map(cell => cell.trim())
        .filter(cell => cell !== '');
        
      return `<tr>${cells.map(cell => `<th class="border border-white/20 px-4 py-2 bg-black/40 font-medium text-white">${cell}</th>`).join('')}</tr>`;
    });
    
    // The body rows are already converted to td elements
    
    // Combine into a table
    return `<div class="overflow-x-auto my-6">
      <table class="min-w-full border border-white/10 rounded-md">
        <thead>${headerHtml}</thead>
        <tbody>${bodyRows.join('\n')}</tbody>
      </table>
    </div>`;
  });
  
  // Callouts/blockquotes with custom styling
  html = html.replace(/^>\s*\[!([A-Z]+)\]\s*(.+)$/gm, (match, type, content) => {
    let bgColor = 'bg-blue-900/20';
    let borderColor = 'border-blue-500';
    let icon = '💡';
    
    // Customize callout based on type
    switch (type.toUpperCase()) {
      case 'NOTE':
        bgColor = 'bg-blue-900/20';
        borderColor = 'border-blue-500';
        icon = '💡';
        break;
      case 'WARNING':
        bgColor = 'bg-orange-900/20';
        borderColor = 'border-orange-500';
        icon = '⚠️';
        break;
      case 'IMPORTANT':
        bgColor = 'bg-red-900/20';
        borderColor = 'border-red-500';
        icon = '🔔';
        break;
      case 'TIP':
        bgColor = 'bg-green-900/20';
        borderColor = 'border-green-500';
        icon = '💪';
        break;
    }
    
    return `<div class="my-6 p-4 border-l-4 ${borderColor} ${bgColor} rounded-r-md">
      <div class="flex items-start">
        <div class="mr-2">${icon}</div>
        <div>${content}</div>
      </div>
    </div>`;
  });
  
  // Standard blockquotes
  html = html.replace(/^>\s*(.+)$/gm, (match, content) => {
    return `<blockquote class="pl-4 border-l-4 border-orange-400/50 my-4 text-white/70 italic">${content}</blockquote>`;
  });
  
  // Headers
  html = html
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold mt-6 mb-3">$1</h4>');
  
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\_(.+?)\_/g, '<em>$1</em>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-black/30 text-orange-400 rounded px-1 py-0.5">$1</code>');
  
  // Lists
  html = html
    // Unordered lists
    .replace(/^\- (.+)$/gm, '<li class="mb-2">$1</li>')
    // Ordered lists
    .replace(/^(\d+)\. (.+)$/gm, '<li class="mb-2">$2</li>');
  
  // Convert consecutive list items into a list
  html = html
    .replace(/(<li.+<\/li>\n)+/g, '<ul class="list-disc pl-6 mb-6 text-white/80">$&</ul>')
    // Only match ordered list patterns not inside existing lists
    .replace(/^(\d+)\. (.+)(\n(\d+)\. (.+))+$/gm, (match) => {
      return `<ol class="list-decimal pl-6 mb-6 text-white/80">${match}</ol>`;
    });
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" class="text-orange-400 hover:text-orange-300 underline" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, 
    '<img src="$2" alt="$1" class="my-6 rounded-lg max-w-full h-auto" />');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-t border-white/10" />');
  
  // Paragraphs (must come last to avoid interfering with other elements)
  html = html.replace(/^(?!(<h|<ul|<ol|<li|<blockquote|<div|<pre|<img|<hr|\s*$))(.*$)/gm, 
    '<p class="text-white/80 mb-4">$1</p>');
    
  return html;
};
