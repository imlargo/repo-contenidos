import TurndownService from 'turndown';
import { marked } from 'marked';

const turndownService = new TurndownService({
	headingStyle: 'atx',
	hr: '---',
	bulletListMarker: '-',
	codeBlockStyle: 'indented',
	fence: '```',
	emDelimiter: '_',
	strongDelimiter: '**',
	linkStyle: 'inlined'
});

export function HtmlToMarkdown(body: HTMLElement): string {
	return turndownService.turndown(body).trim();
}

/*
Convertir el markdown a html para ser renderizado
*/
export function MarkdownToHtml(markdown: string): string {
	return marked.parse(markdown) as string;
}
