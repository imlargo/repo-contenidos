<script lang="ts">
	import { HtmlToMarkdown, MarkdownToHtml } from '$src/lib/utils/markdown-service';
	import { browser } from '$app/environment';

	type Props = {
		value: string;
		onchange?: (value: string) => void;
	};

	let { value = $bindable(), onchange }: Props = $props();
	let quill: any;

	function TextEditorAction(element: HTMLElement, markdown: string) {
		if (browser) {
			quill = new Quill(element, {
				modules: {
					toolbar: [[{ header: [3, 4, 5, false] }], ['bold', 'italic'], [{ list: 'bullet' }]]
				},
				placeholder: 'Escriba aqui...',
				theme: 'snow'
			});

			const html = MarkdownToHtml(markdown);
			quill.clipboard.dangerouslyPasteHTML(html);

			quill.on('text-change', function (delta, source) {
				const htmlContent = quill.getSemanticHTML();
				const parsedMd = HtmlToMarkdown(htmlContent);
				value = parsedMd;

				if (onchange) {
					onchange(parsedMd);
				}
			});
		}
	}

	export function replaceContent(newValue: string) {
		if (quill) {
			value = newValue;
			const htmlContent = MarkdownToHtml(newValue);
			quill.clipboard.dangerouslyPasteHTML(htmlContent);
		}
	}
</script>

<div use:TextEditorAction={value}></div>
